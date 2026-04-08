import type { Hover, MarkupContent, Position } from "vscode-languageserver";

import { FRONT_MATTER_KEY_TYPES } from "./constants.js";
import {
  FRONT_MATTER_DOCS,
  EXTRA_TEMPLATE_SYMBOL_DOCS,
  MORE_TEMPLATE_SYMBOL_DOCS,
  SHORTCODE_TEMPLATE_METHOD_DOCS,
  SHORTCODE_TEMPLATE_OBJECT_DOCS,
  SHORTCODE_DOCS,
  TEMPLATE_FUNCTION_DOCS,
  TEMPLATE_KEYWORD_DOCS,
  TEMPLATE_METHOD_DOCS,
  TEMPLATE_OBJECT_DOCS,
} from "./docs.js";
import type { OfficialDocEntry } from "./officialDocs.js";
import type { ProjectContext } from "./types.js";
import { extractFrontMatter } from "./frontMatter.js";
import { getOfficialDocEntriesForCandidates } from "./officialDocs.js";
import { findNamedEntry } from "./project.js";
import { offsetAt, rangeFromOffsets } from "./utils.js";

export function getHover(
  text: string,
  position: Position,
  options?: {
    project?: ProjectContext;
    relativePath?: string;
  },
): Hover | null {
  const frontMatterHover = getFrontMatterHover(text, position);
  if (frontMatterHover) {
    return frontMatterHover;
  }

  const relativePath = options?.relativePath;
  const isTemplate = Boolean(relativePath?.startsWith("layouts/") && relativePath.endsWith(".html"));

  if (isTemplate) {
    return getTemplateHover(text, position, options?.project, relativePath);
  }

  return getShortcodeHover(text, position, options?.project);
}

function getFrontMatterHover(text: string, position: Position): Hover | null {
  const block = extractFrontMatter(text);
  if (!block) {
    return null;
  }

  const offset = offsetAt(text, position);
  const keyPattern =
    block.kind === "yaml"
      ? /(^|\n)(\s*)([A-Za-z][A-Za-z0-9]*)\s*:/g
      : block.kind === "toml"
        ? /(^|\n)(\s*)([A-Za-z][A-Za-z0-9]*)\s*=/g
        : /(^|\n)(\s*)"([A-Za-z][A-Za-z0-9]*)"\s*:/g;

  for (const match of block.content.matchAll(keyPattern)) {
    const key = match[3] ?? "";
    if (!key) {
      continue;
    }

    const contentIndex = match.index ?? 0;
    const quoteOffset = block.kind === "json" ? 1 : 0;
    const keyStart = block.raw.indexOf(block.content) + contentIndex + (match[1]?.length ?? 0) + (match[2]?.length ?? 0) + quoteOffset;
    const keyEnd = keyStart + key.length;

    if (offset < keyStart || offset > keyEnd) {
      continue;
    }

    const doc = FRONT_MATTER_DOCS[key];
    if (!doc) {
      return null;
    }

    return {
      range: rangeFromOffsets(text, keyStart, keyEnd),
      contents: markdown([
        `**Front matter:** \`${key}\``,
        doc.summary,
        `Expected type: \`${FRONT_MATTER_KEY_TYPES[key]?.join(" | ") ?? doc.expected}\``,
        doc.notes?.length ? `Notes:\n${doc.notes.map((note) => `- ${note}`).join("\n")}` : "",
        doc.example ? `Example:\n\`\`\`${block.kind}\n${doc.example}\n\`\`\`` : "",
        "Since: not stated on the official Hugo docs page",
        "Docs: [Hugo front matter](https://gohugo.io/content-management/front-matter/)",
      ]),
    };
  }

  return null;
}

function getShortcodeHover(
  text: string,
  position: Position,
  project?: ProjectContext,
): Hover | null {
  const offset = offsetAt(text, position);

  for (const match of text.matchAll(/{{[%<]\s*\/?([A-Za-z0-9_/-]+)\b[\s\S]*?[>%]}}/g)) {
    const raw = match[0];
    const name = match[1] ?? "";
    const matchIndex = match.index ?? 0;
    const nameStart = matchIndex + raw.indexOf(name);
    const nameEnd = nameStart + name.length;

    if (offset < nameStart || offset > nameEnd) {
      continue;
    }

    const doc = SHORTCODE_DOCS[name];
    const isProjectShortcode = project?.shortcodeNames.includes(name);
    const projectShortcodeEntry = project?.hugoRoot
      ? findNamedEntry(project.hugoRoot, "shortcodes", name, project.themeRoots ?? [])
      : undefined;
    const description = doc?.summary ??
      (projectShortcodeEntry?.source === "theme"
        ? `Theme shortcode detected in theme \`${projectShortcodeEntry.themeName ?? "unknown"}\`.`
        : isProjectShortcode
          ? "Project shortcode detected in `layouts/shortcodes`."
        : "Unknown shortcode. No matching built-in or project shortcode was found.");
    const source = doc
      ? "Source: built-in Hugo shortcode allowlist."
      : projectShortcodeEntry?.source === "theme"
        ? `Source: theme shortcode under \`themes/${projectShortcodeEntry.themeName ?? "unknown"}/layouts/shortcodes\`.`
        : isProjectShortcode
          ? "Source: project shortcode under `layouts/shortcodes`."
        : "Source: not found in the current Hugo shortcode index.";
    const location = projectShortcodeEntry
      ? `Location: \`${projectShortcodeEntry.path}\``
      : "";
    const theme = projectShortcodeEntry?.source === "theme"
      ? `Theme: \`${projectShortcodeEntry.themeName ?? "unknown"}\``
      : "";

    return {
      range: rangeFromOffsets(text, nameStart, nameEnd),
      contents: markdown([
        `**Hugo shortcode:** \`${name}\``,
        description,
        doc ? `Usage:\n\`\`\`md\n${doc.usage}\n\`\`\`` : "",
        doc?.notes?.length ? `Notes:\n${doc.notes.map((note) => `- ${note}`).join("\n")}` : "",
        theme,
        location,
        source,
        "Since: not stated on the official Hugo docs page",
        "Docs: [Hugo shortcodes](https://gohugo.io/content-management/shortcodes/)",
      ]),
    };
  }

  return null;
}

function getTemplateHover(
  text: string,
  position: Position,
  project?: ProjectContext,
  relativePath?: string,
): Hover | null {
  const partialHover = getPartialHover(text, position, project);
  if (partialHover) {
    return partialHover;
  }

  return getActionTokenHover(text, position, relativePath);
}

function getPartialHover(
  text: string,
  position: Position,
  project?: ProjectContext,
): Hover | null {
  const offset = offsetAt(text, position);

  for (const match of text.matchAll(/{{-?\s*partial(?:Cached)?\s+"([^"]+)"/g)) {
    const rawName = match[1] ?? "";
    const name = rawName.replace(/\.html$/, "");
    const matchIndex = match.index ?? 0;
    const quotedIndex = match[0].indexOf(`"${rawName}"`);
    const nameStart = matchIndex + quotedIndex + 1;
    const nameEnd = nameStart + rawName.length;

    if (offset < nameStart || offset > nameEnd) {
      continue;
    }

    const exists = project?.partialNames.includes(name);

    return {
      range: rangeFromOffsets(text, nameStart, nameEnd),
      contents: markdown([
        `**Hugo partial:** \`${name}\``,
        "Partials are reusable template fragments stored under `layouts/partials`.",
        `Usage:\n\`\`\`gotmpl\n{{ partial "${rawName}" . }}\n\`\`\``,
        exists
          ? "Status: found in this project."
          : "Status: not found in the current project scan.",
        "Tip: partials usually receive the current context `.` or a custom `dict` value.",
        "Since: not stated on the official Hugo docs page",
        "Docs: [Hugo partial templates](https://gohugo.io/templates/partial/)",
      ]),
    };
  }

  return null;
}

function markdown(parts: string[]): MarkupContent {
  return {
    kind: "markdown",
    value: parts.filter(Boolean).join("\n\n"),
  };
}

function getActionTokenHover(
  text: string,
  position: Position,
  relativePath?: string,
): Hover | null {
  const offset = offsetAt(text, position);
  const isShortcodeTemplate = Boolean(relativePath?.startsWith("layouts/shortcodes/"));

  for (const action of text.matchAll(/{{-?[\s\S]*?}}/g)) {
    const raw = action[0];
    const actionStart = action.index ?? 0;
    const actionEnd = actionStart + raw.length;

    if (offset < actionStart || offset > actionEnd) {
      continue;
    }

    const bodyOffset = raw.startsWith("{{-") ? 3 : 2;
    const bodyStart = actionStart + bodyOffset;
    const body = raw.slice(bodyOffset, raw.length - 2);

    for (const tokenMatch of body.matchAll(/(^|[\s(|])([$.]?[A-Za-z][A-Za-z0-9.]*)\b/g)) {
      const token = tokenMatch[2] ?? "";
      const tokenStart = bodyStart + (tokenMatch.index ?? 0) + (tokenMatch[1]?.length ?? 0);
      const tokenEnd = tokenStart + token.length;

      if (offset < tokenStart || offset > tokenEnd) {
        continue;
      }

      const relativeOffset = offset - tokenStart;
      const candidates = buildDocumentCandidates(token, relativeOffset);
      const officialEntries = getOfficialDocEntriesForCandidates(candidates, { relativePath });

      if (officialEntries.length > 0) {
        return {
          range: rangeFromOffsets(text, tokenStart, tokenEnd),
          contents: markdown(officialEntries.flatMap((entry, index) => formatOfficialDocEntry(entry, index))),
        };
      }

      const keywordToken = findFirstCandidate(candidates, TEMPLATE_KEYWORD_DOCS);
      if (keywordToken) {
        const keywordDoc = TEMPLATE_KEYWORD_DOCS[keywordToken];
        return {
          range: rangeFromOffsets(text, tokenStart, tokenStart + keywordToken.length),
          contents: markdown([
            `**Hugo template keyword:** \`${keywordToken}\``,
            keywordDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${keywordDoc.usage}\n\`\`\``,
            keywordDoc.notes?.length
              ? `Notes:\n${keywordDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
            "Since: not stated on the official Hugo docs page",
            "Docs: [Hugo templates](https://gohugo.io/templates/introduction/)",
          ]),
        };
      }

      const functionToken = findFirstCandidate(candidates, TEMPLATE_FUNCTION_DOCS);
      if (functionToken) {
        const functionDoc = TEMPLATE_FUNCTION_DOCS[functionToken];
        return {
          range: rangeFromOffsets(text, tokenStart, tokenStart + functionToken.length),
          contents: markdown([
            `**Hugo template function:** \`${functionToken}\``,
            functionDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${functionDoc.usage}\n\`\`\``,
            functionDoc.notes?.length
              ? `Notes:\n${functionDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
            "Since: not stated on the official Hugo docs page",
            "Docs: [Hugo functions](https://gohugo.io/functions/)",
          ]),
        };
      }

      if (isShortcodeTemplate) {
        const shortcodeMethodToken =
          findFirstCandidate(candidates, SHORTCODE_TEMPLATE_METHOD_DOCS) ??
          findDocumentedPrefix(token, SHORTCODE_TEMPLATE_METHOD_DOCS);
        if (shortcodeMethodToken) {
          const shortcodeMethodDoc = SHORTCODE_TEMPLATE_METHOD_DOCS[shortcodeMethodToken];
          const shortcodeMethodEnd = tokenStart + shortcodeMethodToken.length;
          return {
            range: rangeFromOffsets(text, tokenStart, shortcodeMethodEnd),
            contents: markdown([
              `**Hugo shortcode template method:** \`${shortcodeMethodToken}\``,
              shortcodeMethodDoc.summary,
              `Usage:\n\`\`\`gotmpl\n${shortcodeMethodDoc.usage}\n\`\`\``,
              shortcodeMethodDoc.notes?.length
                ? `Notes:\n${shortcodeMethodDoc.notes.map((note) => `- ${note}`).join("\n")}`
                : "",
              "Since: not stated on the official Hugo docs page",
              "Docs: [Hugo shortcode methods](https://gohugo.io/methods/shortcode/)",
            ]),
          };
        }

        const shortcodeObjectToken =
          findFirstCandidate(candidates, SHORTCODE_TEMPLATE_OBJECT_DOCS) ??
          findDocumentedPrefix(token, SHORTCODE_TEMPLATE_OBJECT_DOCS);
        if (shortcodeObjectToken) {
          const shortcodeObjectDoc = SHORTCODE_TEMPLATE_OBJECT_DOCS[shortcodeObjectToken];
          const shortcodeObjectEnd = tokenStart + shortcodeObjectToken.length;
          return {
            range: rangeFromOffsets(text, tokenStart, shortcodeObjectEnd),
            contents: markdown([
              `**Hugo shortcode template object:** \`${shortcodeObjectToken}\``,
              shortcodeObjectDoc.summary,
              `Usage:\n\`\`\`gotmpl\n${shortcodeObjectDoc.usage}\n\`\`\``,
              shortcodeObjectDoc.notes?.length
                ? `Notes:\n${shortcodeObjectDoc.notes.map((note) => `- ${note}`).join("\n")}`
                : "",
              "Since: not stated on the official Hugo docs page",
              "Docs: [Hugo shortcode methods](https://gohugo.io/methods/shortcode/)",
            ]),
          };
        }
      }

      const extraToken = findFirstCandidate(candidates, EXTRA_TEMPLATE_SYMBOL_DOCS);
      if (extraToken) {
        const extraDoc = EXTRA_TEMPLATE_SYMBOL_DOCS[extraToken];
        return {
          range: rangeFromOffsets(text, tokenStart, tokenStart + extraToken.length),
          contents: markdown([
            `**Hugo template ${extraDoc.kind}:** \`${extraToken}\``,
            extraDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${extraDoc.usage}\n\`\`\``,
            extraDoc.notes?.length
              ? `Notes:\n${extraDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
            "Since: not stated on the official Hugo docs page",
            "Docs: [Hugo documentation](https://gohugo.io/documentation/)",
          ]),
        };
      }

      const moreToken = findFirstCandidate(candidates, MORE_TEMPLATE_SYMBOL_DOCS);
      if (moreToken) {
        const moreDoc = MORE_TEMPLATE_SYMBOL_DOCS[moreToken];
        return {
          range: rangeFromOffsets(text, tokenStart, tokenStart + moreToken.length),
          contents: markdown([
            `**Hugo template ${moreDoc.kind}:** \`${moreToken}\``,
            moreDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${moreDoc.usage}\n\`\`\``,
            moreDoc.notes?.length
              ? `Notes:\n${moreDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
            "Since: not stated on the official Hugo docs page",
            "Docs: [Hugo methods](https://gohugo.io/methods/)",
          ]),
        };
      }

      const methodToken =
        findFirstCandidate(candidates, TEMPLATE_METHOD_DOCS) ??
        findDocumentedPrefix(token, TEMPLATE_METHOD_DOCS);
      if (methodToken) {
        const methodDoc = TEMPLATE_METHOD_DOCS[methodToken];
        const methodEnd = tokenStart + methodToken.length;
        return {
          range: rangeFromOffsets(text, tokenStart, methodEnd),
          contents: markdown([
            `**Hugo template method:** \`${methodToken}\``,
            methodDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${methodDoc.usage}\n\`\`\``,
            methodDoc.notes?.length
              ? `Notes:\n${methodDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
            "Since: not stated on the official Hugo docs page",
            "Docs: [Hugo methods](https://gohugo.io/methods/)",
          ]),
        };
      }

      const objectToken =
        findFirstCandidate(candidates, TEMPLATE_OBJECT_DOCS) ??
        findDocumentedPrefix(token, TEMPLATE_OBJECT_DOCS);
      if (objectToken) {
        const objectDoc = TEMPLATE_OBJECT_DOCS[objectToken];
        const objectEnd = tokenStart + objectToken.length;
        return {
          range: rangeFromOffsets(text, tokenStart, objectEnd),
          contents: markdown([
            `**Hugo template object:** \`${objectToken}\``,
            objectDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${objectDoc.usage}\n\`\`\``,
            objectDoc.notes?.length
              ? `Notes:\n${objectDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
            "Since: not stated on the official Hugo docs page",
            "Docs: [Hugo methods](https://gohugo.io/methods/)",
          ]),
        };
      }
    }
  }

  return null;
}

function findDocumentedPrefix<T>(
  token: string,
  docs: Record<string, T>,
): string | undefined {
  const suffixCandidates = buildDotSuffixCandidates(token);
  const candidates = Object.keys(docs)
    .filter((key) => token === key || token.startsWith(`${key}.`) || suffixCandidates.includes(key))
    .sort((left, right) => right.length - left.length);

  return candidates[0];
}

function findFirstCandidate<T>(
  candidates: string[],
  docs: Record<string, T>,
): string | undefined {
  return candidates.find((candidate) => candidate in docs);
}

function buildDocumentCandidates(token: string, relativeOffset: number): string[] {
  const candidates: string[] = [token];

  if (!token.startsWith(".") || !token.includes(".")) {
    return [...new Set(candidates)];
  }

  const parts = token.split(".").filter(Boolean);
  let currentStart = 0;

  for (let index = 0; index < parts.length; index += 1) {
    const segment = parts[index] ?? "";
    const segmentLength = segment.length + 1;
    const segmentEnd = currentStart + segmentLength;

    if (relativeOffset >= currentStart && relativeOffset <= segmentEnd) {
      const prefix = `.${parts.slice(0, index + 1).join(".")}`;
      const local = `.${parts[index]}`;
      candidates.unshift(prefix);
      if (local !== prefix) {
        candidates.push(local);
      }
      break;
    }

    currentStart = segmentEnd;
  }

  return [...new Set(candidates)];
}

function buildDotSuffixCandidates(token: string): string[] {
  if (!token.startsWith(".")) {
    return [];
  }

  const parts = token.split(".").filter(Boolean);
  const candidates: string[] = [];

  for (let index = 1; index < parts.length; index += 1) {
    candidates.push(`.${parts.slice(index).join(".")}`);
  }

  return candidates;
}

function formatOfficialDocEntry(entry: OfficialDocEntry, index: number): string[] {
  const header = entry.kind === "method" ? "**Official Hugo method:**" : "**Official Hugo function:**";
  const contextLine = entry.kind === "method" ? `Receiver: \`${entry.receiver}\`` : `Namespace: \`${entry.namespace}\``;

  return [
    index === 0 ? `${header} \`${entry.symbol}\`` : `---\n${header} \`${entry.symbol}\``,
    contextLine,
    entry.summary || "No summary extracted from the official Hugo docs page.",
    entry.usage ? `Usage:\n\`\`\`gotmpl\n${entry.usage}\n\`\`\`` : "",
    `Since: ${entry.sinceVersion ? `v${entry.sinceVersion}` : "not stated on the official Hugo docs page"}`,
    `Docs: [${entry.title || entry.symbol}](${entry.url})`,
  ];
}
