import { StoryContext } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

const COLOR_SCHEMES = ['light', 'dark'];

export function schemes(
  renderFn: () => TemplateResult<1>,
  filter: (scheme: string) => boolean = () => true,
) {
  return html`${COLOR_SCHEMES.filter(filter).map(
    scheme => html` <div data-color-scheme="${scheme}" class="p-16 palette-default">
      ${renderFn()}
    </div>`,
  )}`;
}
