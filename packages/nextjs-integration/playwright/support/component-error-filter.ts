import { Page } from '@playwright/test';

const IGNORE_ERROR_PATTERNS = [
  /^hydration failed because/i,
  /^server rendered html didn't match/i,
  /^there was an error while hydrating/i,
  /^hydration error/i,
];

type CapturedError = {
  message: string;
  source: 'console' | 'pageerror';
  stack?: string;
  timestamp: number;
};

/**
 * Sets up error monitoring for specific components.
 * Returns an object with a live `errors` array (strings) and a `dispose` method
 * that removes listeners when the test is done.
 */
export function setupComponentErrorCapture(page: Page, componentNames: string[]) {
  const errors: string[] = []; // live array used by tests
  const captured: CapturedError[] = [];
  const seen = new Set<string>(); // dedupe key: message||stack

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
    IGNORE_ERROR_PATTERNS.some(pattern => pattern.test(text));

  const isRelevant = (message: string): boolean => {
    const lower = message.toLowerCase();
    return lowerCaseComponentNames.some(n => lower.includes(n));
  };

  function pushError(message: string, source: CapturedError['source'], stack?: string) {
    if (isIgnoredError(message) || !isRelevant(message)) return;

    const key = `${message}||${stack ?? ''}`;
    // Avoid exact duplicate entries (same message + same stack)
    if (seen.has(key)) return;
    seen.add(key);

    const entry: CapturedError = { message, source, stack, timestamp: Date.now() };
    captured.push(entry);
    errors.push(message);
  }

  const onConsole = (msg: any) => {
    try {
      if (msg.type && msg.type() === 'error') {
        pushError(msg.text(), 'console');
      }
    } catch {
      // ignore handler errors
    }
  };

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
 * Asserts that no component errors were captured
 * Shows grouped counts for repeated messages to make failures easier to read.
 */
export function assertNoComponentErrors(errors: string[], componentNames: string[]): void {
  if (errors.length === 0) return;

  const counts = errors.reduce<Record<string, number>>((acc, e) => {
    acc[e] = (acc[e] || 0) + 1;
    return acc;
  }, {});

  const unique = Object.keys(counts);
  const list = unique
    .map((m, i) => `  ${i + 1}. ${m}${counts[m] > 1 ? `  (${counts[m]}×)` : ''}`)
    .join('\n');

  throw new Error(`Found ${unique.length} error(s) (${errors.length} occurrences) for [${componentNames.join(', ')}]:\n${list}`);
}
