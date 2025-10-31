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

export function getFocusableChildren(element: Element): HTMLElement[] {
  const focusableChildren = element.querySelectorAll<HTMLElement>(
    `${focusableSelector}:not(${focusDisablingSelector})`,
  );

  return Array.from(focusableChildren).filter(isVisible);
}

// Searches deeper accross shadowDom
export function getDeepFocusableChildren(element: Element): HTMLElement[] {
  const results: HTMLElement[] = [];

  function traverse(node: Element | ShadowRoot) {
    if (isElementFocusable(node)) {
      results.push(node as HTMLElement);
    }

    if (node instanceof HTMLElement && node.shadowRoot) {
      traverse(node.shadowRoot);
    }

    for (const child of Array.from(node.children)) {
      traverse(child);
    }

    if (node instanceof HTMLElement) {
      for (const slot of Array.from(node.querySelectorAll('slot'))) {
        for (const el of slot.assignedElements({ flatten: true })) {
          traverse(el);
        }
      }
    }
  }

  traverse(element);
  return results;
}

function isVisible(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el.parentElement);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

function isElementFocusable(node: Element | ShadowRoot): boolean {
  return (
    node instanceof HTMLElement &&
    node.matches(`${focusableSelector}:not(${focusDisablingSelector})`) &&
    isVisible(node)
  );
}
