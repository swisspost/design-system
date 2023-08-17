import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Args, Meta } from '@storybook/react';

import { useArgs } from '@storybook/client-api';

export const choiceCardMeta = {
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    label: 'Card check text',
    type: 'radio',
    checked: false,
    disabled: false,
    validation: 'null',
    showDescription: false,
    description: 'A small description',
    icon: 1000,
    showIcon: false,
  },
  argTypes: {
    label: {
      name: 'Label',
      type: 'string',
      description: 'The main label of the input',
      table: {
        category: 'General',
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'radio',
        labels: {
          radio: 'Radio button',
          checkbox: 'Checkbox',
        },
      },
      options: ['radio', 'checkbox'],
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked',
      type: 'boolean',
      description: 'When set to `true`, places the component in the checked state.',
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
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
    showDescription: {
      name: 'Show description',
      type: 'boolean',
      description: 'Toggles an additional description',
      table: {
        category: 'Description',
      },
    },
    description: {
      name: 'Description',
      type: 'string',
      description: 'A short additional description',
      table: {
        category: 'Description',
      },
    },
    showIcon: {
      name: 'Show icon',
      type: 'boolean',
      description: 'Show or hide icon',
      table: {
        category: 'Icon',
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
      },
      options: [1000, 1001, 2000],
      table: {
        category: 'Icon',
      },
    },
  },
} as Meta;

export const ChoiceCardTemplate = (args: Args, onChange?: () => void, id = 'choice-card') => {
  const inputClasses = ['form-check-input', args.validation].filter(c => c !== 'null').join(' ');
  return (
    <div className="radio-button-card">
      {typeof onChange === 'function' ? (
        <input
          id={id}
          className={inputClasses}
          type={args.type}
          name="radio-button-card"
          disabled={args.disabled}
          checked={args.checked}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          className={inputClasses}
          type={args.type}
          name="radio-button-card"
          disabled={args.disabled}
        />
      )}
      <label id={`label-${id}`} htmlFor={id} className="form-check-label">
        <span>{args.label}</span>
        {args.showDescription && [
          <br key="br" />,
          <span key="span" className="font-size-12">
            {args.description}
          </span>,
        ]}
      </label>
      {args.showIcon && <post-icon name={args.icon} aria-hidden="true"></post-icon>}
    </div>
  );
};

export const ChoiceCardReactiveTemplate = (args: Args) => {
  const [_, updateArgs] = useArgs();
  return ChoiceCardTemplate(args, () => updateArgs({ checked: !args.checked }));
};

export const choiceCardGroup = (args: Args) => {
  const loop = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  return (
    <fieldset className="container-fluid">
      <legend>Legend</legend>
      <div className="row g-3">
        {loop.map(n => (
          <div className="col-sm-6" key={n}>
            {ChoiceCardTemplate({ ...args, label: n }, undefined, `choice-card-${n}`)}
          </div>
        ))}
      </div>

      {args.validation === 'is-invalid' && (
        <p id="invalid-checkbox" className="mt-3 invalid-feedback d-block">
          Invalid choice
        </p>
      )}
    </fieldset>
  );
};
