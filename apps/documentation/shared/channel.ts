export const STYLES_CHANGED_EVENT = 'docs/styles-changed';

export interface StylesChangedPayload {
  theme: string;
  appearance: string;
}
