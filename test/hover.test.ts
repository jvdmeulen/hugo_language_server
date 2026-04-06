import test from "node:test";
import assert from "node:assert/strict";

import { getHover } from "../src/hover.js";

test("shows hover for front matter keys", () => {
  const hover = getHover(`---\ntitle: Hello\n---\nBody`, { line: 1, character: 2 });
  assert.ok(hover?.contents);
  const contents = hover?.contents;
  assert.equal(typeof contents, "object");
  assert.match((contents as { value: string }).value, /Front matter:\*\* `title`|Front matter.*`title`/);
  assert.match((contents as { value: string }).value, /Expected type/);
  assert.match((contents as { value: string }).value, /primary page title/i);
});

test("shows hover for built-in shortcodes", () => {
  const hover = getHover("{{< youtube abc123 >}}", { line: 0, character: 5 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
  });

  assert.ok(hover?.contents);
  assert.match((hover?.contents as { value: string }).value, /Hugo shortcode.*`youtube`/);
  assert.match((hover?.contents as { value: string }).value, /Usage:/);
  assert.match((hover?.contents as { value: string }).value, /Embeds a YouTube video/i);
});

test("shows hover for project shortcodes", () => {
  const hover = getHover("{{< callout >}}", { line: 0, character: 5 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: ["callout"],
      partialNames: [],
    },
  });

  assert.ok(hover?.contents);
  assert.match((hover?.contents as { value: string }).value, /Project shortcode detected/i);
});

test("shows hover for partial calls", () => {
  const hover = getHover('{{ partial "shared/hero.html" . }}', { line: 0, character: 14 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: ["shared/hero"],
    },
    relativePath: "layouts/_default/baseof.html",
  });

  assert.ok(hover?.contents);
  assert.match((hover?.contents as { value: string }).value, /Hugo partial.*`shared\/hero`/);
  assert.match((hover?.contents as { value: string }).value, /found in this project/i);
});

test("shows hover for template keywords and functions", () => {
  const keywordHover = getHover("{{ range .Pages }}", { line: 0, character: 4 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
  });
  const functionHover = getHover("{{ printf \"%s\" .Title }}", { line: 0, character: 4 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
  });

  assert.match((keywordHover?.contents as { value: string }).value, /template keyword.*`range`/i);
  assert.match((functionHover?.contents as { value: string }).value, /template function.*`printf`/i);
});

test("shows hover for comparison functions inside template expressions", () => {
  const hover = getHover("{{ if eq .Section \"docs\" }}", { line: 0, character: 7 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
  });

  assert.ok(hover?.contents);
  assert.match((hover?.contents as { value: string }).value, /template function.*`eq`/i);
  assert.match((hover?.contents as { value: string }).value, /all provided arguments are equal/i);
});

test("shows hover for template objects and scratch methods", () => {
  const scratchHover = getHover('{{ .Scratch.Get "hero" }}', { line: 0, character: 11 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/single.html",
  });
  const siteHover = getHover("{{ .Site.Title }}", { line: 0, character: 5 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/single.html",
  });

  assert.ok(scratchHover?.contents);
  assert.match((scratchHover?.contents as { value: string }).value, /template method.*`\.Scratch\.Get`/i);
  assert.match((scratchHover?.contents as { value: string }).value, /returns a scratch value by key/i);
  assert.ok(siteHover?.contents);
  assert.match((siteHover?.contents as { value: string }).value, /template object.*`\.Site`/i);
});

test("shows hover for extended namespaced and page symbols", () => {
  const stringsHover = getHover('{{ strings.TrimPrefix "/docs/" .RelPermalink }}', { line: 0, character: 12 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/single.html",
  });
  const ancestorsHover = getHover("{{ range .Ancestors }}", { line: 0, character: 11 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/single.html",
  });

  assert.ok(stringsHover?.contents);
  assert.match((stringsHover?.contents as { value: string }).value, /template function.*`strings\.TrimPrefix`/i);
  assert.ok(ancestorsHover?.contents);
  assert.match((ancestorsHover?.contents as { value: string }).value, /template object.*`\.Ancestors`/i);
});
