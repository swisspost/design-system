declare global {
  interface Element {
    ariaLabelledByElements: Element[];
    ariaDescribedByElements: Element[];
  }
}

export {};
