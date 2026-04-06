import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

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

test("offers shortcode completions in shortcode context", () => {
  const items = getCompletions("Intro\n{{< yo", { line: 1, character: 7 });
  assert.ok(items.some((item) => item.label === "youtube"));
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
