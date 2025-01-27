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

export const getFocusableChildren = (element: Element): NodeListOf<HTMLElement> => {
  const children = element.querySelectorAll(
    `& > ${focusableSelector}:not(${focusDisablingSelector})`,
  );
  const fragment = document.createDocumentFragment();
  children.forEach(child => {
    if (window.getComputedStyle(child).display == 'none') {
      fragment.appendChild(child);
    }
  });
  return fragment.childNodes as NodeListOf<HTMLElement>;
};
