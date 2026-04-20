import { Args } from '@storybook/web-components-vite';
import { html } from 'lit';

export function renderTitle(args: Args) {
  const title =
    args.titleTag === 'p'
      ? html` <p slot="title">${args.title}</p> `
      : html` <h1 slot="title">${args.title}</h1> `;

  return html`
    <!-- Application title (optional) -->
    ${title}
  `;
}
