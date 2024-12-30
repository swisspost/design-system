import { html } from 'lit-html';

export function fakeContent(paragraphs = 6) {
  return html`<div class="container">
    ${Array.from({ length: paragraphs }).map(() => html`<p class="fake-content"></p>`)}
  </div>`;
}
