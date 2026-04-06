#!/usr/bin/env node
import {
  CompletionTriggerKind,
  createConnection,
  DidChangeWatchedFilesNotification,
  ProposedFeatures,
  TextDocumentSyncKind,
} from "vscode-languageserver/node.js";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver";

import { analyzeDocument, getCompletions } from "./analysis.js";
import { getDefinition } from "./definitions.js";
import { getHover } from "./hover.js";
import {
  filePathFromUri,
  getRelativeProjectPath,
  isContentFile,
  isTemplateFile,
  resolveProjectContext,
} from "./project.js";
import {
  createWatchRegistrationOptions,
  shouldRevalidateForWatchedChanges,
} from "./watch.js";

const connection = createConnection(
  ProposedFeatures.all,
  process.stdin,
  process.stdout,
);
const documents = new TextDocuments(TextDocument);
let workspaceRoots: string[] = [];
let supportsWatchedFilesRegistration = false;

connection.onInitialize((params) => {
  supportsWatchedFilesRegistration = Boolean(
    params.capabilities.workspace?.didChangeWatchedFiles?.dynamicRegistration,
  );
  workspaceRoots = [
    ...(params.workspaceFolders ?? []).flatMap((folder) =>
      folder.uri.startsWith("file://") ? [new URL(folder.uri)] : [],
    ),
    ...(params.rootUri?.startsWith("file://") ? [new URL(params.rootUri)] : []),
  ].map((url) => url.pathname);

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      definitionProvider: true,
      hoverProvider: true,
      completionProvider: {
        triggerCharacters: [":", " ", "<", "%", "/"],
      },
    },
    serverInfo: {
      name: "hugo-language-server",
      version: "0.1.0",
    },
  };
});

connection.onInitialized(async () => {
  if (!supportsWatchedFilesRegistration || workspaceRoots.length === 0) {
    return;
  }

  await connection.client.register(
    DidChangeWatchedFilesNotification.type,
    createWatchRegistrationOptions(workspaceRoots),
  );
});

documents.onDidOpen((event) => {
  validate(event.document);
});

documents.onDidChangeContent((event) => {
  validate(event.document);
});

documents.onDidClose((event) => {
  connection.sendDiagnostics({ uri: event.document.uri, diagnostics: [] });
});

connection.onCompletion((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return [];
  }
  const project = resolveProjectContext(document.uri, workspaceRoots);

  if (
    params.context?.triggerKind === CompletionTriggerKind.TriggerCharacter ||
    params.context?.triggerKind === CompletionTriggerKind.Invoked
  ) {
    const filePath = filePathFromUri(document.uri);
    return getCompletions(document.getText(), params.position, {
      project,
      relativePath: filePath ? getRelativeProjectPath(filePath, project) : undefined,
    });
  }

  return [];
});

connection.onDefinition((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return [];
  }

  const filePath = filePathFromUri(document.uri);
  const project = resolveProjectContext(document.uri, workspaceRoots);

  return getDefinition(document.getText(), params.position, {
    project,
    relativePath: filePath ? getRelativeProjectPath(filePath, project) : undefined,
  });
});

connection.onHover((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return null;
  }

  const filePath = filePathFromUri(document.uri);
  const project = resolveProjectContext(document.uri, workspaceRoots);

  return getHover(document.getText(), params.position, {
    project,
    relativePath: filePath ? getRelativeProjectPath(filePath, project) : undefined,
  });
});

connection.onDidChangeWatchedFiles((params) => {
  if (!shouldRevalidateForWatchedChanges(params)) {
    return;
  }

  for (const document of documents.all()) {
    validate(document);
  }
});

function validate(document: TextDocument): void {
  const filePath = filePathFromUri(document.uri);
  if (!filePath) {
    return;
  }
  const project = resolveProjectContext(document.uri, workspaceRoots);
  const isMarkdown = document.languageId === "markdown" || document.uri.endsWith(".md");
  const isTemplate = document.languageId === "html" || isTemplateFile(filePath, project);

  if (!(isMarkdown || isTemplate)) {
    return;
  }

  if (isMarkdown && !isContentFile(filePath, project)) {
    return;
  }

  connection.sendDiagnostics({
    uri: document.uri,
    diagnostics: analyzeDocument(document.getText(), {
      project,
      relativePath: getRelativeProjectPath(filePath, project),
    }).diagnostics,
  });
}

documents.listen(connection);
connection.listen();
