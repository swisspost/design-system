type CapturedError = {
  message: string;
  source: 'console' | 'error';
  stack?: string;
  timestamp: number;
};

/**
 * Sets up error monitoring for specific components.
 * Captures console.error and uncaught errors.
 * @param componentNames - Array of component names to monitor
 * @returns Object with errors array and setup function
 */
export function setupComponentErrorCapture(componentNames: string[]) {
  const errors: string[] = []; // live array used by tests
  const seen = new Set<string>(); // dedupe key: message||stack

  // Pre-compute lowercase names to avoid repeated lowercasing in the hot path
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  const extractMessage = (arg: any): string => {
    if (typeof arg === 'string') return arg;
    if (arg?.message) return arg.message;
    if (arg?.stack) return arg.stack ?? String(arg);
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  };

  const isRelevant = (message: string): boolean => {
    const lower = message.toLowerCase();
    // Only capture errors that mention one of the monitored component names
    return lowerCaseComponentNames.some(n => lower.includes(n));
  };

  function pushError(message: string, source: CapturedError['source'], stack?: string) {
    // Skip errors unrelated to our components
    if (!isRelevant(message)) return;

    const key = `${message}||${stack ?? ''}`;
    // Avoid exact duplicate entries (same message + same stack)
    if (seen.has(key)) return;
    seen.add(key);

    errors.push(message);
  }

  return {
    errors,
    onBeforeLoad(win: Cypress.AUTWindow) {
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
  };
}

/**
 * Asserts that no component errors were captured.
 */
export function assertNoComponentErrors(errors: string[], componentNames: string[]): void {
  cy.then(() => {
    if (errors.length === 0) return;

    // Deduplicate errors in case the same error was captured multiple times
    const unique = [...new Set(errors)];
    const list = unique.map((m, i) => `${i + 1}. ${m}`).join('\n');
    throw new Error(`Found ${unique.length} error(s) for [${componentNames.join(', ')}]:\n${list}`);
  });
}