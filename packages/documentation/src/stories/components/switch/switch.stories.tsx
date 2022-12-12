import React from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import docsPage from './switch.docs.mdx';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true
};

export default {
  title: 'Components/Switch',
  parameters: {
    docs: {
      page: docsPage
    }
  },
  args: {
    labelPosition: 'both',
    labelBefore: 'Off',
    labelAfter: 'On',
    hiddenLabel: false,
    checked: false,
    disabled: false,
    validation: 'null',
    validFeedback: 'Ggranda sukceso!',
    invalidFeedback: 'Eraro okazis!'
  },
  argTypes: {
    labelPosition: {
      name: 'Label Position',
      description: 'The position of the components label.',
      control: {
        type: 'radio',
        label: {
          both: 'Both',
          before: 'Before',
          after: 'After'
        }
      },
      options: [
        'both',
        'before',
        'after'
      ],
      table: {
        category: 'General'
      }
    },
    labelBefore: {
      name: 'Label (before)',
      description: 'Describes the content/topic of the component.',
      if: {
        arg: 'labelPosition',
        neq: 'after'
      },
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
      }
    },
    labelAfter: {
      name: 'Label (after)',
      description: 'Describes the content/topic of the component.',
      if: {
        arg: 'labelPosition',
        neq: 'before'
      },
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
      }
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description: '<p>Render the component with or without a visible label.</p><div className="alert alert-info alert-sm">There are accessibility issues with hidden labels.<br/>Please read our <a href="/?path=/story/foundations-accessibility--page#labels">labels accessibility guide</a>.</div>',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    checked: {
      name: 'Checked',
      description: 'Defienes the checked state of the component.',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'States'
      }
    },
    disabled: {
      name: 'Disabled',
      description: '<p>When set to `true`, disables the component\'s functionality and places it in a disabled state.</p><div className="alert alert-info alert-sm">There are accessibility issues with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</div>',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'States'
      }
    },
    validation: {
      name: 'Validation',
      description: 'Controls the validation state appearance of the component.',
      control: {
        type: 'select',
        labels: {
          'null': 'Default',
          'is-valid': 'Valid',
          'is-invalid': 'Invalid'
        }
      },
      options: [
        'null',
        'is-valid',
        'is-invalid'
      ],
      table: {
        category: 'States'
      }
    },
    validFeedback: {
      name: 'Valid Feedback',
      description: 'Text to show when the component is in an valid state.',
      control: {
        type: 'text'
      },
      table: {
        category: 'States'
      }
    },
    invalidFeedback: {
      name: 'Invalid Feedback',
      description: 'Text to show when the component is in an invalid state.',
      control: {
        type: 'text'
      },
      table: {
        category: 'States'
      }
    }
  }
} as Meta;

function toggle (args: Args, updateArgs: Function) {
  updateArgs({ checked: !args.checked });
}


const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();

  const id = `ExampleSwitch_${context.name}`;
  const classes = [
    'form-check-input',
    args.validation
  ].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const useLabelBefore = !useAriaLabel && ['before', 'both'].includes(args.labelPosition);
  const useLabelAfter = !useAriaLabel && ['after', 'both'].includes(args.labelPosition);
  const labelBefore: (JSX.Element | null) = useLabelBefore ? <label key="label-before" htmlFor={ id } className="form-check-label order-first">{ args.labelBefore }</label> : null;
  const labelAfter: (JSX.Element | null) = useLabelAfter ? <label key="label-after" htmlFor={ id } className="form-check-label">{ args.labelAfter }</label> : null;

  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? <p key="valid" className="valid-feedback">{ args.validFeedback }</p> : null,
    args.validation === 'is-invalid' ? <p key="invalid" className="invalid-feedback">{ args.invalidFeedback }</p> : null
  ];

  const control = <input
    key="control"
    id={ id }
    className={ classes }
    type="checkbox"
    role="switch"
    checked={ args.checked }
    disabled={ args.disabled }
    aria-label={ useAriaLabel ? `${args.labelBefore} ${args.labelAfter}` : undefined }
    aria-invalid={ VALIDATION_STATE_MAP[args.validation] }
    onChange={ (e:React.ChangeEvent) => toggle(args, updateArgs) }
  />;

  return <div className="form-check form-switch">
    { [control, labelBefore, labelAfter, ...contextuals].filter(el => el !== null) }
  </div>;
};

export const Default: Story = Template.bind({});
Default.decorators = [
  (Story: Story) => <div className="pt-3">
    <Story/>
  </div>
];

export const Multiline: Story = Template.bind({});
Multiline.decorators = [
  (Story: Story) => <div className="pt-3">
    <Story/>
  </div>
];
Multiline.parameters = {
  controls: {
    exclude: [
      'Label Position',
      'Label (after)',
      'Hidden Label',
      'Checked',
      'Disabled',
      'Validation',
      'Valid Feedback',
      'invalid Feedback'
    ]
  }
};
Multiline.args = {
  labelPosition: 'after',
  labelAfter: 'Longa etikedo kiu plej versajne ne taugas sur unu linio kaj tial devas esti envolvita. Kaj nur por esti sur la sekura flanko, ni simple aldonu unu plian tre sencelan frazon ci tie. Vi neniam scias...'
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
      'Disabled'
    ]
  }
};
Validation.args = {
  validation: 'is-invalid'
};
