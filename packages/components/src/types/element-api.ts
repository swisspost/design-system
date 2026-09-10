// Extends the Element interface to include ariaControlsElements, which is part of the
// ARIA reflection API but not yet present in TypeScript's built-in DOM type definitions.
// This can be removed as soon as the installed typescript version adds the declaration by default.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Element {
  ariaControlsElements: Element[];
}
