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
  ].join(',')})`;
  
  export const isFocusable = (element: Element) => {
    return element?.matches(focusableSelector) && !element?.matches(focusDisablingSelector);
  };