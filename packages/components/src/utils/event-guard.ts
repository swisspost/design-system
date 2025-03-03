export function eventGuard(
  host: HTMLElement,
  event: CustomEvent,
  options: { targetLocalName: string; delegatorSelector?: string },
  callback: () => void
): void {
  const target = event.target as HTMLElement | null;

  if (!target) return;

  if (target.localName === options.targetLocalName) {
    if (!options.delegatorSelector || host === target.closest(options.delegatorSelector)) {
      callback();
    }
  }
}
