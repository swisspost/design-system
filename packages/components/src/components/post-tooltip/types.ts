export const BACKGROUND_COLOR = ['primary', 'yellow'] as const;

export type BackgroundColor = (typeof BACKGROUND_COLOR)[number];
