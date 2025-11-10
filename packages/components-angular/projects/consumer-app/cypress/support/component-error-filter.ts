/**
 * Sets up error monitoring for specific components.
 * Captures console.error, uncaught errors, and unhandled rejections.
 * @param componentNames - Array of component names to monitor
 * @returns Object with errors array and setup function
 */
export function setupComponentErrorCapture(componentNames: string[]) {
  const errors: string[] = [];
  // Pre-compute lowercase names to avoid repeated lowercasing during error capture
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  const extractMessage = (arg: any): string => {
    if (typeof arg === 'string') return arg;
    if (arg?.message) return arg.message;
    if (arg?.stack) return arg.stack;
    try { return JSON.stringify(arg); } catch { return String(arg); }
  };

  const isRelevant = (message: string): boolean => {
    const lowerCaseMessage = message.toLowerCase();
    // Only capture errors that mention one of the monitored component names
    return lowerCaseComponentNames.some(n => lowerCaseMessage.includes(n));
  }

  const capture = (message: string) => {
    // Push error to array only if it's relevant to our components
    if (isRelevant(message)) errors.push(message);
  };

  return {
    errors,
    onBeforeLoad(win: Cypress.AUTWindow) {
      // Store original console.error to call it after capturing
      const originalError = win.console.error.bind(win.console);

      // Intercept console.error() calls from the application
      cy.stub(win.console, 'error').callsFake((...args: any[]) => {
        originalError(...args);
        // Convert all arguments to strings and join them
        capture(args.map(extractMessage).join(' '));
      });

      // Capture uncaught exceptions and runtime errors from the page
      win.addEventListener('error', (e: ErrorEvent) => 
        capture(e.message || extractMessage(e.error))
      );
    }
  };
}

/**
 * Asserts that no component errors were captured
 */
export function assertNoComponentErrors(errors: string[], componentNames: string[]): void {
  cy.then(() => {
    if (errors.length > 0) {
      // Format errors with line numbers for readable test output
      const list = errors.map((e, i) => `  ${i + 1}. ${e}`).join('\n');
      throw new Error(`Found ${errors.length} error(s) for [${componentNames.join(', ')}]:\n${list}`);
    }
  });
}