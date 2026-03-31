import type { Args, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../../../styles/src/components/inline-notification.scss';

const meta: MetaComponent = {
  id: 'bf4826ad-450e-4d8a-8b2d-796c31758349',
  title: 'Components/Inline Notification',
  tags: ['package:Styles', 'status:InProgress'],
  render: renderInlineNotification,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18807-68180&mode=design&t=PR2ZnqAacaK7UiXP-4',
    },
  },
  args: {
    variant: 'info',
    layout: 'single-line',
    title: 'Title',
    message: 'Message',
    headingLevel: 'h4',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Defines the color variant of the notification.',
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      table: {
        category: 'General',
      },
    },
    layout: {
      name: 'Layout',
      description: 'Defines the layout of the notification.',
      control: 'select',
      options: ['single-line', 'multi-line'],
      table: {
        category: 'General',
      },
    },
    title: {
      name: 'Title',
      description: 'Optional title for the notification.',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    message: {
      name: 'Message',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    headingLevel: {
      name: 'Heading Level',
      description: 'The heading tag used for the notification title.',
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: { category: 'Content' },
    },
  },
};

export default meta;

// RENDERER
function renderInlineNotification(args: Args) {
  const { variant, layout, title, message, headingLevel = 'h4' } = args;

  const layoutClass = layout === 'multi-line' ? 'inline-notification-multi-line' : '';
  const titleHTML = title ? `<${headingLevel}>${title}</${headingLevel}>` : '';

  return html`
    <div
      class="inline-notification inline-notification-${variant} ${layoutClass}"
      role="alert"
      aria-label="${title || message}"
    >
      ${unsafeHTML(titleHTML)}
      <p>${message}</p>
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  decorators: [(story: StoryFn) => html`<div class="d-flex flex-column gap-16">${story()}</div>`],
  render: (args: Args) => {
    const variants = ['info', 'success', 'warning', 'error'];

    return html`${variants.map(variant =>
      renderInlineNotification({
        ...args,
        variant,
        layout: 'single-line',
        title: 'Title',
        message: 'Message',
      }),
    )}`;
  },
};

export const MultiLine: Story = {
  decorators: [(story: StoryFn) => html`<div class="d-flex flex-column gap-16">${story()}</div>`],
  render: (args: Args) => {
    const variants = ['info', 'success', 'warning', 'error'];

    return html`${variants.map(variant =>
      renderInlineNotification({
        ...args,
        variant,
        layout: 'multi-line',
        title: 'Title',
        message: 'Message',
      }),
    )}`;
  },
};
