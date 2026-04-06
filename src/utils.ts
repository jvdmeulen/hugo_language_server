import type { Position, Range } from "vscode-languageserver";

export function positionAt(text: string, offset: number): Position {
  const clamped = Math.max(0, Math.min(offset, text.length));
  const lines = text.slice(0, clamped).split("\n");
  return {
    line: lines.length - 1,
    character: lines[lines.length - 1]?.length ?? 0,
  };
}

export function offsetAt(text: string, position: Position): number {
  const lines = text.split("\n");
  let offset = 0;

  for (let index = 0; index < position.line; index += 1) {
    offset += (lines[index]?.length ?? 0) + 1;
  }

  return offset + position.character;
}

export function rangeFromOffsets(
  text: string,
  startOffset: number,
  endOffset: number,
): Range {
  return {
    start: positionAt(text, startOffset),
    end: positionAt(text, endOffset),
  };
}

export function isPositionInRange(position: Position, range: Range): boolean {
  if (position.line < range.start.line || position.line > range.end.line) {
    return false;
  }

  if (
    position.line === range.start.line &&
    position.character < range.start.character
  ) {
    return false;
  }

  if (position.line === range.end.line && position.character > range.end.character) {
    return false;
  }

  return true;
}
