import test from "node:test";
import assert from "node:assert/strict";

import {
  createWatchRegistrationOptions,
  isRelevantWatchedUri,
  shouldRevalidateForWatchedChanges,
} from "../src/watch.js";

test("creates file watch registrations for Hugo-relevant patterns", () => {
  const options = createWatchRegistrationOptions(["/tmp/site"]);

  assert.equal(options.watchers.length, 4);
  assert.ok(
    options.watchers.some((watcher) =>
      typeof watcher.globPattern === "object" &&
      "pattern" in watcher.globPattern &&
      watcher.globPattern.pattern === "**/layouts/**/*.html",
    ),
  );
});

test("recognizes relevant Hugo file changes", () => {
  assert.equal(isRelevantWatchedUri("file:///tmp/site/layouts/partials/hero.html"), true);
  assert.equal(isRelevantWatchedUri("file:///tmp/site/content/post.md"), true);
  assert.equal(isRelevantWatchedUri("file:///tmp/site/config/_default/params.toml"), true);
  assert.equal(isRelevantWatchedUri("file:///tmp/site/static/logo.svg"), false);
});

test("revalidates only when watched changes are relevant", () => {
  assert.equal(
    shouldRevalidateForWatchedChanges({
      changes: [{ uri: "file:///tmp/site/layouts/_default/single.html", type: 2 }],
    }),
    true,
  );

  assert.equal(
    shouldRevalidateForWatchedChanges({
      changes: [{ uri: "file:///tmp/site/static/logo.svg", type: 2 }],
    }),
    false,
  );
});
