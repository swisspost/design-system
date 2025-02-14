export const SWITCH_VARIANTS = ['list', 'menu'] as const;
export const SWITCH_TYPES = ['language', 'region'] as const;

export type SwitchVariant = (typeof SWITCH_VARIANTS)[number];

export type SwitchType = 'language' | 'region';
