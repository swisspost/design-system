import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'f321d60b-cf7e-4a64-90af-7b90e6869ee6',
  title: 'Raw Components/Target group',
  tags: ['package:Styles', 'status:Experimental'],
  decorators: [clickBlocker],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=7402-44016&m=dev',
    },
  },
  args: {
    active: 0,
    label_1: 'Private customers',
    label_2: 'Business customers',
    label_3: 'Authorities',
  },
  argTypes: {
    active: {
      name: 'Active',
      description: 'Active element of the list',
      control: {
        type: 'inline-radio',
        labels: { 0: 'First', 1: 'Second', 2: 'Third' },
      },
      options: [0, 1, 2],
      table: { category: 'General' },
    },
    label_1: {
      name: 'First Label',
      description: 'Defines the label of the first link.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    label_2: {
      name: 'Second Label',
      description: 'Defines the label of the second link.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    label_3: {
      name: 'Third Label',
      description: 'Defines the label of the third link.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function clickBlocker(story: StoryFn, context: StoryContext) {
  return html`
    <div @click=${(e: Event) => e.preventDefault()}>${story(context.args, context)}</div>
  `;
}

export const Default: Story = {
  render: (args: Args) => {
    return html`
      <ul>
        ${[args.label_1, args.label_2, args.label_3].map(
          (arg, i) => html`
            <li>
              <a href="#" class="${i === args.active ? 'active' : ''}">${arg}</a>
            </li>
          `,
        )}
      </ul>
    `;
  },
};
