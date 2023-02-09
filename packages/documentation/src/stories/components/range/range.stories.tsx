import React, { useState } from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './range.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export default {
  title: 'Components/Range',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    label: 'Label',
    hiddenLabel: false,
    value: 50,
    useBoundaries: false,
    min: 0,
    max: 100,
    step: 1,
    showValue: 'none',
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
    value: {
      name: 'Value',
      description: 'Holds the current input value.',
      control: {
        type: 'number',
      },
      table: {
        disable: true,
      },
    },
    useBoundaries: {
      name: 'Boundaries',
      description: 'Render the component with or without `min`, `max` and `step` attributes.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    min: {
      name: 'Minimum Value',
      description: 'Controls the `min` attribute of the component.',
      if: {
        arg: 'useBoundaries',
      },
      control: {
        type: 'number',
      },
      table: {
        category: 'General',
      },
    },
    max: {
      name: 'Maximum Value',
      description: 'Controls the `max` attribute of the component.',
      if: {
        arg: 'useBoundaries',
      },
      control: {
        type: 'number',
      },
      table: {
        category: 'General',
      },
    },
    step: {
      name: 'Step',
      description:
        'Controls the `step` attribute of the component. You can also use fractional numbers.',
      if: {
        arg: 'useBoundaries',
      },
      control: {
        type: 'number',
        step: 1,
      },
      table: {
        category: 'General',
      },
    },
    showValue: {
      name: 'Show Value',
      description: 'Render the component with or without a visible value.',
      control: {
        type: 'radio',
        labels: {
          none: 'None',
          text: 'Text',
          input: 'Input',
        },
      },
      options: ['none', 'text', 'input'],
      table: {
        category: 'General',
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
} as Meta;

const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();
  const [value, updateValue] = useState(args.value);

  const id = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleRange`;
  const classes = ['form-range', args.validation].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const label: JSX.Element | null = !useAriaLabel ? (
    <label key="label" className="form-label" htmlFor={id}>
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
  ];

  const control: JSX.Element = (
    <input
      key="control"
      id={id}
      className={classes}
      type="range"
      defaultValue={value}
      min={args.useBoundaries ? args.min : undefined}
      max={args.useBoundaries ? args.max : undefined}
      step={args.useBoundaries ? args.step : undefined}
      disabled={args.disabled}
      aria-label={useAriaLabel && args.label}
      aria-invalid={VALIDATION_STATE_MAP[args.validation]}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateValue(e.target.value)}
      onMouseUp={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => updateArgs({ value })}
      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (ARROW_KEYS.includes(e.key)) {
          updateArgs({ value });

          if (document.activeElement === e.target) {
            setTimeout(() => {
              const element: HTMLInputElement | null = document.querySelector(`#${id}`);
              if (element) element.focus();
            }, 25);
          }
        }
      }}
    />
  );

  let valueElement: JSX.Element | JSX.Element[] | null = null;

  if (args.showValue === 'text') {
    valueElement = (
      <p key="value" className="form-text">
        {value}
      </p>
    );
  } else if (args.showValue === 'input') {
    const inputId = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleRangeInput`;

    valueElement = [
      <label key="input-label" className="form-label visually-hidden" htmlFor={inputId}>
        Range controller
      </label>,
      <input
        key="input"
        id={inputId}
        className="form-control mw-giant"
        type="text"
        inputMode="decimal"
        value={value}
        disabled={args.disabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateArgs({ value: e.target.value })}
      />,
    ];
  }

  if (args.showValue === 'input') {
    return (
      <div className="row align-items-end">
        <div className="col">{[label, control, ...contextuals].filter(el => el !== null)}</div>
        <div className="col-auto">{valueElement}</div>
      </div>
    );
  } else {
    return <>{[label, control, valueElement, ...contextuals].filter(el => el !== null)}</>;
  }
};

export const Default: Story = Template.bind({});

export const Boundaries: Story = Template.bind({});
Boundaries.storyName = 'Min, Max & Steps';
Boundaries.parameters = {
  controls: {
    exclude: ['Label', 'Hidden Label', 'Boundaries', 'Show Value', 'Disabled', 'Validation'],
  },
};
Boundaries.args = {
  value: 0.5,
  useBoundaries: true,
  min: 0,
  max: 1,
  step: 0.1,
  showValue: 'text',
};

export const Validation: Story = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: ['Label', 'Hidden Label', 'Boundaries', 'Disabled'],
  },
};
Validation.args = {
  validation: 'is-invalid',
};
