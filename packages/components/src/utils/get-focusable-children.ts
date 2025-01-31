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
].join(',')})`;

export function getFocusableChildren(element: Element): NodeListOf<HTMLElement> {
  const focusableChildren = element.querySelectorAll(
    `${focusableSelector}:not(${focusDisablingSelector})`,
  );

  const visibleFocusableChildren = Array.from(focusableChildren).filter(child => {
    const style = window.getComputedStyle(child.parentElement);
    return style.display !== 'none';
  });

  return visibleFocusableChildren as unknown as NodeListOf<HTMLElement>;
}
