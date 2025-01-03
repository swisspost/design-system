export const SWITCH_VARIANTS = ['list', 'menu'] as const;

export type SwitchVariant = (typeof SWITCH_VARIANTS)[number];
