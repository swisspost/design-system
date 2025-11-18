type CapturedError = {
  message: string;
  source: 'console' | 'error';
  stack?: string;
  timestamp: number;
};

/**
 * Sets up error monitoring for specific components.
 * Captures console.error and uncaught errors.
 * 
 * @param componentNames - Array of component names to monitor for errors
 * @returns Object containing:
 *   - errors: Live array of error messages (used by tests)
 *   - onBeforeLoad: Function to set up error capture on window before app loads
 */
export function setupComponentErrorCapture(componentNames: string[]) {
  const errors: string[] = []; // live array used by tests
  const captured: CapturedError[] = [];

  // Pre-compute lowercase names to avoid repeated lowercasing in the hot path
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  return {
    errors,
    captured,
    onBeforeLoad
  };

  /**
   * Sets up error listeners on the application window before it loads.
   * Intercepts console.error calls and window error events.
   * 
   * @param win - Cypress AUT window object
   */
  function onBeforeLoad(win: Cypress.AUTWindow): void {
    // Store original console.error to call it after capturing
    const originalError = win.console.error.bind(win.console);

    // Intercept console.error() calls from the application
    cy.stub(win.console, 'error').callsFake((...args: any[]) => {
      originalError(...args);
      // Convert all arguments to strings and join them
      const message = args.map(extractMessage).join(' ');
      pushError(message, 'console');
    });

    // Capture uncaught exceptions and runtime errors from the page
    win.addEventListener('error', (e: ErrorEvent) => {
      const message = e.message || extractMessage(e.error);
      const stack = e.error?.stack;
      pushError(message, 'error', stack);
    });
  }

  /**
   * Adds an error to the captured errors array if it passes all filters.
   * Applies relevance checking.
   * 
   * @param message - The error message to capture
   * @param source - The source of the error ('console' or 'error')
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
   * Extracts a readable message from various error formats.
   * Handles strings, Error objects, and other values gracefully.
   * 
   * @param arg - Error object, string, or any value to extract message from
   * @returns Extracted error message as a string
   */
  function extractMessage(arg: unknown): string {
    if (typeof arg === 'string') return arg;
    
    // Handle Error-like objects
    if (arg && typeof arg === 'object') {
      if ('message' in arg && arg.message) {
        return String(arg.message);
      }
      if ('stack' in arg && arg.stack) {
        return String(arg.stack);
      }
    }
    
    // Fallback: try to serialize or convert to string
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
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
  cy.then(() => {
    if (errors.length === 0) return;

    const list = errors.map((m, i) => `${i + 1}. ${m}`).join('\n');
    throw new Error(`Found ${errors.length} error(s) for [${componentNames.join(', ')}]:\n${list}`);
  });
}
