import { useArgs } from '@storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '7fb639f8-86f6-4937-999c-4ee15f81643b',
  title: 'Components/Form Switch',
  tags: ['package:HTML'],
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
        'Renders the component with or without a visible label.<span className="mt-8 banner banner-info banner-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#labels">label accessibility guide</a>.</span>',
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-8 banner banner-info banner-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</span>',
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
        'Defines the validation state of the switch and controls the display of the corresponding return message. <span className="mt-8 alert alert-info alert-sm">Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#switch">validation guidelines here</a>.</span> ',
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
    ? html` <label for=${context.id} class="form-check-label order-first">${args.label}</label> `
    : null;

  const labelAfter = useLabelAfter
    ? html` <label for=${context.id} class="form-check-label">${args.label}</label> `
    : null;

  const validationText = args.validation === 'is-valid' ? 'Ggranda sukceso!' : 'Eraro okazis!';
  const validationFeedback =
    args.validation !== 'null'
      ? html` <p class=${args.validation.split('-')[1] + '-feedback'}>${validationText}</p> `
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
        @change=${() => updateArgs({ checked: !args.checked })}
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
      'Longa etikedo kiu plej versajne ne taugas sur unu linio kaj tial devas esti envolvita. Kaj nur por esti sur la sekura flanko, ni simple aldonu unu plian tre sencelan frazon ci tie. Vi neniam scias...',
  },
};
