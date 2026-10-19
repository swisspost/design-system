import type { Args, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html, nothing } from 'lit';
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
    headingLevel: 'p',
    type: 'persistent',
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
    headingLevel: {
      name: 'Heading Level',
      if: {
        arg: 'title',
        neq: '',
      },
      description:
        'The semantic tag used for the notification title. <post-banner data-size="sm"><p>A heading tag is needed for introducing a new subsection heading, or a paragraph <code>p</code> + <code>strong</code> tag to simply highlight the content.</p></post-banner>',
      control: {
        type: 'select',
        labels: {
          h1: 'Heading 1',
          h2: 'Heading 2',
          h3: 'Heading 3',
          h4: 'Heading 4',
          h5: 'Heading 5',
          h6: 'Heading 6',
          p: 'Paragraph',
        },
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      table: { category: 'Content' },
    },
    type: {
      name: 'Type',
      description: 'The type of the notification',
      control: {
        type: 'radio',
        labels: {
          persistent: 'Persistent (always visible on a page)',
          dynamic: 'Dynamic (result of an action)',
        },
      },
      options: ['persistent', 'dynamic'],
      table: { category: 'General' },
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
  const { variant, title, message, headingLevel } = args;

  let titleHTML = '';

  if (title) {
    if (headingLevel === 'p') {
      titleHTML = `<p><strong>${title}</strong></p>`;
    } else {
      titleHTML = `<${headingLevel}>${title}</${headingLevel}>`;
    }
  }

  const role = args.type === 'dynamic' ? 'status' : nothing;

  return html`
    <div
      class="inline-notification inline-notification-${variant}${!args.multiline
        ? ' inline-notification-singleline'
        : ''}"
      role="${role}"
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
