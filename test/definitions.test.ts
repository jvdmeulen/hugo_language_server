import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";

import { getDefinition } from "../src/definitions.js";

test("jumps from markdown shortcode usage to shortcode template", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-"));
  mkdirSync(join(workspaceRoot, "layouts", "shortcodes"), { recursive: true });
  writeFileSync(join(workspaceRoot, "layouts", "shortcodes", "callout.html"), "<div></div>");

  const locations = getDefinition("Before {{< callout >}} after", { line: 0, character: 12 }, {
    project: {
      workspaceRoot,
      hugoRoot: workspaceRoot,
      isHugoProject: true,
      contentRoots: [join(workspaceRoot, "content")],
      shortcodeNames: ["callout"],
      partialNames: [],
    },
  });

  assert.equal(locations[0]?.uri, pathToFileURL(join(workspaceRoot, "layouts", "shortcodes", "callout.html")).toString());
});

test("jumps from partial usage to partial template", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-"));
  mkdirSync(join(workspaceRoot, "layouts", "partials", "shared"), { recursive: true });
  writeFileSync(join(workspaceRoot, "layouts", "partials", "shared", "hero.html"), "<div></div>");

  const locations = getDefinition('{{ partial "shared/hero.html" . }}', { line: 0, character: 16 }, {
    project: {
      workspaceRoot,
      hugoRoot: workspaceRoot,
      isHugoProject: true,
      contentRoots: [join(workspaceRoot, "content")],
      shortcodeNames: [],
      partialNames: ["shared/hero"],
    },
    relativePath: "layouts/_default/single.html",
  });

  assert.equal(locations[0]?.uri, pathToFileURL(join(workspaceRoot, "layouts", "partials", "shared", "hero.html")).toString());
});

test("jumps from markdown shortcode usage to theme shortcode template", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-theme-def-"));
  const themeRoot = join(workspaceRoot, "themes", "demo-theme");
  mkdirSync(join(themeRoot, "layouts", "shortcodes"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), 'theme = "demo-theme"\n');
  writeFileSync(join(themeRoot, "layouts", "shortcodes", "promo.html"), "<div></div>");

  const locations = getDefinition("Before {{< promo >}} after", { line: 0, character: 12 }, {
    project: {
      workspaceRoot,
      hugoRoot: workspaceRoot,
      themeRoots: [themeRoot],
      isHugoProject: true,
      contentRoots: [join(workspaceRoot, "content")],
      shortcodeNames: ["promo"],
      partialNames: [],
    },
  });

  assert.equal(locations[0]?.uri, pathToFileURL(join(themeRoot, "layouts", "shortcodes", "promo.html")).toString());
});

test("jumps from partial usage to theme partial template", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-theme-partial-def-"));
  const themeRoot = join(workspaceRoot, "themes", "demo-theme");
  mkdirSync(join(themeRoot, "layouts", "partials", "shared"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), 'theme = "demo-theme"\n');
  writeFileSync(join(themeRoot, "layouts", "partials", "shared", "hero.html"), "<div></div>");

  const locations = getDefinition('{{ partial "shared/hero.html" . }}', { line: 0, character: 16 }, {
    project: {
      workspaceRoot,
      hugoRoot: workspaceRoot,
      themeRoots: [themeRoot],
      isHugoProject: true,
      contentRoots: [join(workspaceRoot, "content")],
      shortcodeNames: [],
      partialNames: ["shared/hero"],
    },
    relativePath: "layouts/_default/single.html",
  });

  assert.equal(locations[0]?.uri, pathToFileURL(join(themeRoot, "layouts", "partials", "shared", "hero.html")).toString());
});

test("jumps from template variable usage to declaration", () => {
  const uri = "file:///tmp/demo/layouts/shortcodes/callout.html";
  const locations = getDefinition('{{ $title := .Get "title" }}<h1>{{ $title }}</h1>', { line: 0, character: 36 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/shortcodes/callout.html",
    documentUri: uri,
  });

  assert.equal(locations[0]?.uri, uri);
  assert.deepEqual(locations[0]?.range.start, { line: 0, character: 3 });
});

test("jumps from range variable usage to declaration", () => {
  const uri = "file:///tmp/demo/layouts/_default/list.html";
  const text = "{{ range $index, $page := .Pages }}{{ $page.Title }}{{ end }}";
  const locations = getDefinition(text, { line: 0, character: 40 }, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
    documentUri: uri,
  });

  assert.equal(locations[0]?.uri, uri);
  assert.deepEqual(locations[0]?.range.start, { line: 0, character: 17 });
});

test("jumps from site params usage to config param definition", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-site-param-def-"));
  const normalizedWorkspaceRoot = realpathSync(workspaceRoot);
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  const configPath = join(workspaceRoot, "config.toml");
  writeFileSync(
    configPath,
    'baseURL = "https://example.org"\n[params]\npromotedOnRubriek = "nieuws"\n',
  );
  const normalizedConfigPath = realpathSync(configPath);

  const locations = getDefinition("{{ site.Params.promotedOnRubriek }}", { line: 0, character: 16 }, {
    project: {
      workspaceRoot,
      hugoRoot: normalizedWorkspaceRoot,
      isHugoProject: true,
      contentRoots: [join(normalizedWorkspaceRoot, "content")],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
  });

  assert.equal(locations[0]?.uri, pathToFileURL(normalizedConfigPath).toString());
  assert.deepEqual(locations[0]?.range.start, { line: 2, character: 0 });
});

test("jumps from site params usage to uppercase Params config section", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-site-param-def-upper-"));
  const normalizedWorkspaceRoot = realpathSync(workspaceRoot);
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  const configPath = join(workspaceRoot, "config.toml");
  writeFileSync(
    configPath,
    'baseURL = "https://example.org"\n[Params]\ndefaultPagesPerPaginate = 20\n',
  );
  const normalizedConfigPath = realpathSync(configPath);

  const locations = getDefinition("{{ .Site.Params.defaultPagesPerPaginate }}", { line: 0, character: 18 }, {
    project: {
      workspaceRoot,
      hugoRoot: normalizedWorkspaceRoot,
      isHugoProject: true,
      contentRoots: [join(normalizedWorkspaceRoot, "content")],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
  });

  assert.equal(locations[0]?.uri, pathToFileURL(normalizedConfigPath).toString());
  assert.deepEqual(locations[0]?.range.start, { line: 2, character: 0 });
});

test("jumps from root-context site params usage to config param definition", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-site-param-def-root-"));
  const normalizedWorkspaceRoot = realpathSync(workspaceRoot);
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  const configPath = join(workspaceRoot, "config.toml");
  writeFileSync(
    configPath,
    'baseURL = "https://example.org"\n[Params]\narticle_images = true\n',
  );
  const normalizedConfigPath = realpathSync(configPath);

  const locations = getDefinition("{{ $.Site.Params.article_images }}", { line: 0, character: 18 }, {
    project: {
      workspaceRoot,
      hugoRoot: normalizedWorkspaceRoot,
      isHugoProject: true,
      contentRoots: [join(normalizedWorkspaceRoot, "content")],
      shortcodeNames: [],
      partialNames: [],
    },
    relativePath: "layouts/_default/list.html",
  });

  assert.equal(locations[0]?.uri, pathToFileURL(normalizedConfigPath).toString());
  assert.deepEqual(locations[0]?.range.start, { line: 2, character: 0 });
});
