import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import meta from './text.stories';
import './text.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: null,
};

type Story = StoryObj;

function getTextUtility(type: string) {
  switch (type) {
    case 'Family':
      return html`<p class="font-sans-serif">Font sans-serif</p>`;
    case 'Style':
      return html`
        ${['normal', 'italic'].map(
          (val: string) => html`<p class="fst-${val}">Font style ${val}</p>`,
        )}
      `;
    case 'Weight':
      return html`
        ${['normal', 'bold', 'black'].map(
          (val: string) => html`<p class="fw-${val}">Font weight ${val}</p>`,
        )}
      `;
    case 'Line height':
      return html`
        ${['1', 'sm', 'lg'].map(
          (val: string) => html`<p class="text-example-bordered lh-${val}">Line height ${val}</p>`,
        )}
      `;
    case 'Text align':
      return html`
        ${['start', 'end', 'center'].map(
          val => html`
            <div class="text-${val}">
              <p>Text align ${val}</p>
            </div>
          `,
        )}
      `;
    case 'Text decoration':
      return html`
        ${['none', 'underline', 'line-through'].map(
          val => html`<p class="text-decoration-${val}">Text decoration ${val}</p>`,
        )}
      `;
    case 'Text transform':
      return html`
        ${['lowercase', 'uppercase', 'capitalize'].map(
          val => html`<p class="text-${val}">Text transform ${val}</p>`,
        )}
      `;
    case 'White space':
      return html`
        ${['wrap', 'nowrap'].map(
          val =>
            html`
              <p class="text-example-bordered w-100 text-${val}">
                White space ${val} White space ${val} White space ${val} White space ${val}
              </p>
            `,
        )}
      `;
    case 'Word wrap break':
      return html`
        ${['break'].map(
          val =>
            html`
              <p class="text-example-bordered w-78 text-${val}">Averylongwordthatwillbreak</p>
            `,
        )}
      `;
  }
}

export const Text: Story = {
  render: () => {
    return schemes(
      () => html` <div class="text-example">
        <h1>Text utilities</h1>
        ${[
          'Family',
          'Style',
          'Weight',
          'Line height',
          'Text align',
          'Text decoration',
          'Text transform',
          'White space',
          'Word wrap break',
        ].map(
          val => html`
            <h2>${val}</h2>
            <div class="text-example-child gap-8 d-flex flex-column">${getTextUtility(val)}</div>
          `,
        )}
      </div>`,
    );
  },
};
