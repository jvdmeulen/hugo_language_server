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

test("does not offer front matter completions outside front matter", () => {
  const items = getCompletions("Body\nplain text", { line: 1, character: 4 });
  assert.equal(items.length, 0);
});
