import type { CompletionItem, Diagnostic, Position } from "vscode-languageserver";

import { frontMatterCompletions } from "./completions.js";
import { analyzeFrontMatter } from "./frontMatter.js";
import { HUGO_SHORTCODES } from "./constants.js";
import type { ProjectContext } from "./types.js";
import { analyzeShortcodes, shortcodeCompletion } from "./shortcodes.js";
import { analyzeTemplate, templateCompletion } from "./templates.js";

export function analyzeDocument(
  text: string,
  options?: { project?: ProjectContext; relativePath?: string },
): {
  diagnostics: Diagnostic[];
} {
  const shortcodeNames = getShortcodeNames(options?.project);
  const relativePath = options?.relativePath;
  const isTemplate = Boolean(relativePath?.startsWith("layouts/") && relativePath.endsWith(".html"));

  if (isTemplate) {
    return {
      diagnostics: analyzeTemplate(text, {
        partialNames: options?.project?.partialNames ?? [],
        shortcodeNames,
        relativePath,
      }),
    };
  }

  const frontMatter = analyzeFrontMatter(text, {
    templateParamNames: options?.project?.templateParamNames,
  });
  const shortcodes = analyzeShortcodes(text, shortcodeNames);

  return {
    diagnostics: [...frontMatter.diagnostics, ...shortcodes.diagnostics],
  };
}

export function getCompletions(
  text: string,
  position: Position,
  options?: { project?: ProjectContext; relativePath?: string },
): CompletionItem[] {
  const shortcodeNames = getShortcodeNames(options?.project);
  const relativePath = options?.relativePath;
  const isTemplate = Boolean(relativePath?.startsWith("layouts/") && relativePath.endsWith(".html"));

  if (isTemplate) {
    return templateCompletion(text, position, {
      partialNames: options?.project?.partialNames ?? [],
      relativePath,
    }) ?? [];
  }

  const frontMatter = analyzeFrontMatter(text, {
    templateParamNames: options?.project?.templateParamNames,
  });
  const frontMatterItems = frontMatterCompletions(frontMatter.block, position);
  if (frontMatterItems) {
    return frontMatterItems;
  }

  return shortcodeCompletion(text, position, shortcodeNames)?.items ?? [];
}

function getShortcodeNames(project?: ProjectContext): string[] {
  return [...new Set([...HUGO_SHORTCODES, ...(project?.shortcodeNames ?? [])])];
}
