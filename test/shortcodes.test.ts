import test from "node:test";
import assert from "node:assert/strict";

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
