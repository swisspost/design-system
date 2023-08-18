import { useArgs } from '@storybook/preview-api';
import type { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BADGE } from '../../../../.storybook/constants';
import { mapClasses } from '../../../utils';

const meta: Meta = {
  title: 'Components/Switch',
  render: renderSwitch,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    labelPosition: 'both',
    labelBefore: 'Off',
    labelAfter: 'On',
    hiddenLabel: false,
    checked: false,
    disabled: false,
    validation: 'null',
  },
  argTypes: {
    labelPosition: {
      name: 'Label Position',
      description: 'The position of the component label.',
      control: {
        type: 'radio',
        label: {
          both: 'Both',
          before: 'Before',
          after: 'After',
        },
      },
      options: ['both', 'before', 'after'],
      table: {
        category: 'General',
      },
    },
    labelBefore: {
      name: 'Label (before)',
      description: 'Describes the content/topic of the component.',
      if: {
        arg: 'labelPosition',
        neq: 'after',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    labelAfter: {
      name: 'Label (after)',
      description: 'Describes the content/topic of the component.',
      if: {
        arg: 'labelPosition',
        neq: 'before',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description:
        'Renders the component with or without a visible label.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/story/foundations-accessibility--page#labels">label accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked',
      description: 'When set to `true`, places the component in the checked state.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description: "Controls the display of the component's validation state.",
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-valid': 'Valid',
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-valid', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
  },
  decorators: [
    story =>
      html`
        <div class="pt-3">${story()}</div>
      `,
  ],
};

export default meta;

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

function renderSwitch(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  const switchClasses = mapClasses({
    'form-check-input': true,
    [args.validation]: args.validation !== 'null',
  });

  const useAriaLabel = args.hiddenLabel;
  const ariaLabel = args.checked ? args.labelAfter : args.labelBefore;
  const useLabelBefore = !useAriaLabel && ['before', 'both'].includes(args.labelPosition);
  const useLabelAfter = !useAriaLabel && ['after', 'both'].includes(args.labelPosition);

  const labelBefore = useLabelBefore
    ? html`
        <label for=${context.id} class="form-check-label order-first">${args.labelBefore}</label>
      `
    : null;

  const labelAfter = useLabelAfter
    ? html`
        <label for=${context.id} class="form-check-label">${args.labelAfter}</label>
      `
    : null;

  const validationText = args.validation === 'is-valid' ? 'Ggranda sukceso!' : 'Eraro okazis!';
  const validationFeedback =
    args.validation !== 'null'
      ? html`
          <p class=${args.validation.split('-')[1] + '-feedback'}>
            ${validationText}
          </p>
        `
      : null;

  return html`
    <div class="form-check form-switch">
      <input
        id=${context.id}
        class=${switchClasses}
        type="checkbox"
        role="switch"
        ?checked=${args.checked}
        .checked=${args.checked}
        ?disabled=${args.disabled}
        aria-label=${useAriaLabel ? ariaLabel : nothing}
        aria-invalid=${ifDefined(VALIDATION_STATE_MAP[args.validation])}
        @change=${(e: Event) => updateArgs({ checked: !args.checked })}
      />
      ${labelBefore} ${labelAfter} ${args.validation !== 'null' ? validationFeedback : nothing}
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const MultilineLabels: Story = {
  parameters: {
    controls: {
      exclude: [
        'Label Position',
        'Label (before)',
        'Hidden Label',
        'Checked',
        'Disabled',
        'Validation',
      ],
    },
  },
  args: {
    labelPosition: 'after',
    labelAfter:
      'Longa etikedo kiu plej versajne ne taugas sur unu linio kaj tial devas esti envolvita. Kaj nur por esti sur la sekura flanko, ni simple aldonu unu plian tre sencelan frazon ci tie. Vi neniam scias...',
  },
};

export const Validation: Story = {
  parameters: {
    controls: {
      exclude: [
        'Label Position',
        'Label (before)',
        'Label (after)',
        'Hidden Label',
        'Checked',
        'Disabled',
      ],
    },
  },
  args: {
    validation: 'is-invalid',
  },
};
