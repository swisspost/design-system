import React from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './checkbox.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

const CHECKED_STATE_MAP: Record<string, boolean> = {
  indeterminate: false,
  unchecked: false,
  checked: true,
};

const CHECKED_STATE_TOGGLE_MAP: Record<string, string> = {
  indeterminate: 'checked',
  unchecked: 'checked',
  checked: 'unchecked',
};

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

export default {
  title: 'Components/Checkbox',
  parameters: {
    docs: {
      page: docsPage,
    },
    controls: {
      exclude: ['Hidden Legend'],
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    hiddenLegend: false,
    label: 'Label',
    hiddenLabel: false,
    checked: 'unchecked',
    disabled: false,
    validation: 'null',
  },
  argTypes: {
    hiddenLegend: {
      name: 'Hidden Legend',
      description: 'Render the group with or without a visible legend.',
      control: {
        type: 'boolean',
      },
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
        type: 'radio',
        labels: {
          indeterminate: 'Indeterminate',
          unchecked: 'Unchecked',
          checked: 'Checked',
        },
      },
      options: ['indeterminate', 'unchecked', 'checked'],
      table: {
        category: 'States',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-mini alert alert-info alert-sm">There are accessibility issues with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</span>',
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

  const id = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleCheckbox`;
  const classes = ['form-check-input', args.validation].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const label: JSX.Element | null = !useAriaLabel ? (
    <label key="label" htmlFor={id} className="form-check-label">
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
      type="checkbox"
      checked={CHECKED_STATE_MAP[args.checked]}
      disabled={args.disabled}
      aria-label={useAriaLabel && args.label}
      aria-invalid={VALIDATION_STATE_MAP[args.validation]}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        updateArgs({ checked: CHECKED_STATE_TOGGLE_MAP[args.checked] });

        if (document.activeElement === e.target) {
          setTimeout(() => {
            const element: HTMLInputElement | null = document.querySelector(`#${id}`);
            if (element) element.focus();
          }, 25);
        }
      }}
    />
  );

  setTimeout(function () {
    const input: HTMLInputElement | null = document.querySelector(`#${id}`);
    if (input !== null) input.indeterminate = args.checked === 'indeterminate';
  }, 0);

  return (
    <div className="form-check">{[control, label, ...contextuals].filter(el => el !== null)}</div>
  );
};

export const Default: Story = Template.bind({});
Default.decorators = [
  (Story: Story) => (
    <div className="pt-3">
      <Story />
    </div>
  ),
];

const TemplateInline = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();
  const baseId = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleCheckbox`;
  const id1 = baseId + '1';
  const id2 = baseId + '2';
  const id3 = baseId + '3';
  const id4 = baseId + '4';

  function onChange(e: React.ChangeEvent<HTMLInputElement>, property: string) {
    updateArgs({ [property]: e.target.checked });

    if (document.activeElement === e.target) {
      setTimeout(() => {
        const element: HTMLInputElement | null = document.querySelector(`#${e.target.id}`);
        if (element) element.focus();
      }, 25);
    }
  }

  return (
    <fieldset>
      <legend className={args.hiddenLegend ? 'visually-hidden' : undefined}>Legend</legend>
      <div key="FormCheck_1" className="form-check form-check-inline">
        <input
          id={id1}
          className="form-check-input"
          type="checkbox"
          checked={args.checked1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'checked1')}
        />
        <label htmlFor={id1} className="form-check-label">
          {args.label}
        </label>
      </div>
      <div key="FormCheck_2" className="form-check form-check-inline">
        <input
          id={id2}
          className="form-check-input"
          type="checkbox"
          checked={args.checked2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'checked2')}
        />
        <label htmlFor={id2} className="form-check-label">
          {args.label}
        </label>
      </div>
      <div key="FormCheck_3" className="form-check form-check-inline">
        <input
          id={id3}
          className="form-check-input"
          type="checkbox"
          checked={args.checked3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'checked3')}
        />
        <label htmlFor={id3} className="form-check-label">
          {args.label}
        </label>
      </div>
      <div key="FormCheck_4" className="form-check form-check-inline">
        <input
          id={id4}
          className="form-check-input"
          type="checkbox"
          checked={args.checked4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'checked4')}
        />
        <label htmlFor={id4} className="form-check-label">
          {args.label}
        </label>
      </div>
    </fieldset>
  );
};

export const Inline: Story = TemplateInline.bind({});
Inline.decorators = [
  (Story: Story) => (
    <div className="pt-3">
      <Story />
    </div>
  ),
];
Inline.parameters = {
  controls: {
    exclude: ['Hidden Label', 'Checked', 'Disabled', 'Validation'],
  },
};
Inline.args = {
  checked1: false,
  checked2: false,
  checked3: false,
  checked4: false,
};
Inline.argTypes = {
  checked1: {
    table: {
      disable: true,
    },
  },
  checked2: {
    table: {
      disable: true,
    },
  },
  checked3: {
    table: {
      disable: true,
    },
  },
  checked4: {
    table: {
      disable: true,
    },
  },
};

export const Validation: Story = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: ['Hidden Legend', 'Hidden Label', 'Label', 'Checked', 'Disabled'],
  },
};
Validation.args = {
  validation: 'is-invalid',
};
