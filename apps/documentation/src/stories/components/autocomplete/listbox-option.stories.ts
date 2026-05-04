import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '1c899726-e136-4e68-a65e-727f780bd903',
  title: 'Components/Listbox Option',
  component: 'post-listbox-option',
  tags: ['package:WebComponents'],
  parameters: {
    badges: [],
    design: {},
  },
  args: {
    value: 'Switzerland',
    label: 'Switzerland',
    selected: false,
    highlighted: false,
  },
  argTypes: {
    label: {
      description: 'Text content rendered inside the option slot.',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    highlighted: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  render,
};

export default meta;

function render(args: Args) {
  const listboxId = 'listbox-option-preview';

  return html`
    <div style="width: 280px;">
      <post-listbox id="${listboxId}">
        <post-listbox-option
          value="${args.value}"
          ?selected=${args.selected}
          ?highlighted=${args.highlighted}
        >
          ${args.label}
        </post-listbox-option>
      </post-listbox>
    </div>
    <script>
      requestAnimationFrame(() => document.getElementById('${listboxId}')?.show());
    </script>
  `;
}

type Story = StoryObj;

export const Default: Story = {};
