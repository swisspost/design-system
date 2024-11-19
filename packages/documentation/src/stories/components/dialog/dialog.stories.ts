import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';

const meta: Meta = {
  id: '562eac2b-6dc1-4007-ba8e-4e981cef0cbc',
  title: 'Components/Dialog',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?node-id=20215-22938&m=dev',
    },
  },
  args: {
    title: 'Dialog',
    content: 'This is a dialog',
    size: 'medium',
    position: 'center',
    icon: 'none',
    backgroundColor: 'bg-white',
    animation: 'pop-in',
    closeButton: true,
    open: false,
  },
  argTypes: {
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
        type: 'radio',
      },
      options: ['small', 'medium', 'large'],
      table: { category: 'Variant' },
    },
    position: {
      name: 'Position',
      description: 'Position of the dialog on the screen',
      control: {
        type: 'radio',
      },
      options: ['top', 'center', 'bottom'],
      table: { category: 'Variant' },
    },
    animation: {
      name: 'Animation',
      description: 'Choose an animation effect for showing and hidding the dialog.',
      control: 'radio',
      options: ['pop-in', 'slide-in', 'none'],
      table: { category: 'Variant' },
    },
    icon: {
      name: 'Icon',
      description: 'Display an icon in the dialog.',
      control: {
        type: 'select',
        labels: {
          none: 'None',
          1034: '1034 (Info)',
          2104: '2104 (Danger)',
          2106: '2106 (Warning)',
          2105: '2105 (Success)',
        },
      },
      options: ['none', '1034', '2105', '2104', '2106'],
      table: { category: 'Content' },
    },
    backgroundColor: {
      name: 'Background color',
      description: 'The background color of the dialog field',
      control: {
        type: 'select',
      },
      options: ['bg-white', 'bg-light', 'bg-primary'],
      table: { category: 'Variant' },
    },
    closeButton: {
      name: 'Close button',
      description: 'Show a close button to dismiss the dialog',
      control: 'boolean',
      table: { category: 'Content' },
    },
    open: {
      name: 'Default open',
      description: 'Test property for snapshots',
      control: 'boolean',
      table: { disable: true },
    },
  },
  decorators: [
    story =>
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
    const header = getHeader(args.title);
    const body = html`${args.content}`;
    const controls = getControls();
    const postDialogIcon =
      args.icon && args.icon !== 'none'
        ? html`<post-icon name="${args.icon}"></post-icon>`
        : nothing;
    const postDialogCloseButton = args.closeButton ? getCloseButton() : nothing;

    // Don't declare default values or show empty containers
    if (args.backgroundColor === 'bg-white') args.backgroundColor = nothing;
    if (args.animation === 'pop-in') args.animation = nothing;
    if (args.position === 'center') args.position = nothing;
    if (args.size === 'medium') args.size = nothing;

    return html`
      <dialog
        class="${args.backgroundColor}"
        data-size="${args.size}"
        data-position="${args.position}"
        data-animation="${args.animation}"
        open="${args.open || nothing}"
      >
        <form method="dialog" class="dialog-grid">
          ${postDialogIcon}
          <h3 class="dialog-header">${header}</h3>
          <div class="dialog-body">${body}</div>
          <div class="dialog-controls">${controls}</div>
          ${postDialogCloseButton}
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
          <h3 class="dialog-header">Form example</h3>
          <div class="dialog-body">
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
              <p class="form-hint" id="example-form-hint">
                Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie
                consequat, vel illum dolore eu feugiat nulla facilisis.
              </p>
            </div>
          </div>

          <div class="dialog-controls">
            <button class="btn btn-primary">Confirm</button>
            <button class="btn btn-secondary" formnovalidate>Cancel</button>
          </div>
        </form>
      </dialog>
    `;
  },
};

const CustomContentTemplate = {
  ...Template,
  render: () => {
    return html`
      <dialog>
        <form method="dialog" onsubmit="console.log(event)" class="p-regular-r">
          <h2>Custom content</h2>
          <p>This is some other content, just placed inside the dialog.</p>
          <button class="btn btn-primary">Ok</button>
        </form>
      </dialog>
    `;
  },
};

type Story = StoryObj;

export const Default: Story = {
  ...Template,
};

export const Form: Story = {
  ...FormTemplate,
};

export const Custom: Story = {
  ...CustomContentTemplate,
};
