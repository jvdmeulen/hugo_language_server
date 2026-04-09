import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import type { Location, Position } from "vscode-languageserver";

import type { ProjectContext } from "./types.js";
import { findNamedEntryPath, findSiteParamConfigValue } from "./project.js";
import { offsetAt, rangeFromOffsets } from "./utils.js";

export function getDefinition(
  text: string,
  position: Position,
  options: {
    project?: ProjectContext;
    relativePath?: string;
    documentUri?: string;
  },
): Location[] {
  const project = options.project;
  const variableDefinition = getTemplateVariableDefinition(text, position, options.relativePath, options.documentUri);
  if (variableDefinition) {
    return [variableDefinition];
  }

  if (!project?.hugoRoot) {
    return [];
  }

  const siteParamDefinition = getSiteParamDefinition(text, position, project.hugoRoot, options.relativePath);
  if (siteParamDefinition) {
    return [siteParamDefinition];
  }

  const shortcodeDefinition = getShortcodeDefinition(text, position, project.hugoRoot, project.themeRoots ?? []);
  if (shortcodeDefinition) {
    return [shortcodeDefinition];
  }

  const partialDefinition = getPartialDefinition(
    text,
    position,
    project.hugoRoot,
    project.themeRoots ?? [],
    options.relativePath,
  );
  if (partialDefinition) {
    return [partialDefinition];
  }

  return [];
}

function getTemplateVariableDefinition(
  text: string,
  position: Position,
  relativePath?: string,
  documentUri?: string,
): Location | undefined {
  if (!relativePath?.startsWith("layouts/") || !documentUri) {
    return undefined;
  }

  const offset = offsetAt(text, position);
  const variable = getVariableAtOffset(text, offset);
  if (!variable) {
    return undefined;
  }

  const declaration = findTemplateVariableDeclaration(text, variable.name, offset);
  if (!declaration) {
    return undefined;
  }

  return {
    uri: documentUri,
    range: rangeFromOffsets(text, declaration.start, declaration.end),
  };
}

function getVariableAtOffset(text: string, offset: number): { name: string; start: number; end: number } | undefined {
  for (const match of text.matchAll(/\$[A-Za-z_][A-Za-z0-9_]*/g)) {
    const name = match[0] ?? "";
    const start = match.index ?? 0;
    const end = start + name.length;

    if (offset >= start && offset <= end) {
      return { name, start, end };
    }
  }

  return undefined;
}

function findTemplateVariableDeclaration(
  text: string,
  variableName: string,
  beforeOffset: number,
): { start: number; end: number } | undefined {
  const declarations = collectTemplateVariableDeclarations(text)
    .filter((declaration) => declaration.name === variableName && declaration.start <= beforeOffset)
    .sort((left, right) => right.start - left.start);

  return declarations[0];
}

function getSiteParamDefinition(
  text: string,
  position: Position,
  hugoRoot: string,
  relativePath?: string,
): Location | undefined {
  if (!relativePath?.startsWith("layouts/")) {
    return undefined;
  }

  const offset = offsetAt(text, position);

  for (const action of text.matchAll(/{{-?[\s\S]*?}}/g)) {
    const raw = action[0];
    const actionStart = action.index ?? 0;
    const actionEnd = actionStart + raw.length;

    if (offset < actionStart || offset > actionEnd) {
      continue;
    }

    const bodyOffset = raw.startsWith("{{-") ? 3 : 2;
    const bodyStart = actionStart + bodyOffset;
    const body = raw.slice(bodyOffset, raw.length - 2);

    for (const tokenMatch of body.matchAll(/(^|[\s(|])((?:site|\.Site|\$\.Site)\.Params(?:\.[A-Za-z0-9_-]+)+)\b/g)) {
      const token = tokenMatch[2] ?? "";
      const tokenStart = bodyStart + (tokenMatch.index ?? 0) + (tokenMatch[1]?.length ?? 0);
      const tokenEnd = tokenStart + token.length;

      if (offset < tokenStart || offset > tokenEnd) {
        continue;
      }

      const paramPath = token.replace(/^(?:site|\.Site|\$\.Site)\.Params\./, "");
      const match = findSiteParamConfigValue(hugoRoot, paramPath);
      if (!match) {
        return undefined;
      }

      return {
        uri: pathToFileURL(match.path).toString(),
        range: rangeFromOffsets(readFileSync(match.path, "utf8"), match.startOffset, match.endOffset),
      };
    }
  }

  return undefined;
}

function collectTemplateVariableDeclarations(text: string): Array<{ name: string; start: number; end: number }> {
  const declarations: Array<{ name: string; start: number; end: number }> = [];

  for (const action of text.matchAll(/{{-?[\s\S]*?}}/g)) {
    const actionStart = action.index ?? 0;
    const raw = action[0];

    for (const match of raw.matchAll(/(?:range|with)\s+(\$[A-Za-z_][A-Za-z0-9_]*)\s*,\s*(\$[A-Za-z_][A-Za-z0-9_]*)\s*:=/g)) {
      const firstName = match[1] ?? "";
      const secondName = match[2] ?? "";
      const matchStart = actionStart + (match.index ?? 0);
      const firstStart = matchStart + match[0].indexOf(firstName);
      const secondStart = matchStart + match[0].indexOf(secondName);

      declarations.push({
        name: firstName,
        start: firstStart,
        end: firstStart + firstName.length,
      });
      declarations.push({
        name: secondName,
        start: secondStart,
        end: secondStart + secondName.length,
      });
    }

    for (const match of raw.matchAll(/(^|[^\w$,])(\$[A-Za-z_][A-Za-z0-9_]*)\s*:=/g)) {
      const name = match[2] ?? "";
      const start = actionStart + (match.index ?? 0) + (match[1]?.length ?? 0);
      declarations.push({
        name,
        start,
        end: start + name.length,
      });
    }
  }

  return declarations;
}

function getShortcodeDefinition(
  text: string,
  position: Position,
  hugoRoot: string,
  themeRoots: string[],
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

    const targetPath = findNamedEntryPath(hugoRoot, "shortcodes", name, themeRoots);
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
  themeRoots: string[],
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

    const targetPath = findNamedEntryPath(hugoRoot, "partials", normalizedName, themeRoots);
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
