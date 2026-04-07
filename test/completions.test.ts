import test from "node:test";
import assert from "node:assert/strict";

import { getCompletions } from "../src/analysis.js";

test("offers front matter completions inside YAML block", () => {
  const items = getCompletions(`---
ti
---
Body`, { line: 1, character: 2 });

  assert.ok(items.some((item) => item.label === "title"));
});

test("offers front matter completions inside JSON block", () => {
  const items = getCompletions('{\n  "ti', { line: 1, character: 5 });
  const title = items.find((item) => item.label === "title");

  assert.ok(title);
  assert.equal(title.insertText, '"title": $1');
});

test("does not offer front matter completions outside front matter", () => {
  const items = getCompletions("Body\nplain text", { line: 1, character: 4 });
  assert.equal(items.length, 0);
});
