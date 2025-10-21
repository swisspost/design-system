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
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      const lowerCaseText = text.toLowerCase();
     
      if (lowerCaseComponentNames.some(n => lowerCaseText.includes(n))) {
        errors.push(text);
      }
    }
  });

  page.on('pageerror', (error) => {
    const message = error.message;
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseComponentNames.some(n => lowerCaseMessage.includes(n))) {
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
