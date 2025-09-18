import { useArgs } from 'storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@root/types';
import { getLabelText } from '@/utils/form-elements';

const meta: MetaComponent = {
  id: '7fb639f8-86f6-4937-999c-4ee15f81643b',
  title: 'Components/Form Switch',
  tags: ['package:Styles', 'status:InProgress'],
  render: renderSwitch,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=22183-26714&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    labelPosition: 'after',
    label: 'Notifications',
    hiddenLabel: false,
    checked: false,
    disabled: false,
    validation: 'null',
    requiredOptional: 'null',
  },
  argTypes: {
    labelPosition: {
      name: 'Label Position',
      description: 'The position of the component label.',
      control: {
        type: 'radio',
        label: {
          before: 'Before',
          after: 'After',
        },
      },
      options: ['before', 'after'],
      table: {
        category: 'General',
      },
    },
    label: {
      name: 'Label',
      description: 'Describes the content/topic of the component.',
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
        'Renders the component with or without a visible label.<post-banner data-size="sm"><p>There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/13fb5dfe-6c96-4246-aa6a-6df9569f143f--docs">form labels guidelines</a>.</p></post-banner>',
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description:
        'Defines the validation state of the switch and controls the display of the corresponding return message. <post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#switch">validation guidelines here</a>.</p></post-banner> ',
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
    requiredOptional: {
      name: 'Required / Optional',
      description: 'Whether the field is required or optional.',
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          required: 'Required',
          optional: 'Optional',
        },
      },
      options: ['null', 'required', 'optional'],
      table: {
        category: 'States',
      },
    },
  },
  decorators: [story => html` <div class="pt-16">${story()}</div> `],
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
  const ariaLabel = args.checked ? args.label + ' Off' : args.label + ' On';
  const useLabelBefore = !useAriaLabel && 'before' === args.labelPosition;
  const useLabelAfter = !useAriaLabel && 'after' === args.labelPosition;

  const labelBefore = useLabelBefore
    ? html`
        <label for=${context.id} class="form-check-label order-first">${getLabelText(args)}</label>
      `
    : null;

  const labelAfter = useLabelAfter
    ? html` <label for=${context.id} class="form-check-label">${getLabelText(args)}</label> `
    : null;

  const validationText = args.validation === 'is-valid' ? 'Great success!' : 'An error occurred!';
  const validationFeedback =
    args.validation !== 'null'
      ? html`
          <p
            class=${args.validation.split('-')[1] + '-feedback'}
            id="${args.validation}-id-${context.id}"
          >
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
        aria-describedby="${args.validation != 'null'
          ? `${args.validation}-id-${context.id}`
          : nothing}"
        @change=${() => updateArgs({ checked: !args.checked })}
        ?required="${args.requiredOptional === 'required'}"
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
      exclude: ['Label Position', 'Hidden Label', 'Checked', 'Disabled', 'Validation'],
    },
  },
  args: {
    labelPosition: 'after',
    label:
      'A long label that probably does not fit on one line and therefore must be wrapped. And just to be on the safe side, we simply add one more very senseless sentence here. You never know...',
  },
};
