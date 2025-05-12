export const BANNER_TYPES = ['neutral', 'success', 'warning', 'danger', 'info'] as const;

export type BannerType = (typeof BANNER_TYPES)[number];
