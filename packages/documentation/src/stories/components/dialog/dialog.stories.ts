import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Args, Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html, nothing } from 'lit-html';

const meta: Meta = {
  id: '562eac2b-6dc1-4007-ba8e-4e981cef0cbc',
  title: 'Components/Dialog',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
    design: {
      type: 'figma',
    },
  },
  args: {
    variant: 'standard',
    notificationType: 'general',
    title: 'Dialog',
    content: 'This is a dialog',
    size: 'medium',
    closeButton: true,
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Choose which dialog variant to display',
      control: 'radio',
      options: ['standard', 'notification', 'cookie'],
      table: { category: 'Variant' },
    },
    notificationType: {
      name: 'Notification type',
      description: 'Choose the type of notification to display',
      control: 'select',
      options: ['general', 'error', 'warning', 'success', 'brand'],
      if: {
        arg: 'variant',
        eq: 'notification',
      },
      table: { category: 'Variant' },
    },
    title: {
      name: 'Title',
      description: 'Optional title',
      control: 'text',
      table: { category: 'Content' },
    },
    content: {
      name: 'Content',
      description: 'Dialog text',
      control: 'text',
      table: { category: 'Content' },
    },
    size: {
      name: 'Size',
      description: 'Max width of the dialog.',
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      table: { category: 'Variant' },
    },
    closeButton: {
      name: 'Close button',
      description: 'Show a close button to dismiss the dialog',
      control: 'boolean',
      table: { category: 'Content' },
    },
  },
  decorators: [
    (story: Function) =>
      html`<div>
        <button
          id="show-dialog-button"
          class="btn btn-secondary"
          onclick="this.nextElementSibling.showModal()"
        >
          Show dialog</button
        >${story()}
      </div>`,
  ],
};

export default meta;

const notificationTypeIconMap: { [key: string]: { icon: number; color: string } } = {
  general: { icon: 1034, color: 'bg-info' },
  error: { icon: 2104, color: 'bg-danger' },
  warning: { icon: 2106, color: 'bg-warning' },
  success: { icon: 2105, color: 'bg-success' },
  brand: { icon: 1034, color: 'bg-yellow' },
};

const getHeader = (text: string) => {
  return html`<h2>${text}</h2>`;
};

const getCloseButton = () => {
  return html`<button class="btn btn-close">
    <span class="visually-hidden">Close</span>
  </button>`;
};

const getControls = () => {
  return html`<button class="btn btn-primary">OK</button>
    <button class="btn btn-secondary">Cancel</button>`;
};

const Template = {
  render: (args: Args) => {
    let variant = nothing;
    let notificationType: symbol | string = nothing;
    let backgroundColor: string | symbol = nothing;

    let icon: symbol | TemplateResult = nothing;
    let header = getHeader(args.title);
    let body = html`${args.content}`;
    const controls = getControls();
    const closeButton = args.closeButton ? getCloseButton() : nothing;

    if (args.variant === 'notification') {
      variant = args.variant;
      const { icon: iconNr } = notificationTypeIconMap[args.notificationType];
      notificationType = args.notificationType as string;
      icon = html`<post-icon name="${iconNr}"></post-icon>`;
      header = getHeader(args.title);
    }
    if (args.variant === 'cookie') {
      backgroundColor = 'bg-light';
      icon = html`<post-icon name="2201"></post-icon>`;
      variant = args.variant;
    }
    return html`
      <dialog
        data-size="${args.size}"
        data-variant="${variant}"
        data-type="${notificationType}"
        class="${backgroundColor}"
      >
        <form method="dialog" class="dialog-grid">
          <post-dialog-icon>${icon}</post-dialog-icon>
          <post-dialog-header>${header}</post-dialog-header>
          <post-dialog-body>${body}</post-dialog-body>
          <post-dialog-controls>${controls}</post-dialog-controls>
          ${args.closeButton
            ? html`<post-dialog-close>${closeButton}</post-dialog-close>`
            : nothing}
        </form>
      </dialog>
    `;
  },
};

const FormTemplate = {
  ...Template,
  render: (args: Args) => {
    return html`
      <dialog size="${args.size}">
        <form
          id="example-dialog-form"
          method="dialog"
          class="dialog-grid"
          onsubmit="console.log(Object.fromEntries(new FormData(event.target)))"
        >
          <post-dialog-header><h3>Form example</h3></post-dialog-header>
          <post-dialog-body>
            <div class="form-floating mt-3">
              <input
                id="example-dialog-text-field"
                class="form-control form-control-lg"
                type="text"
                placeholder="Placeholder"
                name="example-text-field"
                required
              />
              <label class="form-label" for="example-dialog-text-field">Label</label>
              <div class="form-text">
                Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie
                consequat, vel illum dolore eu feugiat nulla facilisis.
              </div>
            </div>
          </post-dialog-body>

          <post-dialog-controls>
            <button class="btn btn-primary">Confirm</button>
            <button class="btn btn-secondary" formnovalidate>Cancel</button>
          </post-dialog-controls>
        </form>
      </dialog>
    `;
  },
};

const CustomContentTemplate = {
  ...Template,
  render: (args: Args) => {
    return html`
      <dialog>
        <form method="dialog" onsubmit="console.log(event)">
          <h2>Custom content</h2>
          <p>This is some other content, just placed inside the dialog.</p>
          <button class="btn btn-primary">Ok</button>
        </form>
      </dialog>
    `;
  },
};

const CookieTemplate = {
  ...Template,
  args: {
    variant: 'cookie',
    closeButton: false,
    size: 'large',
  },
};

type Story = StoryObj;

export const Default: Story = {
  ...Template,
};

export const Form: Story = {
  ...FormTemplate,
};

export const Cookie: Story = {
  ...CookieTemplate,
};

export const Custom: Story = {
  ...CustomContentTemplate,
};
