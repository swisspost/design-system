import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { useArgs } from 'storybook/preview-api';

const meta: MetaComponent = {
  id: '825b65c9-7eaf-4e0a-9e20-5f5ed406876d',
  title: 'Components/Toast Container',
  tags: ['package:Styles'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-V2?node-id=33070-74229',
    },
  },
  args: {
    alignV: 'top',
    alignH: 'right',
    alignVRestricted: 'top',
    alignHRestricted: 'right',
  },
  argTypes: {
    alignV: {
      name: 'Vertical',
      description: "Defines the container's vertical position.",
      if: {
        arg: 'alignH',
        neq: 'full-width',
      },
      control: {
        type: 'radio',
        labels: {
          top: 'Top',
          center: 'Center',
          bottom: 'Bottom',
        },
      },
      options: ['top', 'center', 'bottom'],
      table: {
        category: 'Positioning',
      },
    },
    alignVRestricted: {
      name: 'Vertical',
      description: "Defines the container's vertical position.",
      if: {
        arg: 'alignH',
        eq: 'full-width',
      },
      control: {
        type: 'radio',
        labels: {
          top: 'Top',
          bottom: 'Bottom',
        },
      },
      options: ['top', 'bottom'],
      table: {
        category: 'Positioning',
      },
    },
    alignH: {
      name: 'Horizontal',
      description: "Defines the container's horizontal position.",
      if: {
        arg: 'alignV',
        neq: 'center',
      },
      control: {
        type: 'radio',
        labels: {
          'left': 'Left',
          'center': 'Center',
          'right': 'Right',
          'full-width': 'Full Width',
        },
      },
      options: ['left', 'center', 'right', 'full-width'],
      table: {
        category: 'Positioning',
      },
    },
    alignHRestricted: {
      name: 'Horizontal',
      description: "Defines the container's horizontal position.",
      if: {
        arg: 'alignV',
        eq: 'center',
      },
      control: {
        type: 'radio',
        labels: {
          left: 'Left',
          center: 'Center',
          right: 'Right',
        },
      },
      options: ['left', 'center', 'right'],
      table: {
        category: 'Positioning',
      },
    },
  },
  render: renderToastContainer,
  decorators: [
    story => {
      return html`
        <div class="toast-container-wrapper-stacked">
          ${story()}
          <style>
            .toast-container-wrapper-stacked {
              position: relative;
              min-height: 350px;
            }

            .toast-container-wrapper-stacked .toast-container {
              position: absolute;
            }
          </style>
        </div>
      `;
    },
  ],
};

export default meta;

type Story = StoryObj;

function renderToastContainer(args: Args) {
  const [_, updateArgs] = useArgs();

  updateAlignments(args, updateArgs);

  const alignV = args.alignVRestricted ?? args.alignV;
  const alignH = args.alignHRestricted ?? args.alignH;

  return html`
    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      class="toast-container toast-${alignV}-${alignH}"
    >
      <div class="toast toast-warning">
        <post-closebutton>Close</post-closebutton>
        <div class="toast-title">Title</div>
        <div class="toast-message">Message</div>
      </div>
      <div class="toast toast-error">
        <post-closebutton>Close</post-closebutton>
        <div class="toast-title">Title</div>
        <div class="toast-message">Message</div>
      </div>
    </div>
  `;
}

function updateAlignments(args: Args, updateArgs: (newArgs: Partial<Args>) => void) {
  if (args.alignH && args.alignHRestricted && args.alignH !== args.alignHRestricted) {
    if (args.alignV === 'center') {
      updateArgs({ alignH: args.alignHRestricted });
    } else {
      updateArgs({ alignHRestricted: args.alignH });
    }
  }

  if (args.alignV && args.alignVRestricted && args.alignV !== args.alignVRestricted) {
    if (args.alignH === 'full-width') {
      updateArgs({ alignV: args.alignVRestricted });
    } else {
      updateArgs({ alignVRestricted: args.alignV });
    }
  }
}

export const Default: Story = {};
