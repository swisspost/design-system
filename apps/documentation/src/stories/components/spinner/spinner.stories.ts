import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd0e645d0-3bf2-4b00-967a-5a1343107f60',
  title: 'Components/Spinner',
  tags: ['package:Styles'],
  render,
  decorators: [(story, context) => generateDecorators(story, context)],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=16705-3536&mode=design&t=38qLaYwWdirTcHdb-4',
    },
  },
  args: {
    size: 'null',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: "Sets the size of the component's appearance.",
      control: {
        type: 'select',
        labels: {
          'spinner-12': '12',
          'spinner-16': '16',
          'spinner-24': '24',
          'spinner-32': '32',
          'spinner-40': '40',
          'spinner-48': '48',
          'null': 'Default (56)',
          'spinner-80': '80',
        },
      },
      options: [
        'spinner-12',
        'spinner-16',
        'spinner-24',
        'spinner-32',
        'spinner-40',
        'spinner-48',
        'null',
        'spinner-80',
      ],
    },
  },
};

export default meta;

type Story = StoryObj;

function generateDecorators(story: StoryFn, context: StoryContext) {
  return html` <div class="m-48 overflow-hidden">${story(context.args, context)}</div> `;
}

function render(args: Args) {
  const classes = ['spinner', 'm-auto', args.size].filter(c => c && c !== 'null').join(' ');

  return html` <div class="spinner-bg">
    <div class="spinner-modal">
      <div class="${classes}" role="status" aria-live="polite">
        <span class="visually-hidden">Loading…</span>
      </div>
    </div>
  </div>`;
}

export const Default: Story = {};

export const BlockSection: Story = {
  render: () =>
    html`<div class="position-relative">
      <div class="spinner-bg">
        <div class="spinner-modal">
          <div class="spinner m-auto" role="status" aria-live="polite">
            <span class="visually-hidden">Loading…</span>
          </div>
        </div>
      </div>
      <p>
        There is some continuous text here as an example. This text demonstrates how content flows
        within this component. The words continue to fill the available space to show text wrapping
        and spacing behavior. This sample text helps designers and developers visualize how actual
        content will appear when the component is implemented.
      </p>
    </div>`,
};

export const Inline: Story = {
  render: () =>
    html`<button class="btn btn-secondary">
        <div
          class="spinner spinner-16 d-inline-block me-4"
          role="status"
          aria-live="polite"
          aria-hidden="true"
        ></div>
        <span>Data is loading…</span>
      </button>
      <button class="btn btn-secondary ms-16" disabled="disabled">
        <div
          class="spinner spinner-16 d-inline-block me-4"
          role="status"
          aria-live="polite"
          aria-hidden="true"
        ></div>
        <span>Data is loading…</span>
      </button>`,
};
