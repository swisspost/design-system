export const BUTTON_TYPES = ['button', 'submit', 'reset'] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

export const PLACEMENT = ['outside', 'inside'] as const;
export type Placement = (typeof PLACEMENT)[number];

export const SIZE = ['small'] as const;
export type Size = (typeof SIZE)[number];
