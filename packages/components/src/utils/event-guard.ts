export function eventGuard(
  event: CustomEvent,
  targetLocalName: string,
  callback: () => void,
  delegatorSelector?: string
): void {
  const target = event.target as HTMLElement | null;

  if (target?.localName === targetLocalName) {
    if (!delegatorSelector || target.closest(delegatorSelector)) {
      callback();
    }
  }
}
