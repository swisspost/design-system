import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, unsafeStatic } from 'lit/static-html.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Heading',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    title: 'Heading',
    level: 'h1',
    showSubtitle: false,
    subtitle: 'Subheading',
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Defines the text within the Heading.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    level: {
      name: 'Heading Level',
      description: 'Defines the level of the Heading (e.g. `<h1>`, `<h2>`, ...).',
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        category: 'General',
      },
    },
    showSubtitle: {
      name: 'Show Subheading',
      description: 'When set to `true`, component renders a subheading.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    subtitle: {
      name: 'Subtitle',
      description: 'Defines the text within the Subheading.',
      if: {
        arg: 'showSubtitle',
      },
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
    const tagName = unsafeStatic(args.level);
    const content = args.showSubtitle
      ? html`
          <span>${args.title}</span>
          <br />
          <span class="fw-light">${args.subtitle}</span>
        `
      : args.title;

    return html`
      <${tagName}>${content}</${tagName}>
    `;
  },
};
