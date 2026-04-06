import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_MARKERS = [
  "hugo.toml",
  "hugo.yaml",
  "hugo.yml",
  "config.toml",
  ".git",
];

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

export function getKnownShortcodes(workspaceRoot?: string): string[] {
  if (!workspaceRoot) {
    return [];
  }

  const shortcodesDir = join(workspaceRoot, "layouts", "shortcodes");
  if (!existsSync(shortcodesDir)) {
    return [];
  }

  const names = new Set<string>();
  collectShortcodeNames(shortcodesDir, names);
  return [...names].sort();
}

function collectShortcodeNames(directory: string, names: Set<string>, prefix = ""): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      collectShortcodeNames(fullPath, names, prefix ? `${prefix}/${entry.name}` : entry.name);
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
