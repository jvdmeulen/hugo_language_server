import type { Hover, MarkupContent, Position } from "vscode-languageserver";

import { FRONT_MATTER_KEY_TYPES } from "./constants.js";
import {
  FRONT_MATTER_DOCS,
  EXTRA_TEMPLATE_SYMBOL_DOCS,
  SHORTCODE_DOCS,
  TEMPLATE_FUNCTION_DOCS,
  TEMPLATE_KEYWORD_DOCS,
  TEMPLATE_METHOD_DOCS,
  TEMPLATE_OBJECT_DOCS,
} from "./docs.js";
import type { ProjectContext } from "./types.js";
import { extractFrontMatter } from "./frontMatter.js";
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
    return getTemplateHover(text, position, options?.project);
  }

  return getShortcodeHover(text, position, options?.project);
}

function getFrontMatterHover(text: string, position: Position): Hover | null {
  const block = extractFrontMatter(text);
  if (!block) {
    return null;
  }

  const offset = offsetAt(text, position);
  const keyPattern = block.kind === "yaml" ? /(^|\n)(\s*)([A-Za-z][A-Za-z0-9]*)\s*:/g : /(^|\n)(\s*)([A-Za-z][A-Za-z0-9]*)\s*=/g;

  for (const match of block.content.matchAll(keyPattern)) {
    const key = match[3] ?? "";
    if (!key) {
      continue;
    }

    const contentIndex = match.index ?? 0;
    const keyStart = block.raw.indexOf(block.content) + contentIndex + (match[1]?.length ?? 0) + (match[2]?.length ?? 0);
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

    return {
      range: rangeFromOffsets(text, nameStart, nameEnd),
      contents: markdown([
        `**Hugo shortcode:** \`${name}\``,
        doc?.summary ?? "Project shortcode detected in `layouts/shortcodes`.",
        doc ? `Usage:\n\`\`\`md\n${doc.usage}\n\`\`\`` : "",
        doc?.notes?.length ? `Notes:\n${doc.notes.map((note) => `- ${note}`).join("\n")}` : "",
        isProjectShortcode ? "Source: project shortcode under `layouts/shortcodes`." : "Source: built-in Hugo shortcode allowlist.",
      ]),
    };
  }

  return null;
}

function getTemplateHover(
  text: string,
  position: Position,
  project?: ProjectContext,
): Hover | null {
  const partialHover = getPartialHover(text, position, project);
  if (partialHover) {
    return partialHover;
  }

  return getActionTokenHover(text, position);
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

function getActionTokenHover(text: string, position: Position): Hover | null {
  const offset = offsetAt(text, position);

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

      const keywordDoc = TEMPLATE_KEYWORD_DOCS[token];
      if (keywordDoc) {
        return {
          range: rangeFromOffsets(text, tokenStart, tokenEnd),
          contents: markdown([
            `**Hugo template keyword:** \`${token}\``,
            keywordDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${keywordDoc.usage}\n\`\`\``,
            keywordDoc.notes?.length
              ? `Notes:\n${keywordDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
          ]),
        };
      }

      const functionDoc = TEMPLATE_FUNCTION_DOCS[token];
      if (functionDoc) {
        return {
          range: rangeFromOffsets(text, tokenStart, tokenEnd),
          contents: markdown([
            `**Hugo template function:** \`${token}\``,
            functionDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${functionDoc.usage}\n\`\`\``,
            functionDoc.notes?.length
              ? `Notes:\n${functionDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
          ]),
        };
      }

      const extraDoc = EXTRA_TEMPLATE_SYMBOL_DOCS[token];
      if (extraDoc) {
        return {
          range: rangeFromOffsets(text, tokenStart, tokenEnd),
          contents: markdown([
            `**Hugo template ${extraDoc.kind}:** \`${token}\``,
            extraDoc.summary,
            `Usage:\n\`\`\`gotmpl\n${extraDoc.usage}\n\`\`\``,
            extraDoc.notes?.length
              ? `Notes:\n${extraDoc.notes.map((note) => `- ${note}`).join("\n")}`
              : "",
          ]),
        };
      }

      const methodToken = findDocumentedPrefix(token, TEMPLATE_METHOD_DOCS);
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
          ]),
        };
      }

      const objectToken = findDocumentedPrefix(token, TEMPLATE_OBJECT_DOCS);
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
  const candidates = Object.keys(docs)
    .filter((key) => token === key || token.startsWith(`${key}.`))
    .sort((left, right) => right.length - left.length);

  return candidates[0];
}
