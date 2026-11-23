/**
 * Events exchanged between the shell and the preview over Storybook's channel,
 * on top of Storybook's own core events.
 */

/** Shell → preview: the selected styles changed. */
export const STYLES_CHANGED = 'swisspost-docs/styles-changed';

export interface StylesChangedPayload {
  theme: string;
  appearance: string;
}
