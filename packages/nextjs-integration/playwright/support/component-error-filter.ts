import { Page } from '@playwright/test';

const IGNORE_ERROR_PATTERNS = [
  /^hydration failed because/i,
  /^server rendered html didn't match/i,
  /^there was an error while hydrating/i,
  /^hydration error/i,
];

/**
 * Sets up error monitoring for specific components.
 * Captures console.error and page errors for Playwright tests.
 * @param page - Playwright page object
 * @param componentNames - Array of component names to monitor
 * @returns Array of captured error messages
 */
export function captureComponentErrors(page: Page, componentNames: string[]): string[] {
  const errors: string[] = [];
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  const extractMessage = (arg: any): string => {
    if (typeof arg === 'string') return arg;
    if (arg?.message) return arg.message;
    if (arg?.stack) return arg.stack;
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  };

  function isIgnoredError(text: string): boolean {
    return IGNORE_ERROR_PATTERNS.some(pattern => pattern.test(text));
  }

  function isRelevant(message: string): boolean {
    const lowerCaseMessage = message.toLowerCase();
    return lowerCaseComponentNames.some(n => lowerCaseMessage.includes(n));
  }

  function capture(message: string): void {
    if (!isIgnoredError(message) && isRelevant(message)) {
      errors.push(message);
    }
  }

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      capture(msg.text());
    }
  });

  // Capture page errors (uncaught exceptions)
  page.on('pageerror', error => {
    capture(extractMessage(error));
  });

  return errors;
}

/**
 * Asserts that no component errors were captured
 */
export function assertNoComponentErrors(errors: string[], componentNames: string[]): void {
  if (errors.length > 0) {
    const list = errors.map((e, i) => `  ${i + 1}. ${e}`).join('\n');
    throw new Error(`Found ${errors.length} error(s) for [${componentNames.join(', ')}]:\n${list}`);
  }
}
