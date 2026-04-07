import {
  CompletionItemKind,
  InsertTextFormat,
  type CompletionItem,
  type Position,
} from "vscode-languageserver";

import { HUGO_FRONT_MATTER_KEYS } from "./constants.js";
import type { FrontMatterBlock } from "./types.js";
import { isPositionInRange } from "./utils.js";

export function frontMatterCompletions(
  block: FrontMatterBlock | undefined,
  position: Position,
): CompletionItem[] | undefined {
  if (!block || !isPositionInRange(position, block.contentRange)) {
    return undefined;
  }

  return HUGO_FRONT_MATTER_KEYS.map((key) => ({
    label: key,
    kind: CompletionItemKind.Property,
    insertText: frontMatterInsertText(block.kind, key),
    insertTextFormat: InsertTextFormat.Snippet,
    detail: "Hugo front matter key",
  }));
}

function frontMatterInsertText(kind: FrontMatterBlock["kind"], key: string): string {
  if (kind === "toml") {
    return `${key} = "$1"`;
  }

  if (kind === "json") {
    return `"${key}": $1`;
  }

  return `${key}: $1`;
}
