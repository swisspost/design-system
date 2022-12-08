import React from 'react';
import { Meta, Args, Story } from "@storybook/react";
import docsPage from './select.docs.mdx';
import './select.styles.scss';

interface ISelectOption {
  text: string,
  label: string,
  value?: string | number,
  selected?: boolean,
  disabled?: boolean
};

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
    options: [
      { text: 'Elektu opcion...' },
      { text: 'Opcion 1', value: 1 },
      { text: 'Opcion 2', value: 2 },
      { text: 'Opcion 3', value: 3 },
      { text: 'Opcion 4', value: 4 },
      { text: 'Opcion 5', value: 5 },
    ] as ISelectOption[],
    floatingLabel: false,
    size: 'null',
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
    options: {
      name: 'Options',
      description: `Array of items to render in the component.<br>Single option example:<div><code>{<br/>&nbsp;&nbsp;text: string,<br/>&nbsp;&nbsp;label: string,<br/>&nbsp;&nbsp;value?: string | number,<br/>&nbsp;&nbsp;selected?: boolean,<br/>&nbsp;&nbsp;disabled?: boolean<br/>}</code></div>`,
      control: {
        type: 'object',
        raw: false
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

const Template = (args: Args, story: Story) => {
  const id = `ExampleSelect-${story.name}`;
  const classes = [
    'form-select',
    args.size,
    args.validation
  ].filter(c => c && c !== 'null').join(' ');

  const options = args.options.map((option: ISelectOption, index: number) => <option key={ option.value ?? index } label={ option.label } value={ option.value } selected={ option.selected } disabled={ option.disabled }>{ option.text }</option>);

  const select = <select
    key="key"
    id={ id }
    className={ classes }
    multiple= { args.multiple }
    size={ args.multipleSize }
    disabled={ args.disabled }
    aria-label={ args.label }
    aria-invalid={ VALIDATION_STATE_MAP[args.validation] }
  >{ options }</select>;

  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? <p key="valid" className="valid-feedback">{ args.validFeedback }</p> : null,
    args.validation === 'is-invalid' ? <p key="invalid" className="invalid-feedback">{ args.invalidFeedback }</p> : null,
    args.hint !== '' ? <div key="hint" className="form-text">{ args.hint }</div> : null
  ].filter(f => f !== null);

  if (args.floatingLabel) {
    return <div className="form-floating">
      { select }
      <label htmlFor={ id } className="form-label">{ args.label }</label>
      { contextuals }
    </div>;
  } else { 
    return [select, contextuals];
  }
};

export const Default = Template.bind({});

export const FloatingLabel = Template.bind({});
FloatingLabel.parameters = {
  controls: {
    exclude: [
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
      'Options',
      'Floating Label',
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
      'Options',
      'Floating Label',
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
