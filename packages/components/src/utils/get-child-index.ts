export function getChildIndex(el: HTMLElement, siblingsFilter?: string): number {
  if (!el.parentElement) {
    return -1;
  }

  let siblings = Array.from(el.parentElement.children);
  if (siblingsFilter) {
    siblings = siblings.filter(el => el.matches(siblingsFilter));
  }

  return siblings.indexOf(el);
}
