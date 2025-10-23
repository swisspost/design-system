import { Page } from '@playwright/test';

/**
 * Sets up error monitoring for specific components.
 * Captures console.error, uncaught errors, and unhandled rejections.
 * Filters out hydration errors.
 * @param page - Playwright page object
 * @param componentNames - Array of component names to monitor
 * @returns Array that will be populated with component-specific errors
 */
export function captureComponentErrors(page: Page, componentNames: string[]): string[] {
  const errors: string[] = [];
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  // Patterns to identify hydration errors that should be ignored
  const hydrationErrorPatterns = [
    'hydration failed because',
    'server rendered html didn\'t match',
  ];

  const isHydrationError = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return hydrationErrorPatterns.some(pattern => lowerText.includes(pattern));
  };

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      const lowerCaseText = text.toLowerCase();

      // Skip hydration errors
      if (isHydrationError(text)) {
        return;
      }
     
      // Only capture component-related errors
      if (lowerCaseComponentNames.some(n => lowerCaseText.includes(n))) {
        errors.push(text);
      }
    }
  });

  page.on('pageerror', (error) => {
    const message = error.message;
    const lowerCaseMessage = message.toLowerCase();

    // Skip hydration errors
    if (isHydrationError(message)) {
      return;
    }
    
    // Only capture component-related errors
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
