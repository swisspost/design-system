export const BANNER_TYPES = ['success', 'warning', 'error', 'info', 'grief'] as const;

export type BannerType = (typeof BANNER_TYPES)[number];
