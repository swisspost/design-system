import { html, TemplateResult } from 'lit';

interface IOptions {
  filter?: (scheme: string) => boolean;
  additionalSchemes?: string[];
}

export const COLOR_SCHEMES = {
  light: 'light',
  dark: 'dark',
};

export function schemes(renderFn: (scheme: string) => TemplateResult, options: IOptions = {}) {
  const filter = options.filter || (() => true);
  const additionalSchemes = options.additionalSchemes ?? [];
  const schemes = [...Object.values(COLOR_SCHEMES), ...additionalSchemes].filter(filter);

  return html`
    ${schemes.map(
      scheme => html`
        <div data-color-scheme="${scheme}">
          <div class="palette palette-default">
            <p>Color Scheme: ${scheme}</p>
            ${renderFn(scheme)}
          </div>
        </div>
      `,
    )}
  `;
}
