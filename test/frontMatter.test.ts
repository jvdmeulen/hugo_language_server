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

test("accepts valid JSON front matter", () => {
  const text = `{
  "title": "Hello",
  "draft": false,
  "tags": ["hugo"]
}
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

test("accepts custom front matter params", () => {
  const text = `---
title: Hello
unknown_field: true
heroImage: /images/hero.jpg
---
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.equal(diagnostics.length, 0);
});

test("accepts custom front matter params found in templates", () => {
  const text = `---
title: Hello
heroImage: /images/hero.jpg
cta_text: Read more
---
Body`;

  const diagnostics = analyzeDocument(text, {
    project: {
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
      templateParamNames: ["heroimage", "cta_text"],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});

test("warns about custom front matter params missing from templates", () => {
  const text = `---
title: Hello
heroImage: /images/hero.jpg
unusedParam: value
---
Body`;

  const diagnostics = analyzeDocument(text, {
    project: {
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
      templateParamNames: ["heroimage"],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0]?.message ?? "", /unusedParam.*not found in project templates/);
});

test("accepts params front matter object", () => {
  const text = `---
title: Hello
params:
  heroImage: /images/hero.jpg
---
Body`;

  const diagnostics = analyzeDocument(text, {
    project: {
      isHugoProject: true,
      contentRoots: ["/tmp/demo/content"],
      shortcodeNames: [],
      partialNames: [],
      templateParamNames: ["heroimage"],
    },
  }).diagnostics;

  assert.equal(diagnostics.length, 0);
});

test("reports invalid TOML front matter", () => {
  const text = `+++
title = "Hello"
draft = nope
+++`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.ok(diagnostics.some((diagnostic) => /Invalid|Unexpected/i.test(diagnostic.message)));
});

test("reports invalid JSON front matter", () => {
  const text = `{
  "title": "Hello",
  "draft": nope
}
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.ok(diagnostics.some((diagnostic) => /Unexpected|JSON/i.test(diagnostic.message)));
});

test("reports invalid date-like front matter values", () => {
  const text = `---
title: Hello
date: not-a-date
---
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.ok(
    diagnostics.some((diagnostic) =>
      /should be a valid date or datetime string/.test(diagnostic.message),
    ),
  );
});

test("reports invalid aliases structure", () => {
  const text = `---
title: Hello
aliases:
  - invalid/path
---
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.ok(
    diagnostics.some((diagnostic) =>
      /aliases.*site-relative/.test(diagnostic.message),
    ),
  );
});

test("reports invalid resources structure", () => {
  const text = `---
title: Hello
resources:
  - name: hero
---
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.ok(
    diagnostics.some((diagnostic) =>
      /resources.*src/.test(diagnostic.message),
    ),
  );
});

test("reports invalid cascade structure", () => {
  const text = `---
title: Hello
cascade: wrong
---
Body`;

  const diagnostics = analyzeDocument(text).diagnostics;
  assert.ok(
    diagnostics.some((diagnostic) =>
      /cascade.*object or array of objects/.test(diagnostic.message),
    ),
  );
});
