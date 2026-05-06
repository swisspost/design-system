export const VARIANTS = ['listitem', 'menuitem'] as const;

export type Variant = (typeof VARIANTS)[number];
