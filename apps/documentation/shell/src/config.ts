/**
 * Origin of the Storybook preview (`iframe.html`, `index.json`).
 * Empty in production, where the shell and the preview share one origin.
 * Set in `shell/.env.development` for the two-port dev setup.
 */
export const PREVIEW_ORIGIN: string = import.meta.env.VITE_PREVIEW_ORIGIN ?? '';

/**
 * Dev mode (devOnly pages are listed) is on by default on the dev server and off in builds.
 */
export const DEV_MODE_DEFAULT: boolean = import.meta.env.DEV;
