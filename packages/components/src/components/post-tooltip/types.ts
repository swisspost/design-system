export const TOOLTIP_BACKGROUND_COLOR = ['primary', 'yellow'] as const;

export type TooltipBackgroundColor = (typeof TOOLTIP_BACKGROUND_COLOR)[number];
