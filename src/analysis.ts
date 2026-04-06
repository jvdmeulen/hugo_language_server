import type { CompletionItem, Diagnostic, Position } from "vscode-languageserver";

import { frontMatterCompletions } from "./completions.js";
import { analyzeFrontMatter } from "./frontMatter.js";
import { HUGO_SHORTCODES } from "./constants.js";
import { getKnownShortcodes } from "./project.js";
import { analyzeShortcodes, shortcodeCompletion } from "./shortcodes.js";

export function analyzeDocument(
  text: string,
  options?: { workspaceRoot?: string },
): {
  diagnostics: Diagnostic[];
} {
  const shortcodeNames = getShortcodeNames(options?.workspaceRoot);
  const frontMatter = analyzeFrontMatter(text);
  const shortcodes = analyzeShortcodes(text, shortcodeNames);

  return {
    diagnostics: [...frontMatter.diagnostics, ...shortcodes.diagnostics],
  };
}

export function getCompletions(
  text: string,
  position: Position,
  options?: { workspaceRoot?: string },
): CompletionItem[] {
  const shortcodeNames = getShortcodeNames(options?.workspaceRoot);
  const frontMatter = analyzeFrontMatter(text);
  const frontMatterItems = frontMatterCompletions(frontMatter.block, position);
  if (frontMatterItems) {
    return frontMatterItems;
  }

  return shortcodeCompletion(text, position, shortcodeNames)?.items ?? [];
}

function getShortcodeNames(workspaceRoot?: string): string[] {
  return [...new Set([...HUGO_SHORTCODES, ...getKnownShortcodes(workspaceRoot)])];
}
