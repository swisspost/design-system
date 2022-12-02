import React from 'react';
import { Meta, Args, Story } from '@storybook/react';
import docsPage from './textarea.docs.mdx';
import './textarea.styles.scss';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true
};

export default {
  title: 'Components/Textarea',
  parameters: {
    docs: {
      page: docsPage
    }
  },
  args: {
    label: 'Label',
    floatingLabel: false,
    size: 'null',
    rows: 4,
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
          'form-control-sm': 'Small',
          'form-control-rg': 'Regular',
          'null': 'Middle',
          'form-control-lg': 'Large'
        }
      },
      options: [
        'form-control-sm',
        'form-control-rg',
        'null',
        'form-control-lg'
      ],
      table: {
        category: 'General'
      }
    },
    rows: {
      name: 'Rows',
      control: {
        type: 'number',
        min: 3,
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
  const id = `ExampleTextarea_${story.name}`;
  const classes = [
    'form-control',
    args.size,
    args.validation
  ].filter(c => c && c !== 'null').join(' ');

  const component = <textarea
    id={ id }
    className={ classes }
    placeholder=" "
    rows={ args.rows }
    disabled={ args.disabled }
    aria-label={ args.label }
    aria-invalid={ VALIDATION_STATE_MAP[args.validation] }
  ></textarea>;

  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? <p key="valid" className="valid-feedback">{ args.validFeedback }</p> : null,
    args.validation === 'is-invalid' ? <p key="invalid" className="invalid-feedback">{ args.invalidFeedback }</p> : null,
    args.hint !== '' ? <div key="hint" className="form-text">{ args.hint }</div> : null
  ].filter(f => f !== null);

  if (args.floatingLabel) {
    return <div className="form-floating">
      { component }
      <label htmlFor={ id } className="form-label">{ args.label }</label>
      { contextuals }
    </div>;
  } else { 
    return [component, contextuals];
  }
};

export const Default = Template.bind({}) as Meta;

export const FloatingLabel = Template.bind({}) as Meta;
FloatingLabel.parameters = {
  controls: {
    exclude: [
      'Size',
      'Rows',
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

export const Size = Template.bind({}) as Meta;
Size.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Rows',
      'Helper Text',
      'Disabled',
      'Validation',
      'Valid Feedback',
      'Invalid Feedback'
    ]
  }
};
Size.args = {
  size: 'form-control-sm',
  hint: ''
};

export const Rows = Template.bind({}) as Meta;
Rows.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Size',
      'Helper Text',
      'Disabled',
      'Validation',
      'Valid Feedback',
      'Invalid Feedback'
    ]
  }
};
Rows.args = {
  rows: 8,
  hint: ''
};

export const HelperText = Template.bind({}) as Meta;
HelperText.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Size',
      'Rows',
      'Disabled',
      'Validation',
      'Valid Feedback',
      'Invalid Feedback'
    ]
  }
};

export const Disabled = Template.bind({}) as Meta;
Disabled.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Size',
      'Rows',
      'Helper Text',
      'Validation',
      'Valid Feedback',
      'Invalid Feedback'
    ]
  }
};
Disabled.args = {
  disabled: true,
  hint: ''
};

export const Validation = Template.bind({}) as Meta;
Validation.parameters = {
  controls: {
    exclude: [
      'Label',
      'Floating Label',
      'Size',
      'Rows',
      'Helper Text',
      'Disabled'
    ]
  }
};
Validation.args = {
  validation: 'is-invalid',
  hint: ''
};
