import React from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import docsPage from './input.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

export default {
  title: 'Components/Text Input',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    label: 'Label',
    floatingLabel: false,
    hiddenLabel: false,
    placeholder: 'Placeholder',
    type: 'text',
    size: 'null',
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
    disabled: false,
    validation: 'null',
  },
  argTypes: {
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
    floatingLabel: {
      name: 'Floating Label',
      description: 'Defines how the components label is rendered.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description:
        'Renders the component with or without a visible label.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/story/foundations-accessibility--page#labels">label accessibility guide</a>.</span>',
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Defines the text displayed in the input when it is empty.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    type: {
      name: 'Type',
      description: 'The components `type` attribute.',
      control: {
        type: 'select',
        labels: {},
      },
      options: [
        'text',
        'number',
        'email',
        'tel',
        'url',
        'password',
        'date',
        'datetime-local',
        'month',
        'week',
        'time',
        'color',
      ],
      table: {
        category: 'General',
      },
    },
    size: {
      name: 'Size',
      description: "Sets the size of the component's appearance.",
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      control: {
        type: 'select',
        labels: {
          'form-control-sm': 'Small',
          'form-control-rg': 'Regular',
          'null': 'Middle',
          'form-control-lg': 'Large',
        },
      },
      options: ['form-control-sm', 'form-control-rg', 'null', 'form-control-lg'],
      table: {
        category: 'General',
      },
    },
    hint: {
      name: 'Helper Text',
      description: 'Text to place in the help text area of the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<div className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</div>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description: 'Controls the validation state appearance of the component.',
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
} as Meta;

const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const id = `ExampleTextarea_${context.name}`;
  const classes = [
    'form-control',
    args.type === 'color' && 'form-control-color',
    args.size,
    args.validation,
  ]
    .filter(c => c && c !== 'null')
    .join(' ');

  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label: JSX.Element | null = !useAriaLabel ? (
    <label key="label" htmlFor={id} className="form-label">
      {args.label}
    </label>
  ) : null;

  if (args.floatingLabel && !args.placeholder) {
    args.placeholder = ' '; // a placeholder must always be defined for the floating label to work properly
  }

  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? (
      <p key="valid" className="valid-feedback">
        Ggranda sukceso!
      </p>
    ) : null,
    args.validation === 'is-invalid' ? (
      <p key="invalid" className="invalid-feedback">
        Eraro okazis!
      </p>
    ) : null,
    args.hint !== '' ? (
      <div key="hint" className="form-text">
        {args.hint}
      </div>
    ) : null,
  ];

  const control: JSX.Element = (
    <input
      key="control"
      id={id}
      className={classes}
      type={args.type}
      placeholder={args.placeholder || undefined}
      disabled={args.disabled}
      aria-label={useAriaLabel ? args.label : undefined}
      aria-invalid={VALIDATION_STATE_MAP[args.validation]}
    />
  );

  if (args.floatingLabel) {
    return (
      <div className="form-floating">
        {[control, label, ...contextuals].filter(el => el !== null)}
      </div>
    );
  } else {
    return <>{[label, control, ...contextuals].filter(el => el !== null)}</>;
  }
};

export const Default: Story = Template.bind({});

export const FloatingLabel: Story = Template.bind({});
FloatingLabel.parameters = {
  controls: {
    exclude: ['Hidden Label', 'Size', 'Helper Text', 'Disabled', 'Validation'],
  },
};
FloatingLabel.args = {
  floatingLabel: true,
  hint: '',
};

export const Size: Story = Template.bind({});
Size.parameters = {
  controls: {
    exclude: ['Label', 'Floating Label', 'Hidden Label', 'Helper Text', 'Disabled', 'Validation'],
  },
};
Size.args = {
  size: 'form-control-sm',
  hint: '',
};

export const Validation: Story = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: ['Label', 'Floating Label', 'Hidden Label', 'Size', 'Helper Text', 'Disabled'],
  },
};
Validation.args = {
  validation: 'is-invalid',
  hint: '',
};
