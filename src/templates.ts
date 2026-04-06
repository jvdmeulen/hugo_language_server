import {
  CompletionItemKind,
  InsertTextFormat,
  DiagnosticSeverity,
  type CompletionItem,
  type Diagnostic,
  type Position,
} from "vscode-languageserver";

import {
  HUGO_SHORTCODE_TEMPLATE_METHODS,
  HUGO_SHORTCODE_TEMPLATE_OBJECTS,
  HUGO_TEMPLATE_BLOCK_KEYWORDS,
  HUGO_TEMPLATE_FUNCTIONS,
  HUGO_TEMPLATE_METHODS,
  HUGO_TEMPLATE_OBJECTS,
} from "./constants.js";
import { offsetAt } from "./utils.js";
import { rangeFromOffsets } from "./utils.js";

export function analyzeTemplate(
  text: string,
  options: {
    partialNames: string[];
    shortcodeNames: string[];
    relativePath?: string;
  },
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  diagnostics.push(...validateTemplateDelimiters(text));
  diagnostics.push(...validateTemplateBlocks(text));
  diagnostics.push(...validatePartials(text, options.partialNames));
  diagnostics.push(...validateShortcodeReferences(text, options.shortcodeNames, options.relativePath));
  return diagnostics;
}

export function templateCompletion(
  text: string,
  position: Position,
  options: {
    partialNames: string[];
    relativePath?: string;
  },
): CompletionItem[] | undefined {
  const beforeCursor = text.slice(0, offsetAt(text, position));

  const partialMatch = /{{-?\s*partial(?:Cached)?\s+"([^"]*)$/.exec(beforeCursor);
  if (partialMatch) {
    return options.partialNames.map((partial) => ({
      label: partial,
      kind: CompletionItemKind.File,
      insertText: partial,
      detail: "Hugo partial",
    }));
  }

  const actionMatch = /{{-?[\s\S]*?\b([A-Za-z.]*)$/.exec(beforeCursor);
  if (!actionMatch) {
    return undefined;
  }

  const keywordItems = HUGO_TEMPLATE_BLOCK_KEYWORDS.map((keyword) => ({
    label: keyword,
    kind: CompletionItemKind.Keyword,
    insertText: keywordSnippet(keyword),
    insertTextFormat: InsertTextFormat.Snippet,
    detail: "Hugo template keyword",
  }));

  const functionItems = HUGO_TEMPLATE_FUNCTIONS.map((fn) => ({
    label: fn,
    kind: CompletionItemKind.Function,
    insertText: fn,
    detail: "Hugo template function",
  }));

  const objectItems = HUGO_TEMPLATE_OBJECTS.map((item) => ({
    label: item,
    kind: CompletionItemKind.Variable,
    insertText: item,
    detail: "Hugo template object",
  }));

  const methodItems = HUGO_TEMPLATE_METHODS.map((item) => ({
    label: item,
    kind: CompletionItemKind.Method,
    insertText: item,
    detail: "Hugo template method",
  }));

  const shortcodeObjectItems = options.relativePath?.startsWith("layouts/shortcodes/")
    ? HUGO_SHORTCODE_TEMPLATE_OBJECTS.map((item) => ({
        label: item,
        kind: CompletionItemKind.Variable,
        insertText: item,
        detail: "Hugo shortcode template object",
      }))
    : [];

  const shortcodeMethodItems = options.relativePath?.startsWith("layouts/shortcodes/")
    ? HUGO_SHORTCODE_TEMPLATE_METHODS.map((item) => ({
        label: item,
        kind: CompletionItemKind.Method,
        insertText: item,
        detail: "Hugo shortcode template method",
      }))
    : [];

  return [
    ...keywordItems,
    ...functionItems,
    ...objectItems,
    ...methodItems,
    ...shortcodeObjectItems,
    ...shortcodeMethodItems,
  ];
}

function validateTemplateDelimiters(text: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const stack: number[] = [];

  for (let index = 0; index < text.length - 1; index += 1) {
    const pair = text.slice(index, index + 2);
    if (pair === "{{") {
      stack.push(index);
      index += 1;
      continue;
    }

    if (pair === "}}") {
      const openIndex = stack.pop();
      if (openIndex === undefined) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: 'Closing "}}" has no matching "{{".',
          range: rangeFromOffsets(text, index, index + 2),
          source: "hugo-lsp",
        });
      }
      index += 1;
    }
  }

  for (const openIndex of stack) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: 'Opening "{{" has no matching "}}".',
      range: rangeFromOffsets(text, openIndex, openIndex + 2),
      source: "hugo-lsp",
    });
  }

  return diagnostics;
}

function validateTemplateBlocks(text: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const stack: Array<{ keyword: string; index: number }> = [];
  const regex = /{{-?\s*([A-Za-z]+)\b[\s\S]*?}}/g;
  const openingKeywords = new Set(["if", "with", "range", "define", "block"]);

  for (const match of text.matchAll(regex)) {
    const keyword = match[1] ?? "";
    const index = match.index ?? 0;

    if (openingKeywords.has(keyword)) {
      stack.push({ keyword, index });
      continue;
    }

    if (keyword === "else") {
      if (stack.length === 0 || !["if", "with", "range"].includes(stack[stack.length - 1]?.keyword ?? "")) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: 'Template keyword "else" does not match an open block.',
          range: rangeFromOffsets(text, index, index + match[0].length),
          source: "hugo-lsp",
        });
      }
      continue;
    }

    if (keyword === "end") {
      const open = stack.pop();
      if (!open) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: 'Template keyword "end" does not match an open block.',
          range: rangeFromOffsets(text, index, index + match[0].length),
          source: "hugo-lsp",
        });
      }
    }
  }

  for (const open of stack) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      message: `Template block "${open.keyword}" is missing a matching "end".`,
      range: rangeFromOffsets(text, open.index, open.index + 2),
      source: "hugo-lsp",
    });
  }

  return diagnostics;
}

function validatePartials(text: string, partialNames: string[]): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const known = new Set(partialNames);
  const regex = /{{-?\s*partial(?:Cached)?\s+"([^"]+)"/g;

  for (const match of text.matchAll(regex)) {
    const partialName = normalizeTemplateLookup(match[1] ?? "");
    if (!partialName || known.size === 0 || known.has(partialName)) {
      continue;
    }

    const start = (match.index ?? 0) + match[0].indexOf(`"${match[1]}"`) + 1;
    diagnostics.push({
      severity: DiagnosticSeverity.Warning,
      message: `Unknown Hugo partial "${partialName}".`,
      range: rangeFromOffsets(text, start, start + partialName.length),
      source: "hugo-lsp",
    });
  }

  return diagnostics;
}

function validateShortcodeReferences(
  text: string,
  shortcodeNames: string[],
  relativePath?: string,
): Diagnostic[] {
  if (!relativePath?.startsWith("layouts/shortcodes/")) {
    return [];
  }

  const diagnostics: Diagnostic[] = [];
  const known = new Set(shortcodeNames);
  const regex = /{{-?\s*%?\s*\/?\s*([A-Za-z0-9_/-]+)\b/g;

  for (const match of text.matchAll(regex)) {
    const candidate = match[1] ?? "";
    if (!candidate || candidate.startsWith(".")) {
      continue;
    }

    if (candidate === "/*" || candidate === "end") {
      continue;
    }

    if (!known.has(candidate)) {
      continue;
    }
  }

  return diagnostics;
}

function normalizeTemplateLookup(name: string): string {
  return name.replace(/\.html$/, "");
}

function keywordSnippet(keyword: string): string {
  if (keyword === "end" || keyword === "else") {
    return keyword;
  }

  if (keyword === "partial") {
    return 'partial "$1" .';
  }

  if (keyword === "partialCached") {
    return 'partialCached "$1" .';
  }

  if (keyword === "template") {
    return 'template "$1" .';
  }

  if (keyword === "define" || keyword === "block") {
    return `${keyword} "$1" }}$0{{ end`;
  }

  return `${keyword} $1 }}$0{{ end`;
}
