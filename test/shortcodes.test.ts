import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { CompletionItemKind } from "vscode-languageserver";

import { analyzeDocument, getCompletions } from "../src/analysis.js";

test("accepts known shortcode", () => {
  const diagnostics = analyzeDocument("{{< youtube abc123 >}}").diagnostics;
  assert.equal(diagnostics.length, 0);
});

test("reports unknown shortcode", () => {
  const diagnostics = analyzeDocument("{{< demo >}}").diagnostics;
  assert.match(diagnostics[0]?.message ?? "", /Unknown Hugo shortcode/);
});

test("reports mismatched closing shortcode", () => {
  const diagnostics = analyzeDocument("{{% highlight %}}{{% /figure %}}").diagnostics;
  assert.ok(
    diagnostics.some((diagnostic) =>
      /does not match an open shortcode/.test(diagnostic.message),
    ),
  );
});

test("accepts paired shortcodes with params and nested self-contained shortcodes", () => {
  const diagnostics = analyzeDocument(`{{< vraagopmaak titel="is it working" >}}
{{< vraag
"vraag"= "Where can i register"
"antwoord"= "You can register on the main page"
>}}
{{< /vraagopmaak >}}`, {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: ["vraagopmaak", "vraag"],
      partialNames: [],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});

test("offers shortcode completions in shortcode context", () => {
  const items = getCompletions("Intro\n{{< yo", { line: 1, character: 7 });
  const youtube = items.find((item) => item.label === "youtube");
  assert.ok(youtube);
  assert.equal(youtube.kind, CompletionItemKind.Text);
  assert.equal(youtube.detail, "Hugo shortcode");
  assert.equal(youtube.labelDetails?.description, "Hugo shortcode");
});

test("accepts project shortcode from layouts/shortcodes", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-"));
  mkdirSync(join(workspaceRoot, "layouts", "shortcodes"), { recursive: true });
  writeFileSync(join(workspaceRoot, "layouts", "shortcodes", "callout.html"), "<div></div>");

  const diagnostics = analyzeDocument("{{< callout >}}", {
    project: {
      workspaceRoot,
      hugoRoot: workspaceRoot,
      isHugoProject: true,
      contentRoots: [join(workspaceRoot, "content")],
      shortcodeNames: ["callout"],
      partialNames: [],
    },
  }).diagnostics;
  assert.equal(diagnostics.length, 0);
});

test("offers completion for project shortcode", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-"));
  mkdirSync(join(workspaceRoot, "layouts", "shortcodes"), { recursive: true });
  writeFileSync(join(workspaceRoot, "layouts", "shortcodes", "gallery.html"), "<div></div>");

  const items = getCompletions("{{< ga", { line: 0, character: 6 }, {
    project: {
      workspaceRoot,
      hugoRoot: workspaceRoot,
      isHugoProject: true,
      contentRoots: [join(workspaceRoot, "content")],
      shortcodeNames: ["gallery"],
      partialNames: [],
    },
  });
  assert.ok(items.some((item) => item.label === "gallery"));
});

test("accepts shortcode from the configured theme", () => {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "hugo-lsp-theme-shortcode-"));
  const themeRoot = join(workspaceRoot, "themes", "demo-theme");
  mkdirSync(join(themeRoot, "layouts", "shortcodes"), { recursive: true });
  writeFileSync(join(workspaceRoot, "hugo.toml"), 'theme = "demo-theme"\n');
  writeFileSync(join(themeRoot, "layouts", "shortcodes", "promo.html"), '{{ .Get "title" }}');

  const diagnostics = analyzeDocument('{{< promo title="Hello" >}}', {
    project: {
      workspaceRoot,
      hugoRoot: workspaceRoot,
      themeRoots: [themeRoot],
      isHugoProject: true,
      contentRoots: [join(workspaceRoot, "content")],
      shortcodeNames: ["promo"],
      shortcodeParamNames: {
        promo: ["title"],
      },
      partialNames: [],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});

test("accepts known named shortcode params from project templates", () => {
  const diagnostics = analyzeDocument('{{< callout title="Hello" kind="info" >}}', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: ["callout"],
      shortcodeParamNames: {
        callout: ["kind", "title"],
      },
      partialNames: [],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});

test("warns about unknown named shortcode params", () => {
  const diagnostics = analyzeDocument('{{< callout title="Hello" colour="blue" >}}', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: ["callout"],
      shortcodeParamNames: {
        callout: ["kind", "title"],
      },
      partialNames: [],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0]?.message ?? "", /Unknown parameter "colour" for Hugo shortcode "callout"/);
});

test("does not validate shortcode params without a project schema", () => {
  const diagnostics = analyzeDocument('{{< callout colour="blue" >}}', {
    project: {
      workspaceRoot: "/tmp/demo",
      hugoRoot: "/tmp/demo",
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: ["callout"],
      partialNames: [],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});
