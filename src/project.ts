import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
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

export interface ConfigParamMatch {
  path: string;
  paramPath: string;
  value: unknown;
  startOffset: number;
  endOffset: number;
}

export function resolveWorkspaceRoot(
  documentUri: string,
  workspaceRoots: string[],
): string | undefined {
  const filePath = uriToFilePath(documentUri);
  if (!filePath) {
    return workspaceRoots[0] ? normalizePath(workspaceRoots[0]) : undefined;
  }

  const normalizedWorkspaceRoots = workspaceRoots.map((root) => normalizePath(root));

  const matchingRoot = normalizedWorkspaceRoots
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
  const themeRoots = hugoRoot ? getThemeRoots(hugoRoot) : [];

  return {
    workspaceRoot: matchedWorkspaceHugoRoot ?? workspaceRoot,
    hugoRoot,
    themeRoots,
    isHugoProject: Boolean(hugoRoot),
    contentRoots,
    shortcodeNames: hugoRoot ? getKnownEntries(getLayoutDirectories(hugoRoot, themeRoots, "shortcodes")) : [],
    shortcodeParamNames: hugoRoot ? getShortcodeParamNames(hugoRoot, themeRoots) : {},
    partialNames: hugoRoot ? getKnownEntries(getLayoutDirectories(hugoRoot, themeRoots, "partials")) : [],
    templateParamNames: hugoRoot ? getTemplateParamNames(hugoRoot, themeRoots) : [],
  };
}

export function isContentFile(filePath: string, context: ProjectContext): boolean {
  const normalizedFilePath = normalizePath(filePath);
  if (!context.isHugoProject || context.contentRoots.length === 0) {
    return normalizedFilePath.endsWith(".md");
  }

  return context.contentRoots.some((root) => normalizedFilePath === root || normalizedFilePath.startsWith(`${root}/`));
}

export function isTemplateFile(filePath: string, context: ProjectContext): boolean {
  const normalizedFilePath = normalizePath(filePath);
  if (!normalizedFilePath.endsWith(".html")) {
    return false;
  }

  const layoutRoots = [
    ...(context.hugoRoot ? [join(context.hugoRoot, "layouts")] : []),
    ...((context.themeRoots ?? []).map((themeRoot) => join(themeRoot, "layouts"))),
  ];

  return layoutRoots.some((layoutsRoot) => normalizedFilePath === layoutsRoot || normalizedFilePath.startsWith(`${layoutsRoot}/`));
}

export function getRelativeProjectPath(filePath: string, context: ProjectContext): string | undefined {
  const normalizedFilePath = normalizePath(filePath);
  const projectLayoutsRoot = context.hugoRoot ? join(context.hugoRoot, "layouts") : undefined;
  if (projectLayoutsRoot && (normalizedFilePath === projectLayoutsRoot || normalizedFilePath.startsWith(`${projectLayoutsRoot}/`))) {
    return relative(context.hugoRoot!, normalizedFilePath);
  }

  for (const themeRoot of context.themeRoots ?? []) {
    const themeLayoutsRoot = join(themeRoot, "layouts");
    if (normalizedFilePath === themeLayoutsRoot || normalizedFilePath.startsWith(`${themeLayoutsRoot}/`)) {
      return relative(themeRoot, normalizedFilePath);
    }
  }

  if (!context.hugoRoot) {
    return undefined;
  }

  return relative(context.hugoRoot, normalizedFilePath);
}

export function findNamedEntryPath(
  hugoRoot: string,
  kind: "partials" | "shortcodes",
  name: string,
  themeRoots: string[] = [],
): string | undefined {
  return findNamedEntry(hugoRoot, kind, name, themeRoots)?.path;
}

export function findNamedEntry(
  hugoRoot: string,
  kind: "partials" | "shortcodes",
  name: string,
  themeRoots: string[] = [],
): { path: string; source: "project" | "theme"; themeName?: string } | undefined {
  const normalizedName = normalizeEntryName(name);

  for (const root of [hugoRoot, ...themeRoots]) {
    const directory = join(root, "layouts", kind);
    if (!existsSync(directory)) {
      continue;
    }

    const path = findEntryByName(directory, normalizedName);
    if (path) {
      if (root === hugoRoot) {
        return { path, source: "project" };
      }

      return {
        path,
        source: "theme",
        themeName: root.split("/").at(-1),
      };
    }
  }

  return undefined;
}

export function findSiteParamConfigValue(
  hugoRoot: string,
  paramPath: string,
): ConfigParamMatch | undefined {
  const normalizedParamPath = normalizeConfigParamPath(paramPath);
  let resolvedMatch: ConfigParamMatch | undefined;

  for (const configPath of getConfigFilePaths(hugoRoot)) {
    const parsed = parseConfigFile(configPath);
    const value = getNestedValueCaseInsensitive(parsed, ["params", ...normalizedParamPath.split(".")]);
    if (value === undefined) {
      continue;
    }

    const raw = readFileSync(configPath, "utf8");
    const location =
      extname(configPath) === ".toml"
        ? findTomlParamLocation(raw, normalizedParamPath)
        : findYamlParamLocation(raw, normalizedParamPath);

    if (!location) {
      continue;
    }

    resolvedMatch = {
      path: configPath,
      paramPath: normalizedParamPath,
      value,
      startOffset: location.startOffset,
      endOffset: location.endOffset,
    };
  }

  return resolvedMatch;
}

function getKnownEntries(directories: string[]): string[] {
  const names = new Set<string>();
  for (const directory of directories) {
    if (!existsSync(directory)) {
      continue;
    }

    collectEntries(directory, names);
  }

  return [...names].sort();
}

function getConfigFilePaths(hugoRoot: string): string[] {
  const paths: string[] = [];

  for (const configName of HUGO_CONFIG_NAMES) {
    const configPath = join(hugoRoot, configName);
    if (existsSync(configPath)) {
      paths.push(normalizePath(configPath));
    }
  }

  const defaultConfigDir = join(hugoRoot, "config", "_default");
  if (existsSync(defaultConfigDir)) {
    const entries = readdirSync(defaultConfigDir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => normalizePath(join(defaultConfigDir, entry.name)))
      .sort();
    paths.push(...entries);
  }

  return [...new Set(paths)];
}

function getTemplateParamNames(hugoRoot: string, themeRoots: string[]): string[] {
  const names = new Set<string>();
  for (const layoutsRoot of getLayoutDirectories(hugoRoot, themeRoots)) {
    if (!existsSync(layoutsRoot)) {
      continue;
    }

    collectTemplateParamNames(layoutsRoot, names);
  }

  return [...names].sort();
}

function getShortcodeParamNames(hugoRoot: string, themeRoots: string[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const shortcodesRoot of getLayoutDirectories(hugoRoot, themeRoots, "shortcodes")) {
    if (!existsSync(shortcodesRoot)) {
      continue;
    }

    collectShortcodeParamNames(shortcodesRoot, result);
  }

  return result;
}

function collectShortcodeParamNames(
  directory: string,
  result: Record<string, string[]>,
  prefix = "",
): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      collectShortcodeParamNames(fullPath, result, prefix ? `${prefix}/${entry.name}` : entry.name);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = extname(entry.name);
    if (extension !== ".html") {
      continue;
    }

    const baseName = entry.name.slice(0, -extension.length);
    const shortcodeName = prefix ? `${prefix}/${baseName}` : baseName;
    const content = readFileSync(fullPath, "utf8");
    result[normalizeEntryName(shortcodeName)] = extractShortcodeParamNames(content);
  }
}

function extractShortcodeParamNames(content: string): string[] {
  const names = new Set<string>();
  const quotedKey = String.raw`["'\`]([A-Za-z][A-Za-z0-9_-]*)["'\`]`;

  for (const match of content.matchAll(new RegExp(String.raw`\.Get\s+${quotedKey}`, "g"))) {
    names.add(normalizeParamName(match[1] ?? ""));
  }

  return [...names].filter(Boolean).sort();
}

function collectTemplateParamNames(directory: string, names: Set<string>): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      collectTemplateParamNames(fullPath, names);
      continue;
    }

    if (!entry.isFile() || extname(entry.name) !== ".html") {
      continue;
    }

    const content = readFileSync(fullPath, "utf8");
    for (const name of extractTemplateParamNames(content)) {
      names.add(name);
    }
  }
}

function extractTemplateParamNames(content: string): string[] {
  const names = new Set<string>();
  const quotedKey = String.raw`["'\`]([A-Za-z][A-Za-z0-9_-]*)["'\`]`;

  for (const match of content.matchAll(/\.Params\.([A-Za-z][A-Za-z0-9_-]*)/g)) {
    names.add(normalizeParamName(match[1] ?? ""));
  }

  for (const match of content.matchAll(new RegExp(String.raw`\.Param\s+${quotedKey}`, "g"))) {
    names.add(normalizeParamName(match[1] ?? ""));
  }

  for (const match of content.matchAll(new RegExp(String.raw`index\s+(?:\.Page\.)?\.Params\s+${quotedKey}`, "g"))) {
    names.add(normalizeParamName(match[1] ?? ""));
  }

  for (const match of content.matchAll(/["'`]\.?Params\.([A-Za-z][A-Za-z0-9_-]*)["'`]/g)) {
    names.add(normalizeParamName(match[1] ?? ""));
  }

  return [...names].filter(Boolean);
}

function normalizeParamName(name: string): string {
  return name.trim().toLowerCase();
}

function getThemeRoots(hugoRoot: string): string[] {
  return getConfiguredThemes(hugoRoot)
    .map((themeName) => join(hugoRoot, "themes", themeName))
    .filter((themeRoot) => existsSync(themeRoot))
    .map((themeRoot) => normalizePath(themeRoot));
}

function getConfiguredThemes(hugoRoot: string): string[] {
  const values = new Set<string>();

  for (const configName of HUGO_CONFIG_NAMES) {
    const configPath = join(hugoRoot, configName);
    if (!existsSync(configPath)) {
      continue;
    }

    const parsed = parseConfigFile(configPath);
    for (const themeName of getStringArrayValue(parsed, "theme")) {
      values.add(themeName);
    }
  }

  const defaultConfigDir = join(hugoRoot, "config", "_default");
  if (existsSync(defaultConfigDir)) {
    for (const entry of readdirSync(defaultConfigDir, { withFileTypes: true })) {
      if (!entry.isFile()) {
        continue;
      }

      const parsed = parseConfigFile(join(defaultConfigDir, entry.name));
      for (const themeName of getStringArrayValue(parsed, "theme")) {
        values.add(themeName);
      }
    }
  }

  return [...values];
}

function getLayoutDirectories(
  hugoRoot: string,
  themeRoots: string[],
  kind?: "partials" | "shortcodes",
  options?: { projectFirst?: boolean },
): string[] {
  const roots = options?.projectFirst ? [hugoRoot, ...themeRoots] : [...themeRoots, hugoRoot];
  return roots.map((root) => (kind ? join(root, "layouts", kind) : join(root, "layouts")));
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

function findEntryByName(directory: string, name: string, prefix = ""): string | undefined {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      const nested = findEntryByName(
        fullPath,
        name,
        prefix ? `${prefix}/${entry.name}` : entry.name,
      );
      if (nested) {
        return nested;
      }
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
    const candidate = normalizeEntryName(prefix ? `${prefix}/${baseName}` : baseName);
    if (candidate === name) {
      return fullPath;
    }
  }

  return undefined;
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
    const hugoRoot = detectHugoRoot(normalizePath(workspaceRoot));
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
  return [normalizePath(contentDir)];
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

function getStringArrayValue(value: unknown, key: string): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }

  const record = value as Record<string, unknown>;
  const direct = record[key];
  if (typeof direct === "string") {
    return [direct];
  }

  if (Array.isArray(direct)) {
    return direct.filter((entry): entry is string => typeof entry === "string");
  }

  return [];
}

function getNestedValue(value: unknown, path: string[]): unknown {
  let current: unknown = value;

  for (const segment of path) {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

function getNestedValueCaseInsensitive(value: unknown, path: string[]): unknown {
  let current: unknown = value;

  for (const segment of path) {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }

    const record = current as Record<string, unknown>;
    const direct = Object.entries(record).find(([key]) => key.toLowerCase() === segment.toLowerCase());
    if (!direct) {
      return undefined;
    }

    current = direct[1];
  }

  return current;
}

function findProjectRoot(startDirectory: string): string | undefined {
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
    const normalized = realpathSync(path);
    return statSync(normalized).isDirectory() ? normalized.replace(/\/$/, "") : normalized;
  } catch {
    try {
      return statSync(path).isDirectory() ? path.replace(/\/$/, "") : path;
    } catch {
      return path.replace(/\/$/, "");
    }
  }
}

function normalizeConfigParamPath(path: string): string {
  return path
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .join(".");
}

function findTomlParamLocation(
  text: string,
  paramPath: string,
): { startOffset: number; endOffset: number } | undefined {
  const lines = text.split("\n");
  let offset = 0;
  let currentParamsPrefix: string | undefined;

  for (const line of lines) {
    const sectionMatch = line.match(/^\s*\[([^\]]+)\]\s*$/);
    if (sectionMatch) {
      const sectionPath = normalizeTomlPath(sectionMatch[1] ?? "").toLowerCase();
      currentParamsPrefix = sectionPath === "params"
        ? ""
        : sectionPath.startsWith("params.")
          ? sectionPath.slice("params.".length)
          : undefined;
      offset += line.length + 1;
      continue;
    }

    const keyMatch = line.match(/^(\s*)([A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*)\s*=/);
    if (keyMatch) {
      const rawKeyPath = normalizeTomlPath(keyMatch[2] ?? "");
      const normalizedKeyPath = rawKeyPath.toLowerCase();
      const fullPath = normalizedKeyPath === "params"
        ? ""
        : normalizedKeyPath.startsWith("params.")
          ? normalizedKeyPath.slice("params.".length)
          : currentParamsPrefix !== undefined
            ? [currentParamsPrefix, normalizedKeyPath].filter(Boolean).join(".")
            : undefined;

      if (fullPath === paramPath.toLowerCase()) {
        const keyStart = offset + (keyMatch[1]?.length ?? 0);
        return {
          startOffset: keyStart,
          endOffset: keyStart + (keyMatch[2]?.length ?? 0),
        };
      }
    }

    offset += line.length + 1;
  }

  return undefined;
}

function findYamlParamLocation(
  text: string,
  paramPath: string,
): { startOffset: number; endOffset: number } | undefined {
  const lines = text.split("\n");
  let offset = 0;
  let inParams = false;
  let paramsIndent = -1;
  const stack: Array<{ indent: number; key: string }> = [];

  for (const line of lines) {
    const keyMatch = line.match(/^(\s*)([A-Za-z0-9_-]+)\s*:/);
    if (!keyMatch) {
      offset += line.length + 1;
      continue;
    }

    const indent = keyMatch[1]?.length ?? 0;
    const key = keyMatch[2] ?? "";
    const normalizedKey = key.toLowerCase();

    if (!inParams) {
      if (indent === 0 && normalizedKey === "params") {
        inParams = true;
        paramsIndent = indent;
        stack.length = 0;
      }
      offset += line.length + 1;
      continue;
    }

    if (indent <= paramsIndent) {
      inParams = indent === 0 && normalizedKey === "params";
      paramsIndent = inParams ? indent : -1;
      stack.length = 0;
      offset += line.length + 1;
      continue;
    }

    while (stack.length > 0 && (stack[stack.length - 1]?.indent ?? 0) >= indent) {
      stack.pop();
    }

    const fullPath = [...stack.map((entry) => entry.key), normalizedKey].join(".");
    if (fullPath === paramPath.toLowerCase()) {
      const keyStart = offset + indent;
      return {
        startOffset: keyStart,
        endOffset: keyStart + key.length,
      };
    }

    stack.push({ indent, key: normalizedKey });
    offset += line.length + 1;
  }

  return undefined;
}

function normalizeTomlPath(path: string): string {
  return path
    .split(".")
    .map((segment) => segment.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean)
    .join(".");
}

export function filePathFromUri(uri: string): string | undefined {
  return uriToFilePath(uri);
}

function normalizeEntryName(name: string): string {
  return name.replace(/\.html$/, "");
}
