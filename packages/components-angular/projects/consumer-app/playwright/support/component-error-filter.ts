import { Page, ConsoleMessage } from '@playwright/test';

type CapturedError = {
  message: string;
  source: 'console' | 'pageerror';
  stack?: string;
  timestamp: number;
};

export function setupComponentErrorCapture(page: Page, componentNames: string[]) {
  const errors: string[] = [];
  const captured: CapturedError[] = [];
  const lowerCaseComponentNames = componentNames.map(n => n.toLowerCase());

  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  return { errors, captured, dispose } as const;

  function onConsole(msg: ConsoleMessage): void {
    try {
      if (msg.type() === 'error') {
        pushError(msg.text(), 'console');
      }
    } catch {
      // ignore handler errors
    }
  }

  function onPageError(error: Error): void {
    try {
      pushError(error.message, 'pageerror', error.stack);
    } catch {
      // ignore handler errors
    }
  }

  function pushError(message: string, source: CapturedError['source'], stack?: string): void {
    if (!isRelevant(message)) return;
    const entry: CapturedError = { message, source, stack, timestamp: Date.now() };
    captured.push(entry);
    errors.push(message);
  }

  function isRelevant(message: string): boolean {
    const lower = message.toLowerCase();
    return lowerCaseComponentNames.some(n => lower.includes(n));
  }

  function dispose(): void {
    try {
      page.off('console', onConsole);
      page.off('pageerror', onPageError);
    } catch {
      // best-effort teardown
    }
  }
}

export function assertNoComponentErrors(errors: string[], componentNames: string[]): void {
  if (errors.length === 0) return;
  const list = errors.map((m, i) => `${i + 1}. ${m}`).join('\n');
  throw new Error(`Found ${errors.length} error(s) for [${componentNames.join(', ')}]:\n${list}`);
}
