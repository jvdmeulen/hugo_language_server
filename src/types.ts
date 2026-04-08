import type {
  CompletionItem,
  Diagnostic,
  Position,
  Range,
} from "vscode-languageserver";

export type FrontMatterKind = "yaml" | "toml" | "json";

export interface FrontMatterBlock {
  kind: FrontMatterKind;
  delimiter: string;
  range: Range;
  contentRange: Range;
  content: string;
  raw: string;
}

export interface AnalysisResult {
  diagnostics: Diagnostic[];
  frontMatter?: FrontMatterBlock;
}

export interface CompletionContext {
  items: CompletionItem[];
  isIncomplete?: boolean;
}

export interface ParsedShortcode {
  name: string;
  closing: boolean;
  range: Range;
  raw: string;
  delimiter: "%" | "<";
}

export interface CompletionRequestContext {
  text: string;
  position: Position;
}

export interface ProjectContext {
  workspaceRoot?: string;
  hugoRoot?: string;
  themeRoots?: string[];
  isHugoProject: boolean;
  contentRoots: string[];
  shortcodeNames: string[];
  shortcodeParamNames?: Record<string, string[]>;
  partialNames: string[];
  templateParamNames?: string[];
}
