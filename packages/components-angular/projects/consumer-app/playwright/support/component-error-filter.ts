import { Page, ConsoleMessage } from '@playwright/test';

type CapturedError = {
  message: string;
  source: 'console' | 'pageerror';
  stack?: string;
  timestamp: number;
};

/**
 * Sets up error monitoring for specific components.
 * Captures console.error and uncaught errors.
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
  page.on('pageerror', onPageError);

  return { errors, captured, dispose } as const;

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
   * Event handler for uncaught runtime errors from the page.
   * Captures exceptions thrown during component lifecycle methods.
   *
   * @param error - Error object from the page
   */
  function onPageError(error: Error): void {
    try {
      pushError(error.message, 'pageerror', error.stack);
    } catch {
      // ignore handler errors to prevent test interference
    }
  }

  /**
   * Adds an error to the captured errors array if it passes all filters.
   * Applies relevance checking.
   *
   * @param message - The error message to capture
   * @param source - The source of the error ('console' or 'pageerror')
   * @param stack - Optional stack trace for the error
   */
  function pushError(message: string, source: CapturedError['source'], stack?: string): void {
    // Skip errors unrelated to our components
    if (!isRelevant(message)) return;

    const entry: CapturedError = { message, source, stack, timestamp: Date.now() };
    captured.push(entry);
    errors.push(message);
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
      page.off('pageerror', onPageError);
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