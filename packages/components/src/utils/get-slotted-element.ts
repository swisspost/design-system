export function getSlottedElement<T extends Element>(
  host: HTMLElement,
  selector: string,
): T | null {
  const slottedElements = host.querySelectorAll<T>(selector);
  if (slottedElements.length === 1) {
    return slottedElements[0];
  }

  console.error(
    `<${host.localName}> expects exactly one element matching "${selector}", but found ${slottedElements.length}.`,
    host,
  );

  return null;
}
