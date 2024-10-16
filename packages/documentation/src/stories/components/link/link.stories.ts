import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '6f359d06-bca5-4983-b588-c8c790531642',
  title: 'Foundations/Typography/Link',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2016-47948',
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
    return html` <a href="${args.href}">${args.text}</a> `;
  },
};
