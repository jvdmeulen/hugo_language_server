import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { analyzeDocument, getCompletions } from "../src/analysis.js";
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

test("scans named shortcode params from shortcode templates", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-shortcode-params-"));
  mkdirSync(join(workspaceRoot, "content"), { recursive: true });
  mkdirSync(join(workspaceRoot, "layouts", "shortcodes", "cards"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), "baseURL = 'https://example.org'\n");
  writeFileSync(
    join(workspaceRoot, "layouts", "shortcodes", "cards", "callout.html"),
    '{{ .Get "title" }} {{ .Get `kind` }} {{ .Get 0 }}',
  );

  const context = resolveProjectContext(`file://${join(workspaceRoot, "content", "post.md")}`, [workspaceRoot]);

  assert.deepEqual(context.shortcodeParamNames?.["cards/callout"], ["kind", "title"]);
});

test("scans template params from layouts", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-params-"));
  mkdirSync(join(workspaceRoot, "content"), { recursive: true });
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), "baseURL = 'https://example.org'\n");
  writeFileSync(
    join(workspaceRoot, "layouts", "_default", "single.html"),
    '{{ with .Params.heroImage }}{{ . }}{{ end }} {{ .Param "cta_text" }} {{ index .Params "badge" }} {{ cond true "Params.promotedOnRubriek" ".Params.promotedOnSubRubriek" }}',
  );

  const context = resolveProjectContext(`file://${join(workspaceRoot, "content", "post.md")}`, [workspaceRoot]);

  assert.deepEqual(context.templateParamNames, [
    "badge",
    "cta_text",
    "heroimage",
    "promotedonrubriek",
    "promotedonsubrubriek",
  ]);
});

test("warns when scanned templates do not use a custom front matter param", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-unused-param-"));
  mkdirSync(join(workspaceRoot, "content"), { recursive: true });
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), "baseURL = 'https://example.org'\n");
  writeFileSync(join(workspaceRoot, "layouts", "_default", "single.html"), "{{ .Params.heroImage }}");

  const contentPath = join(workspaceRoot, "content", "post.md");
  const context = resolveProjectContext(`file://${contentPath}`, [workspaceRoot]);
  const diagnostics = analyzeDocument(`---
title: Hello
heroImage: /images/hero.jpg
unusedParam: value
---
Body`, {
    project: context,
    relativePath: "content/post.md",
  }).diagnostics;

  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0]?.message ?? "", /unusedParam.*not found in project templates/);
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

test("reports missing template end blocks", () => {
  const diagnostics = analyzeDocument('{{ if .Title }}<h1>{{ .Title }}</h1>', {
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
      /missing a matching "end"/.test(diagnostic.message),
    ),
  );
});

test("reports unused template variables", () => {
  const diagnostics = analyzeDocument('{{ $title := .Get "title" }}<h1>{{ .Title }}</h1>', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/shortcodes/callout.html",
  }).diagnostics;

  assert.ok(
    diagnostics.some((diagnostic) =>
      /Template variable "\$title" is declared but never used/.test(diagnostic.message),
    ),
  );
});

test("accepts used template variables", () => {
  const diagnostics = analyzeDocument('{{ $title := .Get "title" }}<h1>{{ $title }}</h1>', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/shortcodes/callout.html",
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});

test("reports undefined template variables", () => {
  const diagnostics = analyzeDocument("<h1>{{ $title }}</h1>", {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/shortcodes/callout.html",
  }).diagnostics;

  assert.ok(
    diagnostics.some((diagnostic) =>
      /Template variable "\$title" is used but not defined/.test(diagnostic.message),
    ),
  );
});

test("accepts variables declared by range assignment", () => {
  const diagnostics = analyzeDocument('{{ range $index, $page := .Pages }}{{ $index }}{{ $page.Title }}{{ end }}', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});

test("offers partial completions inside partial calls", () => {
  const items = getCompletions('{{ partial "sh', { line: 0, character: 13 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: ["shared/hero", "footer"],
    },
    relativePath: "layouts/_default/baseof.html",
  });

  assert.ok(items.some((item) => item.label === "shared/hero"));
});

test("offers template keyword completions in actions", () => {
  const items = getCompletions("{{ ra", { line: 0, character: 5 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/baseof.html",
  });

  assert.ok(items.some((item) => item.label === "range"));
  assert.ok(items.some((item) => item.label === "printf"));
});

test("offers template object and method completions", () => {
  const items = getCompletions("{{ .Sc", { line: 0, character: 6 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/baseof.html",
  });

  assert.ok(items.some((item) => item.label === ".Scratch"));
  assert.ok(items.some((item) => item.label === ".Site"));
  assert.ok(!items.some((item) => item.label === ".Version"));
});

test("keeps method completions grouped by receiver context", () => {
  const paginatorItems = getCompletions("{{ .Paginator.", { line: 0, character: 14 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/baseof.html",
  });
  const siteItems = getCompletions("{{ .Site.", { line: 0, character: 9 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/baseof.html",
  });
  const scratchItems = getCompletions("{{ .Scratch.", { line: 0, character: 12 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/baseof.html",
  });

  assert.ok(paginatorItems.some((item) => item.label === ".PageNumber"));
  assert.ok(!paginatorItems.some((item) => item.label === ".Version"));
  assert.ok(siteItems.some((item) => item.label === ".Version"));
  assert.ok(!siteItems.some((item) => item.label === ".PageNumber"));
  assert.ok(scratchItems.some((item) => item.label === ".Scratch.Get"));
  assert.ok(!scratchItems.some((item) => item.label === ".Version"));
});

test("offers shortcode template symbol completions", () => {
  const items = getCompletions("{{ .G", { line: 0, character: 5 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/shortcodes/callout.html",
  });

  assert.ok(items.some((item) => item.label === ".Get"));
  assert.ok(items.some((item) => item.label === ".Inner"));
  assert.ok(items.some((item) => item.label === ".IsNamedParams"));
  assert.ok(items.some((item) => item.label === ".Ref"));
  assert.ok(items.some((item) => item.label === ".Store"));
});

test("computes relative project path for templates", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-"));
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), "baseURL = 'https://example.com'\n");

  const context = resolveProjectContext(`file://${join(workspaceRoot, "layouts", "_default", "single.html")}`, [workspaceRoot]);
  const relativePath = getRelativeProjectPath(join(workspaceRoot, "layouts", "_default", "single.html"), context);
  assert.equal(relativePath, "layouts/_default/single.html");
});
