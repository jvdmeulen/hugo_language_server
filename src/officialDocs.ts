import { HUGO_FUNCTION_DOCS_DATASET, type HugoFunctionDocEntry } from "./generated/hugoFunctionsDataset.js";
import { HUGO_METHOD_DOCS_DATASET, type HugoMethodDocEntry } from "./generated/hugoMethodsDataset.js";

export type OfficialDocEntry =
  | ({ kind: "function" } & HugoFunctionDocEntry)
  | ({ kind: "method" } & HugoMethodDocEntry);

const OFFICIAL_METHOD_ENTRIES: Array<Extract<OfficialDocEntry, { kind: "method" }>> = HUGO_METHOD_DOCS_DATASET.map((entry) => ({
  ...entry,
  kind: "method",
}));

const OFFICIAL_FUNCTION_ENTRIES: Array<Extract<OfficialDocEntry, { kind: "function" }>> = HUGO_FUNCTION_DOCS_DATASET.map((entry) => ({
  ...entry,
  kind: "function",
}));

const OFFICIAL_DOCS_DATASET = [...OFFICIAL_METHOD_ENTRIES, ...OFFICIAL_FUNCTION_ENTRIES];

export function getOfficialDocSymbols(): string[] {
  return [
    ...new Set(
      OFFICIAL_DOCS_DATASET.flatMap((entry) =>
        entry.kind === "function" && entry.aliases?.length
          ? [entry.symbol, ...entry.aliases]
          : [entry.symbol],
      ),
    ),
  ].sort();
}

export function getOfficialDocCompletionEntries(options?: {
  relativePath?: string;
  tokenPrefix?: string;
}): OfficialDocEntry[] {
  const tokenPrefix = options?.tokenPrefix ?? "";
  const entries: OfficialDocEntry[] = [];

  if (!tokenPrefix.startsWith(".")) {
    entries.push(...OFFICIAL_FUNCTION_ENTRIES);
  }

  const receivers = inferCompletionReceivers(tokenPrefix, options?.relativePath);
  if (receivers.length > 0) {
    entries.push(
      ...OFFICIAL_METHOD_ENTRIES.filter((entry) =>
        receivers.includes(entry.receiver),
      ),
    );
  }

  return dedupeOfficialEntries(entries);
}

export function getOfficialDocEntries(symbol: string): OfficialDocEntry[] {
  return OFFICIAL_DOCS_DATASET.filter((entry) => {
    if (entry.symbol === symbol) {
      return true;
    }

    if (entry.kind === "function" && entry.aliases?.includes(symbol)) {
      return true;
    }

    return false;
  });
}

export function getOfficialDocEntriesForCandidates(
  candidates: string[],
  options?: {
    relativePath?: string;
  },
): OfficialDocEntry[] {
  for (const [index, candidate] of candidates.entries()) {
    const entries = getOfficialDocEntries(candidate);
    if (entries.length === 0) {
      continue;
    }

    const selection = selectOfficialEntries(entries, options);
    if (index === 0 || selection.matchedContext || selection.entries.every((entry) => entry.kind === "function")) {
      return selection.entries;
    }
  }

  return [];
}

function selectOfficialEntries(
  entries: OfficialDocEntry[],
  options?: {
    relativePath?: string;
  },
): {
  entries: OfficialDocEntry[];
  matchedContext: boolean;
} {
  const functionEntries = entries.filter((entry): entry is Extract<OfficialDocEntry, { kind: "function" }> => entry.kind === "function");
  if (functionEntries.length > 0) {
    return {
      entries: functionEntries,
      matchedContext: true,
    };
  }

  const methodEntries = entries.filter((entry): entry is Extract<OfficialDocEntry, { kind: "method" }> => entry.kind === "method");
  const preferredReceivers = getPreferredReceivers(options?.relativePath);
  for (const receiver of preferredReceivers) {
    const receiverEntries = methodEntries.filter((entry) => entry.receiver === receiver);
    if (receiverEntries.length > 0) {
      return {
        entries: receiverEntries,
        matchedContext: true,
      };
    }
  }

  return {
    entries: methodEntries,
    matchedContext: false,
  };
}

function getPreferredReceivers(relativePath?: string): string[] {
  if (relativePath?.startsWith("layouts/shortcodes/")) {
    return ["shortcode", "page", "site", "pages", "resource", "resources"];
  }

  return ["page", "pages", "site", "resource", "pager", "menu", "menu-entry", "output-format"];
}

function inferCompletionReceivers(tokenPrefix: string, relativePath?: string): string[] {
  if (!tokenPrefix.startsWith(".")) {
    return [];
  }

  const chain = getCompletionReceiverChain(tokenPrefix);
  if (!chain) {
    return relativePath?.startsWith("layouts/shortcodes/") ? ["shortcode"] : ["page"];
  }

  const exactReceivers = RECEIVERS_BY_CHAIN[chain];
  if (exactReceivers) {
    return exactReceivers;
  }

  if (chain.includes(".Menus.")) {
    return ["menu-entry"];
  }

  if (chain.endsWith(".Menus")) {
    return ["menu"];
  }

  if (chain.endsWith(".Pages") || chain.endsWith(".RegularPages")) {
    return ["pages"];
  }

  if (chain.endsWith(".Paginator") || chain.endsWith(".Pagers")) {
    return ["pager"];
  }

  if (chain.endsWith(".Resources")) {
    return ["resource"];
  }

  if (chain.endsWith(".OutputFormats") || chain.endsWith(".AlternativeOutputFormats")) {
    return ["output-format"];
  }

  return [];
}

function getCompletionReceiverChain(tokenPrefix: string): string | undefined {
  const normalized = tokenPrefix.endsWith(".") ? tokenPrefix.slice(0, -1) : tokenPrefix;
  if (tokenPrefix.endsWith(".")) {
    return normalized || undefined;
  }

  const lastDotIndex = normalized.lastIndexOf(".");
  if (lastDotIndex <= 0) {
    return undefined;
  }

  return normalized.slice(0, lastDotIndex);
}

function dedupeOfficialEntries(entries: OfficialDocEntry[]): OfficialDocEntry[] {
  const seen = new Set<string>();
  const result: OfficialDocEntry[] = [];

  for (const entry of entries) {
    const key = entry.kind === "method"
      ? `${entry.kind}:${entry.receiver}:${entry.symbol}`
      : `${entry.kind}:${entry.namespace}:${entry.symbol}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(entry);
  }

  return result;
}

const RECEIVERS_BY_CHAIN: Record<string, string[]> = {
  ".AlternativeOutputFormats": ["output-format"],
  ".CurrentSection": ["page"],
  ".FirstSection": ["page"],
  ".Home": ["page"],
  ".Next": ["page"],
  ".NextInSection": ["page"],
  ".OutputFormats": ["output-format"],
  ".Page": ["page"],
  ".Pages": ["pages"],
  ".Paginate": ["pager"],
  ".Paginator": ["pager"],
  ".Parent": ["page"],
  ".Prev": ["page"],
  ".PrevInSection": ["page"],
  ".RegularPages": ["pages"],
  ".RegularPagesRecursive": ["pages"],
  ".Resources": ["resource"],
  ".Sections": ["pages"],
  ".Site": ["site"],
  ".Site.Menus": ["menu"],
  ".Translations": ["pages"],
};
