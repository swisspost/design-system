export function hasSlottedAnchor(host: HTMLElement): boolean {
  return Array.from(host.children).some(child => child.tagName === 'A');
}
