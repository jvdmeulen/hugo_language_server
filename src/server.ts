#!/usr/bin/env node
import {
  CompletionTriggerKind,
  createConnection,
  ProposedFeatures,
  TextDocumentSyncKind,
} from "vscode-languageserver/node.js";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver";

import { analyzeDocument, getCompletions } from "./analysis.js";

const connection = createConnection(
  ProposedFeatures.all,
  process.stdin,
  process.stdout,
);
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    completionProvider: {
      triggerCharacters: [":", " ", "<", "%", "/"],
    },
  },
  serverInfo: {
    name: "hugo-language-server",
    version: "0.1.0",
  },
}));

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

  if (
    params.context?.triggerKind === CompletionTriggerKind.TriggerCharacter ||
    params.context?.triggerKind === CompletionTriggerKind.Invoked
  ) {
    return getCompletions(document.getText(), params.position);
  }

  return [];
});

function validate(document: TextDocument): void {
  if (document.languageId !== "markdown" && !document.uri.endsWith(".md")) {
    return;
  }

  connection.sendDiagnostics({
    uri: document.uri,
    diagnostics: analyzeDocument(document.getText()).diagnostics,
  });
}

documents.listen(connection);
connection.listen();
