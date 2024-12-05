export const SWITCH_VARIANTS = ['list', 'dropdown'] as const;

export type SwitchVariant = (typeof SWITCH_VARIANTS)[number];
