import React from 'react';
import { Meta, Args, Story } from "@storybook/react";
import docsPage from './select.docs.mdx';
import './select.styles.scss';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true
};

export default {
  title: 'Components/Select',
  parameters: {
    docs: {
      page: docsPage
    }
  },
  args: {
    label: 'Label',
    floatingLabel: false,
    hiddenLabel: false,
    size: 'null',
    options: 5,
    multiple: false,
    multipleSize: 4,
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
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
    floatingLabel: {
      name: 'Floating Label',
      description: 'Defines how the components label is rendered.',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description: '<p>Render the component with or without a visible label.</p><div className="alert alert-info alert-sm">There are accessibility issues with hidden labels.<br/>Please read our <a href="/?path=/story/foundations-accessibility--page#labels">labels accessibility guide</a>.</div>',
      if: {
        arg: 'floatingLabel',
        truthy: false
      },
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the component\'s appearance.',
      if: {
        arg: 'floatingLabel',
        truthy: false
      },
      control: {
        type: 'select',
        labels: {
          'form-select-sm': 'Small',
          'form-select-rg': 'Regular',
          'null': 'Medium',
          'form-select-lg': 'Large'
        }
      },
      options: [
        'form-select-sm',
        'form-select-rg',
        'null',
        'form-select-lg'
      ],
      table: {
        category: 'General'
      }
    },
    options: {
      name: 'Options',
      description: 'Amount of `option` elements to render in the component.',
      control: {
        type: 'number',
        min: 1,
        step: 1
      },
      table: {
        category: 'General'
      }
    },
    multiple: {
      name: 'Multiple',
      description: 'When set, allows multiple options to be selected (multi-select).',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    multipleSize: {
      name: 'Multiple Size',
      description: 'When set to a number larger than 0, will set the number of display option rows.<div className="text-danger">Note: not all browser will respect this setting.</div>',
      if: {
        arg: 'multiple'
      },
      control: {
        type: 'number',
        min: 0,
        max: 10,
        step: 1
      },
      table: {
        category: 'General'
      }
    },
    hint: {
      name: 'Helper Text',
      description: 'Text to place in the help text area of the component.',
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
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

const Template = (args: Args, story: Story) => {
  const id = `ExampleSelect-${story.name}`;
  const classes = [
    'form-select',
    args.size,
    args.validation
  ].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label = !useAriaLabel ? <label key="label" htmlFor={ id } className="form-label">{ args.label }</label> : null;

  const optionElements = Array
    .from({ length: args.options - 1 }, (_, i) => i + 2)
    .map((key: number) => <option key={ key } value={ `valoro_${key}` }>Opcion { key }</option>);
  const options = [<option key="default-option">Elektu opcion...</option>, ...optionElements];

  const select = <select
    key="control"
    id={ id }
    className={ classes }
    multiple= { args.multiple }
    size={ args.multipleSize }
    disabled={ args.disabled }
    aria-label={ useAriaLabel ? args.label : undefined }
    aria-invalid={ VALIDATION_STATE_MAP[args.validation] }
  >{ options }</select>;

  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? <p key="valid" className="valid-feedback">{ args.validFeedback }</p> : null,
    args.validation === 'is-invalid' ? <p key="invalid" className="invalid-feedback">{ args.invalidFeedback }</p> : null,
    args.hint !== '' ? <div key="hint" className="form-text">{ args.hint }</div> : null
  ].filter(el => el !== null);

  if (args.floatingLabel) {
    return <div className="form-floating">
      { select }
      { label }
      { contextuals }
    </div>;
  } else { 
    return [label, select, contextuals].filter(el => el !== null);
  }
};

export const Default = Template.bind({});

export const FloatingLabel = Template.bind({});
FloatingLabel.parameters = {
  controls: {
    exclude: [
      'Hidden Label',
      'Options',
      'Multiple',
      'Size',
      'Helper Text',
      'Disabled',
      'Validation',
      'Valid Feedback',
      'Invalid Feedback'
    ]
  }
};
FloatingLabel.args = {
  floatingLabel: true,
  hint: ''
};

export const Size = Template.bind({});
Size.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Hidden Label',
      'Options',
      'Multiple',
      'Helper Text',
      'Disabled',
      'Validation',
      'Valid Feedback',
      'Invalid Feedback'
    ]
  }
};
Size.args = {
  hint: ''
};

export const Validation = Template.bind({});
Validation.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Hidden Label',
      'Options',
      'Size',
      'Multiple',
      'Helper Text',
      'Disabled'
    ]
  }
};
Validation.args = {
  validation: 'is-invalid',
  hint: ''
};
