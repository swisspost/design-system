import { MetaComponent } from '@root/types';
import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import { nothing } from 'lit';

const meta: MetaComponent = {
  id: 'a1eef11e-b5db-4066-99a8-9723a6cdef12',
  title: 'Components/Divider',
  tags: ['package:Styles', 'status:Experimental'],
  render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=13943-50752&p=f&t=EDT8yApWFC3hDXlb-0',
    },
  },
  args: {
    marginTop: 'null',
    marginBottom: 'null',
  },
  argTypes: {
    marginTop: {
      name: 'Margin top',
      description: 'Sets the margin between the divider line and the content above.',
      control: {
        type: 'select',
        labels: {
          'mt-4': '4',
          'null': '8 (default)',
          'mt-16': '16',
          'mt-24': '24',
          'mt-32': '32',
          'mt-40': '40',
        },
      },
      options: ['mt-4', 'null', 'mt-16', 'mt-24', 'mt-32', 'mt-40'],
      table: {
        category: 'General',
      },
    },
    marginBottom: {
      name: 'Margin bottom',
      description: 'Sets the margin between the divider line and the content below.',
      control: {
        type: 'select',
        labels: {
          'mb-4': '4',
          'null': '8 (default)',
          'mb-16': '16',
          'mb-24': '24',
          'mb-32': '32',
          'mb-40': '40',
        },
      },
      options: ['mb-4', 'null', 'mb-16', 'mb-24', 'mb-32', 'mb-40'],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

//
// RENDERER
//
function render(args: Args) {
  const classes = [
    args.marginTop !== 'null' ? args.marginTop : '',
    args.marginBottom !== 'null' ? args.marginBottom : '',
  ]
    .filter(Boolean)
    .join(' ');

  return html`
    <p>This is some content above the divider.</p>

    <hr class="${classes || nothing}" />

    <p>This is some content below the divider.</p>
  `;
}
export const Default: Story = {};
