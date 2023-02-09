import React from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './switch.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

export default {
  title: 'Components/Switch',
  parameters: {
    docs: {
      page: docsPage,
    },
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
} as Meta;

const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();

  const id = `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleSwitch`;
  const classes = ['form-check-input', args.validation].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const useLabelBefore = !useAriaLabel && ['before', 'both'].includes(args.labelPosition);
  const useLabelAfter = !useAriaLabel && ['after', 'both'].includes(args.labelPosition);
  const labelBefore: JSX.Element | null = useLabelBefore ? (
    <label key="label-before" htmlFor={id} className="form-check-label order-first">
      {args.labelBefore}
    </label>
  ) : null;
  const labelAfter: JSX.Element | null = useLabelAfter ? (
    <label key="label-after" htmlFor={id} className="form-check-label">
      {args.labelAfter}
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

  const control = (
    <input
      key="control"
      id={id}
      className={classes}
      type="checkbox"
      role="switch"
      defaultChecked={args.checked}
      disabled={args.disabled}
      aria-label={useAriaLabel && (args.checked ? args.labelAfter : args.labelBefore)}
      aria-invalid={VALIDATION_STATE_MAP[args.validation]}
      onChange={() =>
        setTimeout(() => {
          updateArgs({ checked: !args.checked });
        }, 250)
      }
    />
  );

  return (
    <div className="form-check form-switch">
      {[control, labelBefore, labelAfter, ...contextuals].filter(el => el !== null)}
    </div>
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

export const MultilineLabels: Story = Template.bind({});
MultilineLabels.decorators = [
  (Story: Story) => (
    <div className="pt-3">
      <Story />
    </div>
  ),
];
MultilineLabels.parameters = {
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
};
MultilineLabels.args = {
  labelPosition: 'after',
  labelAfter:
    'Longa etikedo kiu plej versajne ne taugas sur unu linio kaj tial devas esti envolvita. Kaj nur por esti sur la sekura flanko, ni simple aldonu unu plian tre sencelan frazon ci tie. Vi neniam scias...',
};

export const Validation: Story = Template.bind({});
Validation.parameters = {
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
};
Validation.args = {
  validation: 'is-invalid',
};
