export const SWITCH_MODES = ['link', 'event'] as const;

export type SwitchMode = (typeof SWITCH_MODES)[number];
