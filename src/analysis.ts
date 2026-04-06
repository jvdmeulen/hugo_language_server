import type { CompletionItem, Diagnostic, Position } from "vscode-languageserver";

import { frontMatterCompletions } from "./completions.js";
import { analyzeFrontMatter } from "./frontMatter.js";
import { analyzeShortcodes, shortcodeCompletion } from "./shortcodes.js";

export function analyzeDocument(text: string): {
  diagnostics: Diagnostic[];
} {
  const frontMatter = analyzeFrontMatter(text);
  const shortcodes = analyzeShortcodes(text);

  return {
    diagnostics: [...frontMatter.diagnostics, ...shortcodes.diagnostics],
  };
}

export function getCompletions(text: string, position: Position): CompletionItem[] {
  const frontMatter = analyzeFrontMatter(text);
  const frontMatterItems = frontMatterCompletions(frontMatter.block, position);
  if (frontMatterItems) {
    return frontMatterItems;
  }

  return shortcodeCompletion(text, position)?.items ?? [];
}
