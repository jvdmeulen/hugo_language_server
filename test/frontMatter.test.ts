import test from "node:test";
import assert from "node:assert/strict";

import { analyzeDocument } from "../src/analysis.js";

test("accepts valid YAML front matter", () => {
  const text = `---
title: Hello
draft: false
tags:
  - hugo
---
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.equal(diagnostics.length, 0);
});

test("reports missing front matter delimiter", () => {
  const text = `---
title: Hello`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.equal(diagnostics[0]?.message, "Missing closing --- front matter delimiter.");
});

test("reports unknown front matter keys", () => {
  const text = `---
title: Hello
unknown_field: true
---
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.match(diagnostics[0]?.message ?? "", /Unknown Hugo front matter key/);
});

test("reports invalid TOML front matter", () => {
  const text = `+++
title = "Hello"
draft = nope
+++`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.ok(diagnostics.some((diagnostic) => /Invalid|Unexpected/i.test(diagnostic.message)));
});
