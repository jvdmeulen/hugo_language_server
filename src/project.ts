import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import TOML from "@iarna/toml";
import { parseDocument } from "yaml";

import type { ProjectContext } from "./types.js";

const ROOT_MARKERS = [
  "hugo.toml",
  "hugo.yaml",
  "hugo.yml",
  "config.toml",
  ".git",
];

const HUGO_CONFIG_NAMES = ["hugo.toml", "hugo.yaml", "hugo.yml", "config.toml"];

export function resolveWorkspaceRoot(
  documentUri: string,
  workspaceRoots: string[],
): string | undefined {
  const filePath = uriToFilePath(documentUri);
  if (!filePath) {
    return workspaceRoots[0];
  }

  const matchingRoot = workspaceRoots
    .filter((root) => filePath === root || filePath.startsWith(`${root}/`))
    .sort((left, right) => right.length - left.length)[0];

  return matchingRoot ?? findProjectRoot(dirname(filePath));
}

export function resolveProjectContext(
  documentUri: string,
  workspaceRoots: string[],
): ProjectContext {
  const filePath = uriToFilePath(documentUri);
  const workspaceRoot = resolveWorkspaceRoot(documentUri, workspaceRoots);
  const matchedWorkspaceHugoRoot = filePath
    ? findWorkspaceHugoRootForFile(filePath, workspaceRoots)
    : undefined;
  const hugoRoot =
    matchedWorkspaceHugoRoot ??
    (workspaceRoot ? detectHugoRoot(workspaceRoot) : filePath ? findProjectRoot(dirname(filePath)) : undefined);
  const contentRoots = hugoRoot ? getContentRoots(hugoRoot) : [];

  return {
    workspaceRoot: matchedWorkspaceHugoRoot ?? workspaceRoot,
    hugoRoot,
    isHugoProject: Boolean(hugoRoot),
    contentRoots,
    shortcodeNames: hugoRoot ? getKnownEntries(join(hugoRoot, "layouts", "shortcodes")) : [],
    partialNames: hugoRoot ? getKnownEntries(join(hugoRoot, "layouts", "partials")) : [],
  };
}

export function isContentFile(filePath: string, context: ProjectContext): boolean {
  if (!context.isHugoProject || context.contentRoots.length === 0) {
    return filePath.endsWith(".md");
  }

  return context.contentRoots.some((root) => filePath === root || filePath.startsWith(`${root}/`));
}

export function isTemplateFile(filePath: string, context: ProjectContext): boolean {
  if (!context.hugoRoot || !filePath.endsWith(".html")) {
    return false;
  }

  const layoutsRoot = join(context.hugoRoot, "layouts");
  return filePath === layoutsRoot || filePath.startsWith(`${layoutsRoot}/`);
}

export function getRelativeProjectPath(filePath: string, context: ProjectContext): string | undefined {
  if (!context.hugoRoot) {
    return undefined;
  }

  return relative(context.hugoRoot, filePath);
}

function getKnownEntries(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const names = new Set<string>();
  collectEntries(directory, names);
  return [...names].sort();
}

function collectEntries(directory: string, names: Set<string>, prefix = ""): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      collectEntries(fullPath, names, prefix ? `${prefix}/${entry.name}` : entry.name);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = extname(entry.name);
    if (!extension) {
      continue;
    }

    const baseName = entry.name.slice(0, -extension.length);
    if (!baseName) {
      continue;
    }

    names.add(prefix ? `${prefix}/${baseName}` : baseName);
  }
}

function detectHugoRoot(startDirectory: string): string | undefined {
  let current = startDirectory;

  while (true) {
    if (isHugoDirectory(current)) {
      return current;
    }

    const parent = dirname(current);
    if (parent === current) {
      return undefined;
    }

    current = parent;
  }
}

function findWorkspaceHugoRootForFile(
  filePath: string,
  workspaceRoots: string[],
): string | undefined {
  for (const workspaceRoot of workspaceRoots) {
    const hugoRoot = detectHugoRoot(workspaceRoot);
    if (!hugoRoot) {
      continue;
    }

    const contentRoots = getContentRoots(hugoRoot);
    if (contentRoots.some((root) => filePath === root || filePath.startsWith(`${root}/`))) {
      return hugoRoot;
    }

    const layoutsRoot = join(hugoRoot, "layouts");
    if (filePath === layoutsRoot || filePath.startsWith(`${layoutsRoot}/`)) {
      return hugoRoot;
    }
  }

  return undefined;
}

function isHugoDirectory(directory: string): boolean {
  if (HUGO_CONFIG_NAMES.some((name) => existsSync(join(directory, name)))) {
    return true;
  }

  return existsSync(join(directory, "config", "_default")) || existsSync(join(directory, "layouts"));
}

function getContentRoots(hugoRoot: string): string[] {
  const configuredContentDir = readConfiguredContentDir(hugoRoot);
  const contentDir = configuredContentDir ? resolve(hugoRoot, configuredContentDir) : join(hugoRoot, "content");
  return [contentDir];
}

function readConfiguredContentDir(hugoRoot: string): string | undefined {
  for (const configName of HUGO_CONFIG_NAMES) {
    const configPath = join(hugoRoot, configName);
    if (!existsSync(configPath)) {
      continue;
    }

    const parsed = parseConfigFile(configPath);
    const contentDir = getStringValue(parsed, "contentDir");
    if (contentDir) {
      return contentDir;
    }
  }

  const defaultConfigDir = join(hugoRoot, "config", "_default");
  if (!existsSync(defaultConfigDir)) {
    return undefined;
  }

  for (const entry of readdirSync(defaultConfigDir, { withFileTypes: true })) {
    if (!entry.isFile()) {
      continue;
    }

    const parsed = parseConfigFile(join(defaultConfigDir, entry.name));
    const contentDir = getStringValue(parsed, "contentDir");
    if (contentDir) {
      return contentDir;
    }
  }

  return undefined;
}

function parseConfigFile(path: string): unknown {
  const content = readFileSync(path, "utf8");
  const extension = extname(path);

  try {
    if (extension === ".toml") {
      return TOML.parse(content);
    }

    if (extension === ".yaml" || extension === ".yml") {
      const document = parseDocument(content);
      return document.toJS();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function getStringValue(value: unknown, key: string): string | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const direct = record[key];
  if (typeof direct === "string") {
    return direct;
  }

  return undefined;
}

function findProjectRoot(startDirectory: string): string | undefined {
  let current = startDirectory;

  while (true) {
    if (ROOT_MARKERS.some((marker) => existsSync(join(current, marker)))) {
      return current;
    }

    const parent = dirname(current);
    if (parent === current) {
      return undefined;
    }

    current = parent;
  }
}

function uriToFilePath(uri: string): string | undefined {
  if (!uri.startsWith("file://")) {
    return undefined;
  }

  try {
    const path = fileURLToPath(uri);
    return existsSync(path) || !path.endsWith("/") ? normalizePath(path) : undefined;
  } catch {
    return undefined;
  }
}

function normalizePath(path: string): string {
  try {
    return statSync(path).isDirectory() ? path.replace(/\/$/, "") : path;
  } catch {
    return path.replace(/\/$/, "");
  }
}

export function filePathFromUri(uri: string): string | undefined {
  return uriToFilePath(uri);
}
