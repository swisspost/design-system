import React from 'react';
import { Meta, Args, Story, StoryContext, ReactFramework } from "@storybook/react";
import { useArgs } from '@storybook/client-api';
import docsPage from './checkbox.docs.mdx';

const CHECKED_STATE_MAP: Record<string, boolean> = {
  'indeterminate': false,
  'unchecked': false,
  'checked': true
};

const CHECKED_STATE_TOGGLE_MAP: Record<string, string> = {
  'indeterminate': 'unchecked',
  'unchecked': 'checked',
  'checked': 'unchecked'
};

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true
};

export default {
  title: 'Components/Checkbox',
  parameters: {
    docs: {
      page: docsPage
    },
    controls: {
      exclude: [
        'Hidden Legend'
      ]
    }
  },
  args: {
    hiddenLegend: false,
    label: 'Label',
    hiddenLabel: false,
    checked: 'unchecked',
    disabled: false,
    validation: 'null'
  },
  argTypes: {
    hiddenLegend: {
      name: 'Hidden Legend',
      description: 'Render the group with or without a visible legend.',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    label: {
      name: 'Label',
      description: 'Describes the content/topic of the component.',
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
      }
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description: 'Renders the component with or without a visible label.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/story/foundations-accessibility--page#labels">label accessibility guide</a>.</span>',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    checked: {
      name: 'Checked',
      description: 'When set to `true`, places the component in the checked state.',
      control: {
        type: 'radio',
        labels: {
          'indeterminate': 'Indeterminate',
          'unchecked': 'Unchecked',
          'checked': 'Checked'
        }
      },
      options: [
        'indeterminate',
        'unchecked',
        'checked'
      ],
      table: {
        category: 'States'
      }
    },
    disabled: {
      name: 'Disabled',
      description: 'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-mini alert alert-info alert-sm">There are accessibility issues with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</span>',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'States'
      }
    },
    validation: {
      name: 'Validation',
      description: 'Controls the display of the component\'s validation state.',
      control: {
        type: 'radio',
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
    }
  }
} as Meta;

const Template = (args: Args, context: StoryContext<ReactFramework, Args>) => {
  const [_, updateArgs] = useArgs();

  const id = `ExampleCheckbox_${context.name}`;
  const classes = [
    'form-check-input',
    args.validation
  ].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const label: (JSX.Element | null) = !useAriaLabel ? <label key="label" htmlFor={ id } className="form-check-label">{ args.label }</label> : null;
  
  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? <p key="valid" className="valid-feedback">Ggranda sukceso!</p> : null,
    args.validation === 'is-invalid' ? <p key="invalid" className="invalid-feedback">Eraro okazis!</p> : null
  ];

  const control: JSX.Element = <input
    key="control"
    id={ id }
    className={ classes }
    type="checkbox"
    checked={ CHECKED_STATE_MAP[args.checked] }
    disabled={ args.disabled }
    aria-label={ useAriaLabel && args.label }
    aria-invalid={ VALIDATION_STATE_MAP[args.validation] }
    onChange={ () => updateArgs({ checked: CHECKED_STATE_TOGGLE_MAP[args.checked] }) }
  />;

  setTimeout(function () {
    const input: HTMLInputElement | null = document.querySelector('input.form-check-input');
    if (input !== null && args.checked === 'indeterminate') input.indeterminate = true;
  }, 0);

  return <div className="form-check">
    { [control, label, ...contextuals].filter(el => el !== null) }
  </div>;
};

export const Default: Story = Template.bind({});
Default.decorators = [
  (Story: Story) => <div className="pt-3">
    <Story/>
  </div>
];

const TemplateInline = (args: Args) => <fieldset>
  <legend className={ args.hiddenLegend ? 'visually-hidden' : undefined }>Legend</legend>
  <div key="FormCheck_1" className="form-check form-check-inline">
    <input id="ExampleCheckbox_Inline_1" className="form-check-input" type="checkbox"/>
    <label htmlFor="ExampleCheckbox_Inline_1" className="form-check-label">{ args.label }</label>
  </div>
  <div key="FormCheck_2" className="form-check form-check-inline">
    <input id="ExampleCheckbox_Inline_2" className="form-check-input" type="checkbox"/>
    <label htmlFor="ExampleCheckbox_Inline_2" className="form-check-label">{ args.label }</label>
  </div>
  <div key="FormCheck_3" className="form-check form-check-inline">
    <input id="ExampleCheckbox_Inline_3" className="form-check-input" type="checkbox"/>
    <label htmlFor="ExampleCheckbox_Inline_3" className="form-check-label">{ args.label }</label>
  </div>
  <div key="FormCheck_4" className="form-check form-check-inline">
    <input id="ExampleCheckbox_Inline_4" className="form-check-input" type="checkbox"/>
    <label htmlFor="ExampleCheckbox_Inline_4" className="form-check-label">{ args.label }</label>
  </div>
</fieldset>;

export const Inline: Story = TemplateInline.bind({});
Inline.decorators = [
  (Story: Story) => <div className="pt-3">
    <Story/>
  </div>
];
Inline.parameters = {
  controls: {
    exclude: [
      'Hidden Label',
      'Checked',
      'Disabled',
      'Validation'
    ]
  }
};

export const Validation: Story = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: [
      'Hidden Legend',
      'Hidden Label',
      'Label',
      'Checked',
      'Disabled'
    ]
  }
};
Validation.args = {
  validation: 'is-invalid'
};
