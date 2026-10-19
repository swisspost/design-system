/**
 * Checks whether an element currently matches `:focus-visible`, i.e. whether
 * it was focused via keyboard rather than mouse/touch interaction.
 */
export function isFocusVisible(element: Element | null): boolean {
  if (!element) return false;

  try {
    return element.matches(':focus-visible');
  } catch {
    // Not supported, fall back to always treating focus as visible
    return true;
  }
}
