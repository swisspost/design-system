import { html, TemplateResult } from 'lit';

interface IOptions {
  filter?: (scheme: string) => boolean;
  additionalSchemes?: string[];
}

export const COLOR_SCHEMES = {
  none: 'preferred',
  light: 'light',
  dark: 'dark',
};

export function schemes(renderFn: (scheme: string) => TemplateResult, options: IOptions = {}) {
  const filter = options.filter || (() => true);
  const additionalSchemes = options.additionalSchemes ?? [];

  return html`${[...Object.values(COLOR_SCHEMES), ...additionalSchemes].filter(filter).map(
    scheme => html` <div data-color-scheme="${scheme}">
      <div class="p-16 palette palette-default">
        <p>Color Scheme: ${scheme}</p>
        ${renderFn(scheme)}
      </div>
    </div>`,
  )}`;
}
