import { HUGO_FUNCTION_DOCS_DATASET, type HugoFunctionDocEntry } from "./generated/hugoFunctionsDataset.js";
import { HUGO_METHOD_DOCS_DATASET, type HugoMethodDocEntry } from "./generated/hugoMethodsDataset.js";

export type OfficialDocEntry =
  | ({ kind: "function" } & HugoFunctionDocEntry)
  | ({ kind: "method" } & HugoMethodDocEntry);

const OFFICIAL_METHOD_ENTRIES: OfficialDocEntry[] = HUGO_METHOD_DOCS_DATASET.map((entry) => ({
  ...entry,
  kind: "method",
}));

const OFFICIAL_FUNCTION_ENTRIES: OfficialDocEntry[] = HUGO_FUNCTION_DOCS_DATASET.map((entry) => ({
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

  return ["page", "pages", "site", "resource", "resources", "pager", "menu", "menuentry", "outputformat"];
}
