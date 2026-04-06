import { DiagnosticSeverity, type Diagnostic } from "vscode-languageserver";

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
  diagnostics.push(...validatePartials(text, options.partialNames));
  diagnostics.push(...validateShortcodeReferences(text, options.shortcodeNames, options.relativePath));
  return diagnostics;
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
