import { html, TemplateResult } from 'lit';

interface IOptions {
  filter?: (scheme: string) => boolean;
  additionalSchemes?: string[];
}

export const COLOR_SCHEMES = {
  light: 'light',
  // dark: 'dark',
};

export function schemes(renderFn: (scheme: string) => TemplateResult, options: IOptions = {}) {
  const filter = options.filter || (() => true);
  const additionalSchemes = options.additionalSchemes ?? [];

  return html`${[...additionalSchemes, ...Object.values(COLOR_SCHEMES)]
    .filter(filter)
    .map(
      scheme => html` <div data-color-scheme="${scheme}" class="p-16 palette-default">
        ${renderFn(scheme)}
      </div>`,
    )}`;
}
