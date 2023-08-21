import React, { useState } from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './textarea.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

export default {
  title: 'Components/Textarea',
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
    value: undefined,
    size: 'null',
    rows: 4,
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
    value: {
      name: 'Value',
      description: 'The value of the component.',
      control: {
        type: 'string',
      },
      table: {
        disable: true,
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
    rows: {
      name: 'Rows',
      description:
        'Attribute to set the initial height, in lines of text, of the `textarea` element.',
      control: {
        type: 'number',
        min: 3,
        max: 10,
        step: 1,
      },
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
  const [_, updateArgs] = useArgs();
  const [value, updateValue] = useState(args.value);
  const id = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleTextarea`;
  const classes = ['form-control', args.size, args.validation]
    .filter(c => c && c !== 'null')
    .join(' ');

  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label: JSX.Element | null = !useAriaLabel ? (
    <label key="label" htmlFor={id} className="form-label">
      {args.label}
    </label>
  ) : null;

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
    <textarea
      key="control"
      id={id}
      className={classes}
      defaultValue={args.value}
      placeholder={useAriaLabel ? args.label : ' '}
      rows={args.rows}
      disabled={args.disabled}
      aria-label={useAriaLabel ? args.label : undefined}
      aria-invalid={VALIDATION_STATE_MAP[args.validation]}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateValue(e.target.value)}
      onBlur={() => updateArgs({ value })}
    ></textarea>
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
    exclude: ['Hidden Label', 'Size', 'Rows', 'Helper Text', 'Disabled', 'Validation'],
  },
};
FloatingLabel.args = {
  floatingLabel: true,
  hint: '',
};

export const Size: Story = Template.bind({});
Size.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Hidden Label',
      'Rows',
      'Helper Text',
      'Disabled',
      'Validation',
    ],
  },
};
Size.args = {
  size: 'form-control-sm',
  hint: '',
};

export const Validation: Story = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: ['Label', 'Floating Label', 'Hidden Label', 'Size', 'Rows', 'Helper Text', 'Disabled'],
  },
};
Validation.args = {
  validation: 'is-invalid',
  hint: '',
};
