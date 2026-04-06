import TOML from "@iarna/toml";
import { DiagnosticSeverity, type Diagnostic } from "vscode-languageserver";
import { parseDocument } from "yaml";

import { FRONT_MATTER_KEY_TYPES, HUGO_FRONT_MATTER_KEYS } from "./constants.js";
import type { FrontMatterBlock } from "./types.js";
import { rangeFromOffsets } from "./utils.js";

const KEY_SET = new Set(HUGO_FRONT_MATTER_KEYS);

export function extractFrontMatter(text: string): FrontMatterBlock | undefined {
  if (text.startsWith("---\n") || text === "---") {
    return extractDelimitedFrontMatter(text, "---", "yaml");
  }

  if (text.startsWith("+++\n") || text === "+++") {
    return extractDelimitedFrontMatter(text, "+++", "toml");
  }

  return undefined;
}

function extractDelimitedFrontMatter(
  text: string,
  delimiter: string,
  kind: FrontMatterBlock["kind"],
): FrontMatterBlock | undefined {
  const closingNeedle = `\n${delimiter}`;
  const closingIndex = text.indexOf(closingNeedle, delimiter.length);

  if (closingIndex === -1) {
    return {
      kind,
      delimiter,
      range: rangeFromOffsets(text, 0, Math.min(text.length, delimiter.length)),
      contentRange: rangeFromOffsets(text, delimiter.length, text.length),
      content: text.slice(delimiter.length).replace(/^\n/, ""),
      raw: text,
    };
  }

  const afterOpening = delimiter.length + (text[delimiter.length] === "\n" ? 1 : 0);
  const closingLineStart = closingIndex + 1;
  const closingLineEnd = closingLineStart + delimiter.length;
  const raw = text.slice(0, closingLineEnd);
  const content = text.slice(afterOpening, closingIndex);

  return {
    kind,
    delimiter,
    range: rangeFromOffsets(text, 0, closingLineEnd),
    contentRange: rangeFromOffsets(text, afterOpening, closingIndex),
    content,
    raw,
  };
}

export function analyzeFrontMatter(text: string): {
  block?: FrontMatterBlock;
  diagnostics: Diagnostic[];
} {
  const block = extractFrontMatter(text);

  if (!block) {
    return { diagnostics: [] };
  }

  const diagnostics: Diagnostic[] = [];

  if (!block.raw.endsWith(`\n${block.delimiter}`) && text.trim() === block.raw.trim()) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: `Missing closing ${block.delimiter} front matter delimiter.`,
      range: block.range,
      source: "hugo-lsp",
    });
    return { block, diagnostics };
  }

  try {
    const parsed = block.kind === "yaml" ? parseYaml(block.content) : parseToml(block.content);
    diagnostics.push(...validateKnownKeys(text, block, parsed));
  } catch (error) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: error instanceof Error ? error.message : "Invalid front matter.",
      range: block.contentRange,
      source: "hugo-lsp",
    });
  }

  return { block, diagnostics };
}

function parseYaml(content: string): unknown {
  const document = parseDocument(content);

  if (document.errors.length > 0) {
    throw new Error(document.errors[0]?.message ?? "Invalid YAML front matter.");
  }

  return document.toJS();
}

function parseToml(content: string): unknown {
  return TOML.parse(content);
}

function validateKnownKeys(
  text: string,
  block: FrontMatterBlock,
  parsed: unknown,
): Diagnostic[] {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return [
      {
        severity: DiagnosticSeverity.Warning,
        message: "Front matter should evaluate to a key/value object.",
        range: block.contentRange,
        source: "hugo-lsp",
      },
    ];
  }

  const diagnostics: Diagnostic[] = [];
  const record = parsed as Record<string, unknown>;

  for (const [key, value] of Object.entries(record)) {
    const keyRange = findKeyRange(text, block, key) ?? block.contentRange;

    if (!KEY_SET.has(key as (typeof HUGO_FRONT_MATTER_KEYS)[number])) {
      diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        message: `Unknown Hugo front matter key "${key}".`,
        range: keyRange,
        source: "hugo-lsp",
      });
      continue;
    }

    const acceptedTypes = FRONT_MATTER_KEY_TYPES[key];
    if (acceptedTypes && !acceptedTypes.includes(valueType(value))) {
      diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        message: `Front matter key "${key}" expects ${acceptedTypes.join(" or ")}.`,
        range: keyRange,
        source: "hugo-lsp",
      });
    }
  }

  return diagnostics;
}

function valueType(value: unknown): string {
  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null";
  }

  return typeof value === "object" ? "object" : typeof value;
}

function findKeyRange(
  text: string,
  block: FrontMatterBlock,
  key: string,
) {
  const matcher =
    block.kind === "yaml"
      ? new RegExp(`(^|\\n)(\\s*)${escapeRegExp(key)}\\s*:`, "m")
      : new RegExp(`(^|\\n)(\\s*)${escapeRegExp(key)}\\s*=`, "m");
  const match = matcher.exec(block.content);

  if (!match || match.index === undefined) {
    return undefined;
  }

  const keyStart = block.raw.indexOf(block.content) + match.index + match[1].length + match[2].length;
  return rangeFromOffsets(text, keyStart, keyStart + key.length);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
