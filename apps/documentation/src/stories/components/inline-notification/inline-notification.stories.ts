import type { Args, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: MetaComponent = {
  id: 'bf4826ad-450e-4d8a-8b2d-796c31758349',
  title: 'Components/Inline Notification',
  tags: ['package:Styles', 'status:New'],
  render: renderInlineNotification,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=1447-8953&m=dev',
    },
  },
  args: {
    variant: 'info',
    title: 'Title',
    multiline: true,
    message: 'Message',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Defines the type variant of the notification.',
      control: {
        type: 'radio',
        labels: {
          info: 'Info',
          success: 'Success',
          error: 'Error',
          warning: 'Warning',
        },
      },
      options: ['info', 'success', 'warning', 'error'],
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
    multiline: {
      name: 'Multi-line',
      description:
        'Whether the notification is displayed on multiple lines or in a single line (if space allows).',
      if: {
        arg: 'position',
        neq: 'fixed',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

// RENDERER
function renderInlineNotification(args: Args) {
  const { variant, title, message } = args;
  const titleHTML = title ? `<div>${title}</div>` : '';
  const messageHTML = title ? `<div>${message}</div>` : message;
  const role = variant === 'warning' || variant === 'error' ? 'alert' : 'status';

  return html`
    <div
      class="inline-notification inline-notification-${variant}${!args.multiline
        ? ' inline-notification-singleline'
        : ''}"
      role="${role}"
    >
      ${unsafeHTML(titleHTML)} ${unsafeHTML(messageHTML)}
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
        title: 'Title',
        message: 'Message',
      }),
    )}`;
  },
};

export const SingleLine: Story = {
  decorators: [(story: StoryFn) => html`<div class="d-flex flex-column gap-16">${story()}</div>`],
  render: (args: Args) => {
    const variants = ['info', 'success', 'warning', 'error'];

    return html`${variants.map(variant =>
      renderInlineNotification({
        ...args,
        variant,
        multiline: false,
        title: 'Title',
        message: 'Message',
      }),
    )}`;
  },
};
