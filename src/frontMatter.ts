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

  if (text.startsWith("{") && !text.startsWith("{{")) {
    return extractJsonFrontMatter(text);
  }

  return undefined;
}

function extractJsonFrontMatter(text: string): FrontMatterBlock | undefined {
  const closingIndex = findJsonObjectEnd(text);
  const raw = closingIndex === undefined ? text : text.slice(0, closingIndex + 1);

  return {
    kind: "json",
    delimiter: "{}",
    range: rangeFromOffsets(text, 0, raw.length),
    contentRange: rangeFromOffsets(text, 0, raw.length),
    content: raw,
    raw,
  };
}

function findJsonObjectEnd(text: string): number | undefined {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (character === "\\") {
        escaped = true;
        continue;
      }

      if (character === "\"") {
        inString = false;
      }

      continue;
    }

    if (character === "\"") {
      inString = true;
      continue;
    }

    if (character === "{") {
      depth += 1;
      continue;
    }

    if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
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

  if (block.kind !== "json" && !block.raw.endsWith(`\n${block.delimiter}`) && text.trim() === block.raw.trim()) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: `Missing closing ${block.delimiter} front matter delimiter.`,
      range: block.range,
      source: "hugo-lsp",
    });
    return { block, diagnostics };
  }

  try {
    const parsed = parseFrontMatterBlock(block);
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

function parseFrontMatterBlock(block: FrontMatterBlock): unknown {
  switch (block.kind) {
    case "yaml":
      return parseYaml(block.content);
    case "toml":
      return parseToml(block.content);
    case "json":
      return parseJson(block.content);
  }
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

function parseJson(content: string): unknown {
  return JSON.parse(content);
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
    const contextualDiagnostics = validateContextualFrontMatter(key, value, keyRange);

    if (acceptedTypes && !acceptedTypes.includes(valueType(value)) && contextualDiagnostics.length === 0) {
      diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        message: `Front matter key "${key}" expects ${acceptedTypes.join(" or ")}.`,
        range: keyRange,
        source: "hugo-lsp",
      });
    }

    diagnostics.push(...contextualDiagnostics);
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
      : block.kind === "toml"
        ? new RegExp(`(^|\\n)(\\s*)${escapeRegExp(key)}\\s*=`, "m")
        : new RegExp(`(^|\\n)(\\s*)"${escapeRegExp(key)}"\\s*:`, "m");
  const match = matcher.exec(block.content);

  if (!match || match.index === undefined) {
    return undefined;
  }

  const quoteOffset = block.kind === "json" ? 1 : 0;
  const keyStart = block.raw.indexOf(block.content) + match.index + match[1].length + match[2].length + quoteOffset;
  return rangeFromOffsets(text, keyStart, keyStart + key.length);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function validateContextualFrontMatter(
  key: string,
  value: unknown,
  range: ReturnType<typeof rangeFromOffsets>,
): Diagnostic[] {
  switch (key) {
    case "date":
    case "lastmod":
    case "publishDate":
    case "expiryDate":
      return validateDateLikeKey(key, value, range);
    case "aliases":
      return validateAliases(value, range);
    case "resources":
      return validateResources(value, range);
    case "cascade":
      return validateCascade(value, range);
    case "draft":
    case "headless":
      return validateBooleanKey(key, value, range);
    default:
      return [];
  }
}

function validateDateLikeKey(
  key: string,
  value: unknown,
  range: ReturnType<typeof rangeFromOffsets>,
): Diagnostic[] {
  if (typeof value !== "string") {
    return [];
  }

  if (!isLikelyDate(value)) {
    return [
      {
        severity: DiagnosticSeverity.Warning,
        message: `Front matter key "${key}" should be a valid date or datetime string.`,
        range,
        source: "hugo-lsp",
      },
    ];
  }

  return [];
}

function validateAliases(value: unknown, range: ReturnType<typeof rangeFromOffsets>): Diagnostic[] {
  if (typeof value === "string") {
    return value.startsWith("/") ? [] : [warning('Front matter key "aliases" should use site-relative paths starting with "/".', range)];
  }

  if (!Array.isArray(value)) {
    return [];
  }

  const invalid = value.some((entry) => typeof entry !== "string" || !entry.startsWith("/"));
  return invalid ? [warning('Front matter key "aliases" should be an array of site-relative path strings.', range)] : [];
}

function validateResources(value: unknown, range: ReturnType<typeof rangeFromOffsets>): Diagnostic[] {
  if (!Array.isArray(value)) {
    return typeof value === "object" && value !== null
      ? []
      : [warning('Front matter key "resources" should be an array or object.', range)];
  }

  const invalid = value.some(
    (entry) => !entry || typeof entry !== "object" || Array.isArray(entry) || !("src" in (entry as Record<string, unknown>)),
  );

  return invalid
    ? [warning('Front matter key "resources" entries should be objects with at least a "src" field.', range)]
    : [];
}

function validateCascade(value: unknown, range: ReturnType<typeof rangeFromOffsets>): Diagnostic[] {
  if (Array.isArray(value)) {
    const invalid = value.some((entry) => !entry || typeof entry !== "object" || Array.isArray(entry));
    return invalid ? [warning('Front matter key "cascade" should contain only objects.', range)] : [];
  }

  if (value && typeof value === "object") {
    return [];
  }

  return [warning('Front matter key "cascade" should be an object or array of objects.', range)];
}

function validateBooleanKey(
  key: string,
  value: unknown,
  range: ReturnType<typeof rangeFromOffsets>,
): Diagnostic[] {
  return typeof value === "boolean"
    ? []
    : [warning(`Front matter key "${key}" should be a boolean.`, range)];
}

function isLikelyDate(value: string): boolean {
  const normalized = value.trim();
  if (!normalized) {
    return false;
  }

  if (/^\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})?)?$/.test(normalized)) {
    return !Number.isNaN(Date.parse(normalized));
  }

  return !Number.isNaN(Date.parse(normalized));
}

function warning(message: string, range: ReturnType<typeof rangeFromOffsets>): Diagnostic {
  return {
    severity: DiagnosticSeverity.Warning,
    message,
    range,
    source: "hugo-lsp",
  };
}
