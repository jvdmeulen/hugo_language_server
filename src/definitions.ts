import { pathToFileURL } from "node:url";
import type { Location, Position } from "vscode-languageserver";

import type { ProjectContext } from "./types.js";
import { findNamedEntryPath } from "./project.js";
import { offsetAt, rangeFromOffsets } from "./utils.js";

export function getDefinition(
  text: string,
  position: Position,
  options: {
    project?: ProjectContext;
    relativePath?: string;
  },
): Location[] {
  const project = options.project;
  if (!project?.hugoRoot) {
    return [];
  }

  const shortcodeDefinition = getShortcodeDefinition(text, position, project.hugoRoot);
  if (shortcodeDefinition) {
    return [shortcodeDefinition];
  }

  const partialDefinition = getPartialDefinition(text, position, project.hugoRoot, options.relativePath);
  if (partialDefinition) {
    return [partialDefinition];
  }

  return [];
}

function getShortcodeDefinition(
  text: string,
  position: Position,
  hugoRoot: string,
): Location | undefined {
  const offset = offsetAt(text, position);

  for (const match of text.matchAll(/{{[%<]\s*\/?([A-Za-z0-9_/-]+)\b[\s\S]*?[>%]}}/g)) {
    const name = match[1] ?? "";
    const raw = match[0];
    const matchIndex = match.index ?? 0;
    const nameStart = matchIndex + raw.indexOf(name);
    const nameEnd = nameStart + name.length;

    if (offset < nameStart || offset > nameEnd) {
      continue;
    }

    const targetPath = findNamedEntryPath(hugoRoot, "shortcodes", name);
    if (!targetPath) {
      return undefined;
    }

    return {
      uri: pathToFileURL(targetPath).toString(),
      range: rangeFromOffsets("", 0, 0),
    };
  }

  return undefined;
}

function getPartialDefinition(
  text: string,
  position: Position,
  hugoRoot: string,
  relativePath?: string,
): Location | undefined {
  if (!relativePath?.startsWith("layouts/")) {
    return undefined;
  }

  const offset = offsetAt(text, position);

  for (const match of text.matchAll(/{{-?\s*partial(?:Cached)?\s+"([^"]+)"/g)) {
    const rawName = match[1] ?? "";
    const normalizedName = rawName.replace(/\.html$/, "");
    const matchIndex = match.index ?? 0;
    const quotedIndex = match[0].indexOf(`"${rawName}"`);
    const nameStart = matchIndex + quotedIndex + 1;
    const nameEnd = nameStart + rawName.length;

    if (offset < nameStart || offset > nameEnd) {
      continue;
    }

    const targetPath = findNamedEntryPath(hugoRoot, "partials", normalizedName);
    if (!targetPath) {
      return undefined;
    }

    return {
      uri: pathToFileURL(targetPath).toString(),
      range: rangeFromOffsets("", 0, 0),
    };
  }

  return undefined;
}
