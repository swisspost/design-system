import { Page } from '@playwright/test';

const IGNORE_ERROR_PATTERNS = [
  /^hydration failed because/i,
  /^server rendered html didn't match/i,
  /^there was an error while hydrating/i,
  /^hydration error/i,
  /^a tree hydrated but/i,
];

type CapturedError = {
  message: string;
  source: 'console' | 'pageerror';
  stack?: string;
  timestamp: number;
};

/**
 * Sets up error monitoring for specific components.
 * Captures console.error, uncaught errors, and unhandled rejections.
 * Excludes known hydration errors (SSR-specific).
 * @param page - Playwright page object
 * @param componentNames - Array of component names to monitor
 * @returns Object with errors array and dispose method
 */
export function setupComponentErrorCapture(page: Page, componentNames: string[]) {
  const errors: string[] = []; // live array used by tests
  const captured: CapturedError[] = [];
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

  const isIgnoredError = (text: string): boolean =>
    // Check if error message matches any known hydration/non-critical patterns
    IGNORE_ERROR_PATTERNS.some(pattern => pattern.test(text));

  const isRelevant = (message: string): boolean => {
    const lower = message.toLowerCase();
    // Only capture errors that mention one of the monitored component names
    return lowerCaseComponentNames.some(n => lower.includes(n));
  };

  function pushError(message: string, source: CapturedError['source'], stack?: string) {
    // Skip hydration errors and errors unrelated to our components
    if (isIgnoredError(message) || !isRelevant(message)) return;

    const key = `${message}||${stack ?? ''}`;
    // Avoid exact duplicate entries (same message + same stack)
    if (seen.has(key)) return;
    seen.add(key);

    const entry: CapturedError = { message, source, stack, timestamp: Date.now() };
    captured.push(entry);
    errors.push(message);
  }

  // Listener for console.error() and similar console messages
  const onConsole = (msg: any) => {
    try {
      if (msg.type && msg.type() === 'error') {
        pushError(msg.text(), 'console');
      }
    } catch {
      // ignore handler errors
    }
  };

  // Listener for uncaught exceptions and promise rejections
  const onPageError = (err: any) => {
    try {
      const message = extractMessage(err);
      const stack = err?.stack;
      pushError(message, 'pageerror', stack);
    } catch {
      // ignore handler errors
    }
  };

  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  const dispose = () => {
    try {
      page.off('console', onConsole);
      page.off('pageerror', onPageError);
    } catch {
      // best-effort teardown
    }
  };

  return { errors, dispose, captured } as const;
}

/**
 * Asserts that no component errors were captured.
 */
export function assertNoComponentErrors(errors: string[], componentNames: string[]): void {
  if (errors.length === 0) return;

  // Deduplicate errors in case the same error was captured multiple times
  const unique = [...new Set(errors)];
  const list = unique.map((m, i) => `${i + 1}. ${m}`).join('\n');
  throw new Error(`Found ${unique.length} error(s) for [${componentNames.join(', ')}]:\n${list}`);
}