import test from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";

const SERVER_PATH = fileURLToPath(new URL("../src/server.js", import.meta.url));

test("LSP server publishes diagnostics over stdio", async () => {
  const child: ChildProcessWithoutNullStreams = spawn(process.execPath, [SERVER_PATH], {
    stdio: "pipe",
  });

  try {
    const received: string[] = [];
    const stderr: string[] = [];
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      received.push(chunk);
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk: string) => {
      stderr.push(chunk);
    });

    send(
      child.stdin,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          processId: process.pid,
          rootUri: null,
          capabilities: {},
        },
      },
    );

    await waitForMessage(received, `"id":1`);

    send(child.stdin, {
      jsonrpc: "2.0",
      method: "initialized",
      params: {},
    });

    send(child.stdin, {
      jsonrpc: "2.0",
      method: "textDocument/didOpen",
      params: {
        textDocument: {
          uri: "file:///tmp/content/post.md",
          languageId: "markdown",
          version: 1,
          text: "{{< unknown >}}",
        },
      },
    });

    await waitForMessage(received, "textDocument/publishDiagnostics", stderr);

    const payload = received.join("");
    assert.match(payload, /Unknown Hugo shortcode \\"unknown\\"/);
  } finally {
    const exitPromise = once(child, "exit");
    child.kill("SIGKILL");
    await exitPromise;
  }
});

function send(
  stdin: NodeJS.WritableStream,
  message: Record<string, unknown>,
): void {
  const json = JSON.stringify(message);
  stdin.write(`Content-Length: ${Buffer.byteLength(json, "utf8")}\r\n\r\n${json}`);
}

async function waitForMessage(
  received: string[],
  needle: string,
  stderr: string[] = [],
): Promise<void> {
  const start = Date.now();

  while (Date.now() - start < 5_000) {
    if (received.join("").includes(needle)) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  const stderrOutput = stderr.join("").trim();
  throw new Error(
    stderrOutput ? `Timed out waiting for ${needle}: ${stderrOutput}` : `Timed out waiting for ${needle}`,
  );
}
