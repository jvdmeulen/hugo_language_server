import { CompletionItemKind, DiagnosticSeverity, type Diagnostic } from "vscode-languageserver";

import { HUGO_SHORTCODES } from "./constants.js";
import type { CompletionContext, ParsedShortcode } from "./types.js";
import { offsetAt, rangeFromOffsets } from "./utils.js";

const SHORTCODE_SET = new Set(HUGO_SHORTCODES);

export function analyzeShortcodes(text: string): {
  diagnostics: Diagnostic[];
  parsed: ParsedShortcode[];
} {
  const diagnostics: Diagnostic[] = [];
  const parsed: ParsedShortcode[] = [];
  const stack: ParsedShortcode[] = [];
  const shortcodeRegex = /{{[\s\S]*?}}/g;

  for (const match of text.matchAll(shortcodeRegex)) {
    const raw = match[0];
    const start = match.index ?? 0;
    const end = start + raw.length;
    const range = rangeFromOffsets(text, start, end);

    if (!(raw.startsWith("{{<") || raw.startsWith("{{%"))) {
      continue;
    }

    const openingDelimiter = raw[2] as "<" | "%";
    const expectedClose = openingDelimiter === "<" ? ">}}" : "%}}";

    if (!raw.endsWith(expectedClose)) {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `Shortcode delimiter mismatch. Expected "${expectedClose}".`,
        range,
        source: "hugo-lsp",
      });
      continue;
    }

    const body = raw.slice(3, raw.length - 3).trim();
    const closing = body.startsWith("/");
    const name = body.replace(/^\//, "").trim().split(/\s+/)[0] ?? "";

    if (!name) {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: "Shortcode is missing a name.",
        range,
        source: "hugo-lsp",
      });
      continue;
    }

    const shortcode: ParsedShortcode = {
      name,
      closing,
      range,
      raw,
      delimiter: openingDelimiter,
    };
    parsed.push(shortcode);

    if (!SHORTCODE_SET.has(name as (typeof HUGO_SHORTCODES)[number])) {
      diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        message: `Unknown Hugo shortcode "${name}".`,
        range,
        source: "hugo-lsp",
      });
    }

    if (closing) {
      const open = stack.pop();
      if (!open || open.name !== name || open.delimiter !== openingDelimiter) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: `Closing shortcode "${name}" does not match an open shortcode.`,
          range,
          source: "hugo-lsp",
        });
      }
      continue;
    }

    if (isLikelyPairedShortcode(body)) {
      stack.push(shortcode);
    }
  }

  return { diagnostics, parsed };
}

function isLikelyPairedShortcode(body: string): boolean {
  return !body.includes("=") && !body.includes(`"`) && !body.includes(`'`);
}

export function shortcodeCompletion(
  text: string,
  position: { line: number; character: number },
): CompletionContext | undefined {
  const cursorOffset = offsetAt(text, position);
  const beforeCursor = text.slice(0, cursorOffset);
  const match = /{{[%<]\s*\/?([A-Za-z0-9_-]*)$/.exec(beforeCursor);

  if (!match) {
    return undefined;
  }

  return {
    items: HUGO_SHORTCODES.map((shortcode) => ({
      label: shortcode,
      kind: CompletionItemKind.Function,
      insertText: shortcode,
      detail: "Hugo shortcode",
    })),
  };
}
