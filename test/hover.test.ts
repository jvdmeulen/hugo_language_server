import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

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
  assert.match((hover?.contents as { value: string }).value, /Source: project shortcode/i);
});

test("shows hover location and theme name for theme shortcodes", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-theme-hover-"));
  const themeRoot = join(workspaceRoot, "themes", "demo-theme");
  mkdirSync(join(themeRoot, "layouts", "shortcodes"), { recursive: true });
  writeFileSync(join(themeRoot, "layouts", "shortcodes", "promo.html"), "<div></div>");

  const hover = getHover("{{< promo >}}", { line: 0, character: 5 }, {
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

  assert.ok(hover?.contents);
  const value = (hover?.contents as { value: string }).value;
  assert.match(value, /Theme shortcode detected in theme `demo-theme`/i);
  assert.match(value, /Theme: `demo-theme`/i);
  assert.match(value, /Location: `themes\/demo-theme\/layouts\/shortcodes\/promo\.html`/i);
  assert.match(value, /Source: theme shortcode under `themes\/demo-theme\/layouts\/shortcodes`/i);
});

test("shows clear hover for unknown shortcodes", () => {
  const hover = getHover("{{< intr >}}", { line: 0, character: 5 }, {
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
  const value = (hover.contents as { value: string }).value;
  assert.match(value, /Unknown shortcode/i);
  assert.match(value, /not found in the current Hugo shortcode index/i);
  assert.doesNotMatch(value, /Project shortcode detected/i);
  assert.doesNotMatch(value, /built-in Hugo shortcode allowlist/i);
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

test("shows hover value for site params from config", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-site-param-hover-"));
  const normalizedWorkspaceRoot = realpathSync(workspaceRoot);
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  writeFileSync(
    join(workspaceRoot, "config.toml"),
    'baseURL = "https://example.org"\n[params]\npromotedOnRubriek = "nieuws"\n',
  );

  const hover = getHover("{{ site.Params.promotedOnRubriek }}", { line: 0, character: 16 }, {
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

  assert.ok(hover?.contents);
  const value = (hover?.contents as { value: string }).value;
  assert.match(value, /Hugo site param:\*\* `site\.Params\.promotedOnRubriek`|Hugo site param.*`site\.Params\.promotedOnRubriek`/i);
  assert.match(value, /Resolved parameter path: `params\.promotedOnRubriek`/i);
  assert.match(value, /Value:/i);
  assert.match(value, /nieuws/i);
  assert.match(value, /Location: `.*config\.toml`/i);
});

test("shows hover value for site params from uppercase Params config section", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-site-param-hover-upper-"));
  const normalizedWorkspaceRoot = realpathSync(workspaceRoot);
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  writeFileSync(
    join(workspaceRoot, "config.toml"),
    'baseURL = "https://example.org"\n[Params]\ndefaultPagesPerPaginate = 20\n',
  );

  const hover = getHover("{{ .Site.Params.defaultPagesPerPaginate }}", { line: 0, character: 16 }, {
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

  assert.ok(hover?.contents);
  const value = (hover?.contents as { value: string }).value;
  assert.match(value, /defaultPagesPerPaginate/i);
  assert.match(value, /20/);
});

test("shows hover value for site params from root context", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-site-param-hover-root-"));
  const normalizedWorkspaceRoot = realpathSync(workspaceRoot);
  mkdirSync(join(workspaceRoot, "layouts", "_default"), { recursive: true });
  writeFileSync(
    join(workspaceRoot, "config.toml"),
    'baseURL = "https://example.org"\n[Params]\narticle_images = true\n',
  );

  const hover = getHover("{{ $.Site.Params.article_images }}", { line: 0, character: 18 }, {
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

  assert.ok(hover?.contents);
  const value = (hover?.contents as { value: string }).value;
  assert.match(value, /article_images/i);
  assert.match(value, /true/i);
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

  assert.match((keywordHover?.contents as { value: string }).value, /Official Hugo function:.*`range`/i);
  assert.match((keywordHover?.contents as { value: string }).value, /Docs: \[.*\]\(https:\/\/gohugo\.io\/functions\//i);
  assert.match((keywordHover?.contents as { value: string }).value, /Since:/i);
  assert.match((functionHover?.contents as { value: string }).value, /Official Hugo function:.*`fmt\.Printf`|Official Hugo function:.*`printf`/i);
  assert.match((functionHover?.contents as { value: string }).value, /Docs: \[.*\]\(https:\/\/gohugo\.io\/functions\//i);
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
  assert.match((hover?.contents as { value: string }).value, /Official Hugo function:.*`compare\.Eq`|Official Hugo function:.*`eq`/i);
  assert.match((hover?.contents as { value: string }).value, /compare strings, boolean values, dates, slices, maps, and pages/i);
  assert.match((hover?.contents as { value: string }).value, /Docs: \[.*\]\(https:\/\/gohugo\.io\/functions\//i);
});

test("shows hover for template objects and scratch methods", () => {
  const scratchHover = getHover('{{ .Scratch.Get "hero" }}', { line: 0, character: 6 }, {
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
  assert.match((scratchHover?.contents as { value: string }).value, /Official Hugo method:.*`\.Scratch`/i);
  assert.match((scratchHover?.contents as { value: string }).value, /Receiver: `page`/i);
  assert.match((scratchHover?.contents as { value: string }).value, /Docs: \[.*\]\(https:\/\/gohugo\.io\/methods\/page\/scratch\//i);
  assert.ok(siteHover?.contents);
  assert.match((siteHover?.contents as { value: string }).value, /Official Hugo method:.*`\.Site`/i);
  assert.match((siteHover?.contents as { value: string }).value, /Receiver: `page`/i);
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
  assert.match((stringsHover?.contents as { value: string }).value, /Official Hugo function:.*`strings\.TrimPrefix`/i);
  assert.ok(ancestorsHover?.contents);
  assert.match((ancestorsHover?.contents as { value: string }).value, /Official Hugo method:.*`\.Ancestors`/i);
  assert.match((ancestorsHover?.contents as { value: string }).value, /Docs: \[.*\]\(https:\/\/gohugo\.io\/methods\/page\/ancestors\//i);
});

test("shows hover for additional page and site symbols", () => {
  const byDateHover = getHover("{{ range .Pages.ByDate }}", { line: 0, character: 18 }, {
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
  const menusHover = getHover("{{ .Site.Menus.main }}", { line: 0, character: 10 }, {
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

  assert.ok(byDateHover?.contents);
  assert.match((byDateHover?.contents as { value: string }).value, /Official Hugo method:.*`\.ByDate`/i);
  assert.match((byDateHover?.contents as { value: string }).value, /Docs: \[.*\]\(https:\/\/gohugo\.io\/methods\//i);
  assert.match((byDateHover?.contents as { value: string }).value, /Since:/i);
  assert.ok(menusHover?.contents);
  assert.match((menusHover?.contents as { value: string }).value, /Official Hugo method:.*`\.Menus`/i);
  assert.match((menusHover?.contents as { value: string }).value, /Receiver: `site`/i);
});

test("shows hover for shortcode template symbols", () => {
  const getHoverResult = getHover('{{ .Get "title" }}', { line: 0, character: 5 }, {
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
  const innerHoverResult = getHover("{{ .Inner }}", { line: 0, character: 5 }, {
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

  assert.ok(getHoverResult?.contents);
  assert.match((getHoverResult?.contents as { value: string }).value, /Official Hugo method:.*`\.Get`/i);
  assert.match((getHoverResult?.contents as { value: string }).value, /Receiver: `shortcode`/i);
  assert.doesNotMatch((getHoverResult?.contents as { value: string }).value, /Receiver: `taxonomy`/i);
  assert.ok(innerHoverResult?.contents);
  assert.match((innerHoverResult?.contents as { value: string }).value, /Official Hugo method:.*`\.Inner`/i);
  assert.match((innerHoverResult?.contents as { value: string }).value, /Receiver: `shortcode`/i);
});

test("shows hover for additional shortcode methods from official docs", () => {
  const refHover = getHover('{{ .Ref (dict "path" "docs/start-here") }}', { line: 0, character: 5 }, {
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
  const scratchHover = getHover('{{ .Scratch.Set "x" "y" }}', { line: 0, character: 5 }, {
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

  assert.ok(refHover?.contents);
  assert.match((refHover?.contents as { value: string }).value, /Official Hugo method:.*`\.Ref`/i);
  assert.match((refHover?.contents as { value: string }).value, /Receiver: `shortcode`/i);
  assert.doesNotMatch((refHover?.contents as { value: string }).value, /Receiver: `page`/i);
  assert.ok(scratchHover?.contents);
  assert.match((scratchHover?.contents as { value: string }).value, /Official Hugo method:.*`\.Scratch`/i);
  assert.match((scratchHover?.contents as { value: string }).value, /Receiver: `shortcode`/i);
});
