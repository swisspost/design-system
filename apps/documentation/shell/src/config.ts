/**
 * Origin of the Storybook preview (`iframe.html`, `index.json`).
 * Empty in production, where the shell and the preview share one origin.
 * Set in `shell/.env.development` for the two-port dev setup.
 */
export const PREVIEW_ORIGIN: string = import.meta.env.VITE_PREVIEW_ORIGIN ?? '';

export const HOME_PAGE_ID = 'introduction--docs';
