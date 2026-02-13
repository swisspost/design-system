import { getRoot } from '@/utils/get-root';

const focusableSelector = `:where(${[
  'button',
  'input:not([type="hidden"])',
  '[tabindex]',
  'select',
  'textarea',
  '[contenteditable]',
  'a[href]',
  'iframe',
  'audio[controls]',
  'video[controls]',
  'area[href]',
  'details > summary:first-of-type',
].join(',')})`;

const focusDisablingSelector = `:where(${[
  '[inert]',
  '[inert] *',
  ':disabled',
  'dialog:not([open]) *',
  '[popover]:not(:popover-open) *',
  'details:not([open]) > *:not(details > summary:first-of-type)',
  'details:not([open]) > *:not(details > summary:first-of-type) *',
  '[tabindex^="-"]',
  '[hidden]:not([hidden="false"])',
].join(',')})`;

export function getFocusableChildren(element: Element | Document | ShadowRoot): HTMLElement[] {
  const focusableChildren = element.querySelectorAll<HTMLElement>(
    `${focusableSelector}:not(${focusDisablingSelector})`,
  );

  return Array.from(focusableChildren).filter(el => !isFocusBlockedByCSS(el));
}

// Searches deeper across shadow DOM
export function getDeepFocusableChildren(
  el: Element | DocumentFragment,
  filter?: (el: Element) => boolean,
  visited: Set<Node> = new Set(),
): HTMLElement[] {
  if (visited.has(el)) return [];
  visited.add(el);

  let nodes: Element[] = [];

  // SLOT
  if (el instanceof HTMLSlotElement) {
    const assigned = el.assignedElements({ flatten: true });
    nodes = assigned.length ? assigned : Array.from(el.children);
  }

  // SHADOW ROOT
  else if (el instanceof HTMLElement && el.shadowRoot) {
    nodes = Array.from(el.shadowRoot.children);
  }

  // NORMAL ELEMENT
  else if (el instanceof Element) {
    nodes = Array.from(el.children);
  }

  if (filter) {
    nodes = nodes.filter(filter);
  }

  const focusableElements: HTMLElement[] = [];

  for (const node of nodes) {
    if (isElementFocusable(node)) {
      focusableElements.push(node);
      continue;
    }

    focusableElements.push(...getDeepFocusableChildren(node, filter, visited));
  }

  return focusableElements;
}

function isFocusBlockedByCSS(el: Element | Document | ShadowRoot): boolean {
  if (el instanceof Document) {
    return false;
  }

  if (el instanceof ShadowRoot) {
    return isFocusBlockedByCSS(el.host);
  }

  if (typeof el.checkVisibility === 'function') {
    return !el.checkVisibility({ visibilityProperty: true });
  }

  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility !== 'visible') {
    return true;
  }

  if (el.parentElement) {
    return isFocusBlockedByCSS(el.parentElement);
  }

  const root = getRoot(el);
  return isFocusBlockedByCSS(root);
}

function isElementFocusable(node: Element | ShadowRoot): node is HTMLElement {
  return (
    node instanceof HTMLElement &&
    node.matches(`${focusableSelector}:not(${focusDisablingSelector})`) &&
    !isFocusBlockedByCSS(node)
  );
}
