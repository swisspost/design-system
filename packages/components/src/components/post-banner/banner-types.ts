export const BANNER_TYPES = ['success', 'warning', 'error', 'info'] as const;

export type BannerType = (typeof BANNER_TYPES)[number];
