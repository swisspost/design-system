export const PICTURE_SIZES = ['small', 'large'] as const;

export type PictureSize = (typeof PICTURE_SIZES)[number];
