import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'bc68b346-2fdd-436e-bddf-309d24df06a1',
  title: 'Components/Search input',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2729-31193&node-type=&t=x6LVsieKr1lfAhpN-0',
    },
  },
  args: {
    text: 'Link Text',
    href: 'https://imgur.com/FKmX7dt',
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'Defines the text within the link.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    href: {
      name: 'Href',
      description: 'Defines the target URL for the link.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    return html` 
    <div class="search">
      <form action="#">
        <input type="text" placeholder="Search Courses" name="search">
        <button>
          <i class="fa fa-search"></i>
        </button>
      </form>
    </div> `;
  },
};