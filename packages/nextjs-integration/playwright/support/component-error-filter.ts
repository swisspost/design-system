import { Page } from '@playwright/test';

/**
 * Sets up error monitoring for specific components.
 * Captures console.error, uncaught errors, and unhandled rejections.
 * @param page - Playwright page object
 * @param componentNames - Array of component names to monitor
 * @returns Array that will be populated with component-specific errors
 */
export function captureComponentErrors(page: Page, componentNames: string[]): string[] {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (componentNames.some(name => text.toLowerCase().includes(name.toLowerCase()))) {
        errors.push(text);
      }
    }
  });

  page.on('pageerror', (error) => {
    const message = error.message;
    if (componentNames.some(name => message.toLowerCase().includes(name.toLowerCase()))) {
      errors.push(message);
    }
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
