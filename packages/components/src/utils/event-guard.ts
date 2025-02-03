export function eventGuard<T = unknown>(
  event: CustomEvent<T>,
  callback: () => void,
  options: { targetLocalName?: string; delegatorSelector?: string } = {}
): void {
  const target = event.target as HTMLElement | null;

  if (target?.localName === options.targetLocalName) {
    if (!options.delegatorSelector || target.closest(options.delegatorSelector)) {
      callback();
    }
  }
}
