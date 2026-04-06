import {
  RelativePattern,
  WatchKind,
  type DidChangeWatchedFilesParams,
  type DidChangeWatchedFilesRegistrationOptions,
} from "vscode-languageserver/node.js";
import { pathToFileURL } from "node:url";

const WATCH_PATTERNS = [
  "**/{hugo.toml,hugo.yaml,hugo.yml,config.toml}",
  "**/config/_default/**/*.{toml,yaml,yml}",
  "**/layouts/**/*.html",
  "**/content/**/*.{md,markdown}",
];

const WATCH_TRIGGER_PATTERNS = [
  /(^|\/)(hugo\.toml|hugo\.ya?ml|config\.toml)$/i,
  /(^|\/)config\/_default\/.+\.(toml|ya?ml)$/i,
  /(^|\/)layouts\/.+\.html$/i,
  /(^|\/)content\/.+\.(md|markdown)$/i,
];

export function createWatchRegistrationOptions(
  workspaceFolders: string[],
): DidChangeWatchedFilesRegistrationOptions {
  const roots = [...new Set(workspaceFolders)];

  return {
    watchers: roots.flatMap((root) =>
      WATCH_PATTERNS.map((pattern) => ({
        globPattern: {
          baseUri: pathToFileURL(root).toString(),
          pattern,
        } as RelativePattern,
        kind: WatchKind.Create | WatchKind.Change | WatchKind.Delete,
      })),
    ),
  };
}

export function shouldRevalidateForWatchedChanges(
  params: DidChangeWatchedFilesParams,
): boolean {
  return params.changes.some((change) => isRelevantWatchedUri(change.uri));
}

export function isRelevantWatchedUri(uri: string): boolean {
  if (!uri.startsWith("file://")) {
    return false;
  }

  const normalized = decodeURIComponent(uri.replace("file://", ""));
  return WATCH_TRIGGER_PATTERNS.some((pattern) => pattern.test(normalized));
}
