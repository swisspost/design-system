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
          info: 'Info',
          error: 'Error',
          warning: 'Warning',
          success: 'Success',
        },
      },
      options: ['none', 'info', 'success', 'error', 'warning'],
      table: { category: 'Content' },
    },
    palette: {
      name: 'Palette',
      description: 'The color scheme of the dialog',
      control: {
        type: 'select',
      },
      options: ['palette-default', 'palette-accent', 'palette-alternate', 'palette-brand'],
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
    closedby: {
      name: 'closedby',
      description:
        'Specifies the types of user actions that can be used to close the dialog.\n\nMore details on [MDN: closedby attribute reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby)',
      control: { disable: true },
      table: { 
        category: 'props',
        type: { summary: 'string' }
      },
    },
    show: {
      name: 'show()',
      description:
        'Opens the dialog non-modally.\n\nMore details on [MDN: show() method docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show)',
      control: { disable: true },
      table: { category: 'methods', type: { summary: 'show(): void' } },
    },
    showModal: {
      name: 'showModal()',
      description:
        'Opens the dialog as a modal with a backdrop.\n\nMore details on [MDN: showModal() method docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)',
      control: { disable: true },
      table: { category: 'methods', type: { summary: 'showModal(): void' } },
    },
    close: {
      name: 'close(result?)',
      description:
        'Closes the dialog programmatically.\n\nMore details on [MDN: close() method docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close)',
      control: { disable: true },
      table: { category: 'methods', type: { summary: 'close(result?: string): void' } },
    },

    closeEvent: {
      name: 'close',
      description:
        'Fires after the dialog has been closed.\n\nExamples on [MDN: close event reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event#examples)',
      control: { disable: true },
      table: { category: 'events', type: { summary: 'Event' } },
    },
    submitEvent: {
      name: 'submit',
      description:
        'Fires when a form inside the dialog is submitted.\n\nExamples on [MDN: submit event reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event#examples)',
      control: { disable: true },
      table: { category: 'events', type: { summary: 'SubmitEvent' } },
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
  return html` <post-closebutton button-type="submit">Close</post-closebutton>`;
};

const getControls = () => {
  return html`
    <button class="btn btn-primary">OK</button>
    <button class="btn btn-secondary">Cancel</button>
  `;
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
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <form method="dialog" class="dialog-grid">
          ${postDialogIcon}
          <h3 class="dialog-header" id="dialog-title">${args.title}</h3>
          <div class="dialog-body"><p id="dialog-description">${args.content}</p></div>
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
      <dialog size="${args.size}"
        aria-labelledby="example-dialog-title"
        aria-describedby="example-dialog-description"
      >
        <form
          id="example-dialog-form"
          method="dialog"
          class="dialog-grid"
          onsubmit="console.log(Object.fromEntries(new FormData(event.target)))"
        >
          <h3 class="dialog-header" id="example-dialog-title">Form example</h3>
          <div class="dialog-body">
            <p id="example-dialog-description">Please fill out the form below.</p>
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
      <dialog
        aria-labelledby="custom-dialog-title"
        aria-describedby="custom-dialog-description"
      >
        <form method="dialog" onsubmit="console.log(event)" class="p-16">
          <h2 id="custom-dialog-title">Custom content</h2>
          <p id="custom-dialog-description">This is some other content, just placed inside the dialog.</p>
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
