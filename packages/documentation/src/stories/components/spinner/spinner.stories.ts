import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd0e645d0-3bf2-4b00-967a-5a1343107f60',
  title: 'Components/Spinner',
  tags: ['package:HTML'],
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
          'loader-12': '12',
          'loader-16': '16',
          'loader-24': '24',
          'loader-32': '32',
          'loader-40': '40',
          'loader-48': '48',
          'null': 'Default (56)',
          'loader-80': '80',
        },
      },
      options: [
        'loader-12',
        'loader-16',
        'loader-24',
        'loader-32',
        'loader-40',
        'loader-48',
        'null',
        'loader-80',
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
  const classes = ['loader', 'm-auto', args.size].filter(c => c && c !== 'null').join(' ');

  return html` <div class="spinner-bg">
    <div class="loading-modal">
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
        <div class="loading-modal">
          <div class="loader m-auto" role="status" aria-live="polite">
            <span class="visually-hidden">Loading…</span>
          </div>
        </div>
      </div>
      <p>
        There is some continous text here as an example. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, <a href="#">sed diam nonumy eirmod tempor invidunt</a> ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum.
      </p>
    </div>`,
};

export const Inline: Story = {
  render: () => html`<button class="btn btn-secondary">
      <div
        class="loader loader-16 d-inline-block me-4"
        role="status"
        aria-live="polite"
        aria-hidden="true"
      ></div>
      <span>Data is loading…</span>
    </button>
    <button class="btn btn-secondary ms-16" disabled="disabled">
      <div
        class="loader loader-16 d-inline-block me-4"
        role="status"
        aria-live="polite"
        aria-hidden="true"
      ></div>
      <span>Data is loading…</span>
    </button>`,
};
