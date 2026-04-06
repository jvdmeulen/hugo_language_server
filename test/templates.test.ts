import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { analyzeDocument } from "../src/analysis.js";
import { resolveProjectContext, getRelativeProjectPath } from "../src/project.js";

test("detects Hugo root and custom contentDir", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-"));
  mkdirSync(join(workspaceRoot, "config", "_default"), { recursive: true });
  writeFileSync(join(workspaceRoot, "config", "_default", "hugo.toml"), 'contentDir = "docs"\n');
  mkdirSync(join(workspaceRoot, "docs"), { recursive: true });

  const context = resolveProjectContext(`file://${join(workspaceRoot, "docs", "post.md")}`, [workspaceRoot]);
  assert.equal(context.isHugoProject, true);
  assert.equal(context.contentRoots[0], join(workspaceRoot, "docs"));
});

test("matches external contentDir back to the Hugo root", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-root-"));
  const externalContentRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-content-"));

  writeFileSync(join(workspaceRoot, "config.toml"), `contentDir = "${externalContentRoot}"\n`);
  mkdirSync(join(workspaceRoot, "layouts", "shortcodes"), { recursive: true });
  writeFileSync(join(workspaceRoot, "layouts", "shortcodes", "callout.html"), "<div></div>");
  writeFileSync(join(externalContentRoot, "post.md"), "{{< callout >}}\n");

  const context = resolveProjectContext(`file://${join(externalContentRoot, "post.md")}`, [workspaceRoot]);

  assert.equal(context.hugoRoot, workspaceRoot);
  assert.equal(context.isHugoProject, true);
  assert.ok(context.shortcodeNames.includes("callout"));
});

test("reports template delimiter mismatches", () => {
  const diagnostics = analyzeDocument('{{ partial "header" . ', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/single.html",
  }).diagnostics;

  assert.ok(
    diagnostics.some((diagnostic) =>
      /Opening "{{" has no matching "}}"/.test(diagnostic.message),
    ),
  );
});

test("reports unknown partials in templates", () => {
  const diagnostics = analyzeDocument('{{ partial "missing/sidebar.html" . }}', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: ["footer", "header"],
    },
    relativePath: "layouts/_default/baseof.html",
  }).diagnostics;

  assert.ok(
    diagnostics.some((diagnostic) =>
      /Unknown Hugo partial "missing\/sidebar"/.test(diagnostic.message),
    ),
  );
});

test("computes relative project path for templates", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-"));
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), "baseURL = 'https://example.com'\n");

  const context = resolveProjectContext(`file://${join(workspaceRoot, "layouts", "_default", "single.html")}`, [workspaceRoot]);
  const relativePath = getRelativeProjectPath(join(workspaceRoot, "layouts", "_default", "single.html"), context);
  assert.equal(relativePath, "layouts/_default/single.html");
});
