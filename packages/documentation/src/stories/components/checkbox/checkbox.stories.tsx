import React from 'react';
import { Meta, Args, Story } from "@storybook/react";
import { useArgs } from '@storybook/client-api';
import docsPage from './checkbox.docs.mdx';
import './checkbox.styles.scss';

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
    }
  },
  args: {
    label: 'Label',
    hiddenLabel: false,
    checked: 'unchecked',
    disabled: false,
    validation: 'null',
    validFeedback: 'Ggranda sukceso!',
    invalidFeedback: 'Eraro okazis!'
  },
  argTypes: {
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
        type: 'select',
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
      description: 'When set to `true`, disables the component\'s functionality and places it in a disabled state.',
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
  updateArgs({ checked: CHECKED_STATE_TOGGLE_MAP[args.checked] });
}

const Template = (args: Args, story: Story) => {
  const [_, updateArgs] = useArgs();

  const id = `ExampleCheckbox_${story.name}`;
  const classes = [
    'form-check-input',
    args.validation
  ].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const label = !useAriaLabel ? <label key="label" htmlFor={ id } className="form-check-label">{ args.label }</label> : null;
  
  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? <p key="valid" className="valid-feedback">{ args.validFeedback }</p> : null,
    args.validation === 'is-invalid' ? <p key="invalid" className="invalid-feedback">{ args.invalidFeedback }</p> : null
  ];

  const control = <input
    key="control"
    id={ id }
    className={ classes }
    type="checkbox"
    checked={ CHECKED_STATE_MAP[args.checked] }
    disabled={ args.disabled }
    aria-label={ useAriaLabel ? args.label : undefined }
    aria-invalid={ VALIDATION_STATE_MAP[args.validation] }
    onChange={ (e: React.ChangeEvent) => toggle(args, updateArgs) }
  />;

  if (args.checked === 'indeterminate') {
    setTimeout(function () {
      const input: HTMLInputElement | null = document.querySelector('input.form-check-input');
      if (input !== null) input.indeterminate = true;
    }, 0);
  }

  return <div className="form-check">
    { [control, label, ...contextuals].filter(el => el !== null) }
  </div>;
};

export const Default = Template.bind({});
Default.decorators = [
  (Story: Story) => <div className="p-3 pb-0">
    <Story/>
  </div>
];

const TemplateInline = (args: Args) => <fieldset>
  <legend className="visually-hidden">Legend</legend>
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

export const Inline = TemplateInline.bind({});
Inline.decorators = [
  (Story: Story) => <div className="p-3 pb-0">
    <Story/>
  </div>
];
Inline.parameters = {
  controls: {
    exclude: [
      'Label hidden',
      'Value',
      'State',
      'Disabled',
      'Validation',
      'Valid Feedback',
      'Invalid Feedback'
    ]
  }
};

export const Validation = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: [
      'Label',
      'Value',
      'State',
      'Background',
      'Disabled'
    ]
  }
};
Validation.args = {
  validation: 'is-invalid'
};
