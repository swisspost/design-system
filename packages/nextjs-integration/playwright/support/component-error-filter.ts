import { Page, ConsoleMessage } from '@playwright/test';

const IGNORE_ERROR_PATTERNS = [
  /^hydration failed because/i,
  /^server rendered html didn't match/i,
  /^there was an error while hydrating/i,
  /^hydration error/i,
  /^a tree hydrated but/i,
];

type CapturedError = {
  message: string;
  source: 'console';
  stack?: string;
  timestamp: number;
};

/**
 * Sets up error monitoring for specific components.
 * Captures console.error messages.
 * Excludes known hydration errors (SSR-specific).
 *
 * @param page - Playwright page object to monitor
 * @param componentNames - Array of component names to monitor for errors
 * @returns Object containing:
 *   - errors: Live array of error messages (used by tests)
 *   - captured: Array of detailed error objects with metadata
 *   - dispose: Function to clean up event listeners
 */
export function setupComponentErrorCapture(page: Page, componentNames: string[]) {
  const errors: string[] = []; // live array used by tests
  const captured: CapturedError[] = [];

  // Pre-compute lowercase names to avoid repeated lowercasing in the hot path
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  page.on('console', onConsole);

  return { errors, dispose, captured } as const;

  /**
   * Event handler for console messages from the page.
   * Captures console.error messages and passes them to pushError.
   *
   * @param msg - Playwright ConsoleMessage object
   */
  function onConsole(msg: ConsoleMessage): void {
    try {
      if (msg.type() === 'error') {
        pushError(msg.text(), 'console');
      }
    } catch {
      // ignore handler errors to prevent test interference
    }
  }

  /**
   * Adds an error to the captured errors array if it passes all filters.
   * Applies relevance checking and ignore pattern filtering.
   *
   * @param message - The error message to capture
   * @param source - The source of the error ('console')
   * @param stack - Optional stack trace for the error
   */
  function pushError(message: string, source: CapturedError['source'], stack?: string): void {
    // Skip hydration errors and errors unrelated to our components
    if (isIgnoredError(message) || !isRelevant(message)) return;

    const entry: CapturedError = { message, source, stack, timestamp: Date.now() };
    captured.push(entry);
    errors.push(message);
  }

  /**
   * Checks if an error message matches known patterns that should be ignored.
   * Currently filters out hydration-related errors and other non-critical messages.
   *
   * @param text - Error message to check against ignore patterns
   * @returns True if the error should be ignored, false otherwise
   */
  function isIgnoredError(text: string): boolean {
    // Check if error message matches any known hydration/non-critical patterns
    return IGNORE_ERROR_PATTERNS.some(pattern => pattern.test(text));
  }

  /**
   * Determines if an error message is relevant to the monitored components.
   * An error is considered relevant if it mentions any of the component names.
   *
   * @param message - Error message to check for component relevance
   * @returns True if the error mentions a monitored component, false otherwise
   */
  function isRelevant(message: string): boolean {
    const lower = message.toLowerCase();
    return lowerCaseComponentNames.some(n => lower.includes(n));
  }

  /**
   * Removes event listeners and cleans up resources.
   * Should be called after tests complete to prevent memory leaks.
   * Safe to call multiple times.
   */
  function dispose(): void {
    try {
      page.off('console', onConsole);
    } catch {
      // best-effort teardown - don't throw during cleanup
    }
  }
}

/**
 * Asserts that no component errors were captured during testing.
 * Throws an error with detailed information if any errors were found.
 *
 * @param errors - Array of error messages captured during test execution
 * @param componentNames - Array of component names that were monitored
 * @throws Error if any errors were captured, with formatted error details
 */
export function assertNoComponentErrors(errors: string[], componentNames: string[]): void {
  if (errors.length === 0) return;

  const list = errors.map((m, i) => `${i + 1}. ${m}`).join('\n');
  throw new Error(`Found ${errors.length} error(s) for [${componentNames.join(', ')}]:\n${list}`);
}
