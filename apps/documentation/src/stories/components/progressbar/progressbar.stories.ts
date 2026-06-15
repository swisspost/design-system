import { MetaComponent } from '@root/types';
import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

const STATES = ['neutral', 'success', 'error', 'warning'] as const;

const meta: MetaComponent = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  title: 'Components/Progressbar',
  component: 'post-progressbar',
  tags: ['package:Styles', 'package:WebComponents', 'status:InProgress'],
  render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=32332-158448',
    },
  },
  args: {
    min: 0,
    max: 100,
    value: 65,
    hiddenLabel: false,
    label: 'File transfer',
    labelIcon: 'import',
    showValue: true,
    valueText: '',
    state: 'neutral',
    helperMessage: 'form_scanned.pdf',
    statusMessage: 'Upload complete',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Describes the purpose of the progress bar.',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description:
        'Hides the visible label. An accessible name is still provided via `aria-label` on the indicator.<post-banner data-size="sm"><p>Hiding labels has accessibility implications. Use a descriptive label text and only hide it when the context makes the purpose unambiguous.</p></post-banner>',
      control: { type: 'boolean' },
      table: { category: 'Content' },
    },
    labelIcon: {
      name: 'Label Icon',
      description:
        'Name of a `<post-icon>` to prepend to the visible label. Only relevant for the neutral state — for other states the signal icon is applied automatically via CSS.',
      if: { arg: 'hiddenLabel', truthy: false },
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    showValue: {
      name: 'Show Value',
      description: 'Displays the current progress as a percentage next to the label.',
      if: { arg: 'hiddenLabel', truthy: false },
      control: { type: 'boolean' },
      table: { category: 'Content' },
    },
    valueText: {
      name: 'Value Text',
      description:
        'Accessible text alternative for the current value. When provided, it is also shown in the visible value slot instead of the computed percentage.',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    state: {
      name: 'State',
      description:
        'The visual and semantic state of the progress bar. The `neutral` state has no status message. Other states add a signal icon to the label and reveal the status message.',
      control: {
        type: 'radio',
        labels: {
          neutral: 'Neutral',
          success: 'Success',
          error: 'Error',
          warning: 'Warning',
        },
      },
      options: [...STATES],
      table: { category: 'States' },
    },
    helperMessage: {
      name: 'Helper Message',
      description: 'Optional contextual information shown below the progress bar at all times.',
      control: { type: 'text' },
      table: { category: 'Messages' },
    },
    statusMessage: {
      name: 'Status Message',
      description:
        'Optional message shown only when the state is `success`, `error`, or `warning`. Hidden by CSS for the `neutral` state.',
      if: { arg: 'state', neq: 'neutral' },
      control: { type: 'text' },
      table: { category: 'Messages' },
    },
  },
};

export default meta;

type Story = StoryObj;

// ---------------------------------------------------------------------------
// Shared render
// ---------------------------------------------------------------------------

function render(args: Args, context: StoryContext) {
  const labelId = `progressbar-label-${context.id}`;

  const wrapperClasses = ['progressbar', args.state !== 'neutral' && `progressbar-${args.state}`]
    .filter(Boolean)
    .join(' ');

  const percentage = Math.round(((args.value - args.min) / (args.max - args.min)) * 100);
  const valueText = args.valueText || `${percentage}%`;

  const labelIconEl =
    !args.hiddenLabel && args.labelIcon
      ? html`<post-icon name="${args.labelIcon}"></post-icon>`
      : nothing;

  const labelEl = !args.hiddenLabel
    ? html`<p class="progressbar-label" id="${labelId}">${labelIconEl}${args.label}</p>`
    : nothing;

  const valueEl =
    !args.hiddenLabel && args.showValue && percentage !== undefined
      ? html`<p class="progressbar-value">${valueText}</p>`
      : nothing;

  const helperEl = args.helperMessage
    ? html`<p class="progressbar-message">${args.helperMessage}</p>`
    : nothing;

  // The neutral state never has a status message; CSS also enforces this via display:none.
  const statusEl =
    args.statusMessage && args.state !== 'neutral'
      ? html`<p class="progressbar-status">${args.statusMessage}</p>`
      : nothing;

  return html`
    <div class="${wrapperClasses}">
      ${labelEl} ${valueEl}
      <post-progressbar
        value="${args.value}"
        min="${args.min}"
        max="${args.max}"
        aria-valuetext="${args.valueText || nothing}"
        aria-label="${args.hiddenLabel ? args.label : nothing}"
        aria-labelledby="${!args.hiddenLabel ? labelId : nothing}"
      ></post-progressbar>
      ${helperEl} ${statusEl}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    max: 17,
    value: 11,
    valueText: '11 of 17',
    label: 'Loading packages',
    labelIcon: '',
    helperMessage: '',
    statusMessage: '',
  },
};

export const States: Story = {
  decorators: [story => html`<div class="d-grid gap-24">${story()}</div>`],
  render: (args: Args, context: StoryContext) => {
    const successArgs = { ...args, state: 'success', value: 100, statusMessage: 'Upload complete' };
    const warningArgs = {
      ...args,
      state: 'warning',
      value: 30,
      statusMessage: 'Upload failed — please try again',
    };
    const errorArgs = {
      ...args,
      state: 'error',
      value: 10,
      statusMessage: 'Upload paused — check your connection',
    };
    return html`
      ${render(args, context)} ${render(successArgs, context)} ${render(warningArgs, context)}
      ${render(errorArgs, context)}
    `;
  },
};
