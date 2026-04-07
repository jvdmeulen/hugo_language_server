#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const METHODS_REFERENCE_URL = "https://gohugo.io/quick-reference/methods/";
const FUNCTIONS_REFERENCE_URL = "https://gohugo.io/quick-reference/functions/";
const METHODS_OUTPUT_PATH = resolve(SCRIPT_DIR, "../src/generated/hugoMethodsDataset.ts");
const FUNCTIONS_OUTPUT_PATH = resolve(SCRIPT_DIR, "../src/generated/hugoFunctionsDataset.ts");

const methodReferenceEntries = await fetchReferenceEntries(METHODS_REFERENCE_URL, "methods");
const methodDocs = [];

for (const referenceEntry of methodReferenceEntries) {
  const pageHtml = await fetchText(referenceEntry.url);
  const entry = parseMethodPage(referenceEntry, pageHtml);
  if (entry) {
    methodDocs.push(entry);
  }
}

const functionReferenceEntries = await fetchReferenceEntries(FUNCTIONS_REFERENCE_URL, "functions");
const functionDocs = [];

for (const referenceEntry of functionReferenceEntries) {
  const pageHtml = await fetchText(referenceEntry.url);
  const entry = parseFunctionPage(referenceEntry, pageHtml);
  if (entry) {
    functionDocs.push(entry);
  }
}

methodDocs.sort((left, right) => left.symbol.localeCompare(right.symbol) || left.receiver.localeCompare(right.receiver));
functionDocs.sort((left, right) => left.symbol.localeCompare(right.symbol) || left.namespace.localeCompare(right.namespace));

mkdirSync(dirname(METHODS_OUTPUT_PATH), { recursive: true });
writeFileSync(METHODS_OUTPUT_PATH, renderMethodModule(methodDocs), "utf8");
writeFileSync(FUNCTIONS_OUTPUT_PATH, renderFunctionModule(functionDocs), "utf8");

console.log(`Generated ${methodDocs.length} Hugo method entries at ${METHODS_OUTPUT_PATH}`);
console.log(`Generated ${functionDocs.length} Hugo function entries at ${FUNCTIONS_OUTPUT_PATH}`);

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

async function fetchReferenceEntries(indexUrl, kind) {
  const html = await fetchText(indexUrl);
  const entries = [];
  const seen = new Set();

  for (const match of html.matchAll(
    /<dt[^>]*>\s*<a[^>]*href=(?:(["'])([^"']+)\1|([^\s>]+))[^>]*>([\s\S]*?)<\/a>\s*<\/dt>\s*<dd>([\s\S]*?)<\/dd>/gi,
  )) {
    const href = match[2] ?? match[3] ?? "";
    const label = decodeHtml(stripHtml(match[4] ?? "")).trim();
    const summary = normalizeText(match[5] ?? "");

    if (!href || !label) {
      continue;
    }

    const url = new URL(href, indexUrl).toString();
    const pathname = new URL(url).pathname;
    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] !== kind || segments.length !== 3) {
      continue;
    }

    const normalizedUrl = url.endsWith("/") ? url : `${url}/`;
    if (seen.has(normalizedUrl)) {
      continue;
    }

    seen.add(normalizedUrl);
    entries.push({
      url: normalizedUrl,
      segments,
      label,
      summary,
    });
  }

  return entries;
}

function parseMethodPage(referenceEntry, html) {
  const [, receiver, memberSlug] = referenceEntry.segments;
  const title = referenceEntry.label || extractHeading(html) || memberSlug;
  const summary = extractSummary(html) || referenceEntry.summary;
  const usage = extractUsage(html);
  const sinceVersion = extractSinceVersion(html);

  return {
    receiver,
    symbol: `.${title}`,
    memberSlug,
    title,
    summary,
    usage,
    url: referenceEntry.url,
    sinceVersion,
  };
}

function parseFunctionPage(referenceEntry, html) {
  const [, namespace, memberSlug] = referenceEntry.segments;
  const title = referenceEntry.label || extractHeading(html) || memberSlug;
  const summary = extractSummary(html) || referenceEntry.summary;
  const usage = extractUsage(html);
  const sinceVersion = extractSinceVersion(html);
  const aliases = buildFunctionAliases(title, namespace, memberSlug);

  return {
    namespace,
    symbol: title,
    aliases,
    memberSlug,
    title,
    summary,
    usage,
    url: referenceEntry.url,
    sinceVersion,
  };
}

function extractHeading(html) {
  return decodeHtml(matchFirst(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) ?? "").trim();
}

function extractSummary(html) {
  const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((match) => normalizeText(match[1] ?? ""))
    .filter(Boolean)
    .filter((text) => !/^Last updated:/i.test(text))
    .filter((text) => !/^See also/i.test(text));

  return paragraphs[0] ?? "";
}

function extractUsage(html) {
  const code = matchFirst(html, /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
  return code ? stripCodeHtml(code).trim() : undefined;
}

function extractSinceVersion(html) {
  return matchFirst(html, /New in v([0-9.]+)/i);
}

function matchFirst(text, pattern) {
  return pattern.exec(text)?.[1];
}

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, " ");
}

function stripCodeHtml(text) {
  return decodeHtml(text.replace(/<[^>]+>/g, ""));
}

function normalizeText(text) {
  return decodeHtml(stripHtml(text)).replace(/\s+/g, " ").trim();
}

function buildFunctionAliases(title, namespace, memberSlug) {
  const aliases = new Set();

  if (!["go-template", "global"].includes(namespace)) {
    aliases.add(memberSlug);
  }

  const shortName = title.includes(".") ? title.split(".").at(-1) : title;
  if (shortName && /^[A-Z]/.test(shortName)) {
    aliases.add(shortName.charAt(0).toLowerCase() + shortName.slice(1));
  }

  if (title === "collections.Dictionary") {
    aliases.add("dict");
  }

  if (title === "compare.Conditional") {
    aliases.add("cond");
  }

  if (title === "fmt.Errorf") {
    aliases.add("errorf");
  }

  if (title === "fmt.Warnf") {
    aliases.add("warnf");
  }

  return aliases.size > 0 ? [...aliases].sort() : undefined;
}

function decodeHtml(text) {
  return text
    .replace(/&#34;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, "\"")
    .replace(/&ldquo;/g, "\"")
    .replace(/&nbsp;/g, " ");
}

function renderMethodModule(entries) {
  return `export interface HugoMethodDocEntry {
  receiver: string;
  symbol: string;
  memberSlug: string;
  title: string;
  summary: string;
  usage?: string;
  url: string;
  sinceVersion?: string;
}

export const HUGO_METHOD_DOCS_DATASET: HugoMethodDocEntry[] = ${JSON.stringify(entries, null, 2)};\n`;
}

function renderFunctionModule(entries) {
  return `export interface HugoFunctionDocEntry {
  namespace: string;
  symbol: string;
  aliases?: string[];
  memberSlug: string;
  title: string;
  summary: string;
  usage?: string;
  url: string;
  sinceVersion?: string;
}

export const HUGO_FUNCTION_DOCS_DATASET: HugoFunctionDocEntry[] = ${JSON.stringify(entries, null, 2)};\n`;
}
