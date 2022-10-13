export const PROP_TAG = {
  default: 'button',
  values: ['button', 'a', 'input']
};

export const PROP_TYPE = {
  default: 'button',
  values: ['button', 'submit', 'reset'],
  if: {
    type: ['button', 'input']
  }
};

export const PROP_HREF = {
  default: undefined,
  if: {
    type: ['a']
  }
};

export const PROP_TARGET = {
  default: undefined,
  values: [undefined, '_self', '_blank', '_parent', '_top'],
  if: {
    type: ['a']
  }
};

export const PROP_VARIANT = {
  default: undefined,
  values: [undefined, 'primary', 'secondary', 'tertiary', 'nightblue', 'nightblue-bright', 'petrol', 'petrol-bright', 'coral', 'coral-bright', 'olive', 'olive-bright', 'purple', 'purple-bright', 'aubergine', 'aubergine-bright', 'success', 'info', 'warning', 'danger', 'link']
};

export const PROP_SIZE = {
  default: undefined,
  values: [undefined, 'sm', 'rg', 'md', 'lg']
};

export const PROP_ACTIVE = {
  default: false
};

export const PROP_DISABLED = {
  default: false
};

export const PROP_ICON = {
  default: undefined
};

export const PROP_ICONEND = {
  default: false
};

export const PROP_ANIMATED = {
  default: false
};

export const PROP_BLOCK = {
  default: false
};
