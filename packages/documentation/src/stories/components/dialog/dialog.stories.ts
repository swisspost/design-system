import { Args, Meta, StoryObj } from '@storybook/web-components-vite';
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
    palette: 'palette-default',
    animation: 'pop-in',
    closeButton: true,
    open: false,
    closedby: 'closerequest',
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Optional title',
      control: 'text',
      table: { category: 'content' },
    },
    content: {
      name: 'Content',
      description: 'Dialog text',
      control: 'text',
      table: { category: 'content' },
    },
    icon: {
      name: 'Icon',
      description: 'Display an icon in the dialog.',
      control: {
        type: 'select',
        labels: { none: 'None', info: 'Info', error: 'Error', warning: 'Warning', success: 'Success' },
      },
      options: ['none', 'info', 'success', 'error', 'warning'],
      table: { category: 'content' },
    },
    closeButton: {
      name: 'Close button',
      description: 'Show a close button to dismiss the dialog',
      control: 'boolean',
      table: { category: 'content' },
    },
    size: {
      name: 'Size',
      description: 'Max width of the dialog.',
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      table: { category: 'variant' },
    },
    position: {
      name: 'Position',
      description: 'Position on screen',
      control: { type: 'radio' },
      options: ['top', 'center', 'bottom'],
      table: { category: 'variant' },
    },
    animation: {
      name: 'Animation',
      description: 'Show/hide effect',
      control: 'radio',
      options: ['pop-in', 'slide-in', 'none'],
      table: { category: 'variant' },
    },
    palette: {
      name: 'Palette',
      description: 'Color scheme',
      control: { type: 'select' },
      options: ['palette-default', 'palette-accent', 'palette-alternate', 'palette-brand'],
      table: { category: 'variant' },
    },
    closedby: {
      name: 'closedby',
      description:
        'Specifies the types of user actions that can be used to close the dialog.\n\nSee [MDN: `<dialog>` — closedby](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby)',
      control: { type: 'radio' },
      options: ['any', 'closerequest', 'none'],
      table: { category: 'props' },
    },
    show: {
      name: 'show()',
      description:
        'Open the the dialog non-modally; page stays interactive\n\nSee [MDN: HTMLDialogElement.show()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show)',
      control: { disable: true },
      table: { category: 'methods', type: { summary: 'show(): void' } },
    },
    showModal: {
      name: 'showModal()',
      description:
        'Open the dialog as a modal with a backdrop\n\nSee [MDN: HTMLDialogElement.showModal()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)',
      control: { disable: true },
      table: { category: 'methods', type: { summary: 'showModal(): void' } },
    },
    close: {
      name: 'close(result?)',
      description:
        'Close the dialog programmatically. \n\nAn optional string may be passed as an argument, updating the `returnValue` of the dialog\n\nSee [MDN: HTMLDialogElement.close()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close).',
      control: { disable: true },
      table: { category: 'methods', type: { summary: 'close(result?: string): void' } },
    },

    closeEvent: {
      name: 'close',
      description:
        'Fires when the dialog has been closed\n\nSee [MDN: close event — Examples](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event#examples).',
      control: { disable: true },
      table: { category: 'events', type: { summary: 'Event' } },
    },
    submitEvent: {
      name: 'submit',
      description:
        'Fires when a form inside the dialog is submitted\n\nSee [MDN: submit event — Examples](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event#examples).',
      control: { disable: true },
      table: { category: 'events', type: { summary: 'SubmitEvent' } },
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
    const postDialogIcon =
      args.icon && args.icon !== 'none'
        ? html`<post-icon name="${args.icon}"></post-icon>`
        : nothing;
    const postDialogCloseButton = args.closeButton ? getCloseButton() : nothing;

    // Don't declare default values or show empty containers
    if (args.animation === 'pop-in') args.animation = nothing;
    if (args.position === 'center') args.position = nothing;
    if (args.size === 'medium') args.size = nothing;

    return html`
      <dialog
        class="palette ${args.palette}"
        data-size="${args.size}"
        data-position="${args.position}"
        data-animation="${args.animation}"
        open="${args.open || nothing}"
        closedby="${args.closedby}"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        <form method="dialog" class="dialog-grid">
          ${postDialogIcon}
          <h3 id="dialog-title" class="dialog-header">${args.title}</h3>
          <div id="dialog-desc" class="dialog-body">${args.content}</div>
          <div class="dialog-controls">${getControls()}</div>
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
      <dialog
        size="${args.size}"
        closedby="${args.closedby}"
        aria-labelledby="example-dialog-title"
        aria-describedby="example-dialog-desc"
      >
        <form
          id="example-dialog-form"
          method="dialog"
          class="dialog-grid"
          onsubmit="console.log(Object.fromEntries(new FormData(event.target)))"
        >
          <h3 id="example-dialog-title" class="dialog-header">Form example</h3>
          <div id="example-dialog-desc" class="dialog-body">
            <div class="form-floating mt-16">
              <input
                id="example-dialog-text-field"
                class="form-control form-control-lg"
                type="text"
                placeholder="Placeholder"
                name="example-text-field"
                aria-describedby="example-form-hint"
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
      <dialog closedby="any" aria-labelledby="custom-dialog-title" aria-describedby="custom-dialog-desc">
        <form method="dialog" onsubmit="console.log(event)" class="p-16">
          <h2 id="custom-dialog-title">Custom content</h2>
          <p id="custom-dialog-desc">This is some other content, just placed inside the dialog.</p>
          <button class="btn btn-primary">Ok</button>
        </form>
      </dialog>
    `;
  },
};

type Story = StoryObj;

export const Default: Story = { ...Template };
export const Form: Story = { ...FormTemplate };
export const Custom: Story = { ...CustomContentTemplate };
