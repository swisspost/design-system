import { html } from 'lit-html';

export function fakeContent(paragraphs = 6) {
  return html`<div class="container">${fakeParagraphs(paragraphs)}</div>`;
}

export function fakeParagraphs(paragraphs = 6) {
  return Array.from({ length: paragraphs }).map(
    () => html`<p aria-hidden="true" class="fake-content"></p>`,
  );
}
