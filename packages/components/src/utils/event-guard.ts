export function eventGuard(
  event: CustomEvent,
  callback: () => void,
  options: { targetLocalName?: string; delegatorSelector?: string } = {}
): void {
  const target = event.target as HTMLElement | null;

  if (!target) return;

  if (target.localName === options.targetLocalName) {
    if (!options.delegatorSelector || target.closest(options.delegatorSelector)) {
      callback();
    }
  }
}
