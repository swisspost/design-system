import React from 'react';
import { Meta, Story, Args } from "@storybook/react";
import { useArgs } from '@storybook/client-api';
import docsPage from './checkbox.docs.mdx';
import './checkbox.styles.scss';

export default {
  title: 'Components/Checkbox',
  parameters: {
    docs: {
      page: docsPage
    }
  },
  args: {
    noLabel: false,
    label: 'Label',
    value: 'Valerus ipsus',
    checked: false,
    background: 'null',
    disabled: false,
    validation: 'null',
    validFeedback: 'Ggranda sukceso!',
    invalidFeedback: 'Eraro okazis!'
  },
  argTypes: {
    noLabel: {
      name: 'Without Label',
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
      if: {
        arg: 'noLabel',
        truthy: false
      },
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
      }
    },
    value: {
      name: 'Value',
      control: {
        type: 'text'
      },
      table: {
        category: 'General'
      }
    },
    checked: {
      name: 'Checked',
      control: {
        type: 'boolean'
      },
      table: {
        category: 'General'
      }
    },
    background: {
      name: 'Background',
      description: 'Defines a custom `background-color` with the background-utility',
      control: {
        type: 'select',
        labels: {
          'null': 'Default',
          'bg-primary': 'Primary',
          'bg-yellow': 'Yellow',
          'bg-white': 'White',
          'bg-light': 'Light',
          'bg-gray': 'Gray',
          'bg-black': 'Black',
          'bg-nightblue': 'Nightblue',
          'bg-nightblue-bright': 'Nightblue Bright',
          'bg-petrol': 'Petrol',
          'bg-petrol-bright': 'Petrol Bright',
          'bg-coral': 'Coral',
          'bg-coral-bright': 'Coral Bright',
          'bg-olive': 'Olive',
          'bg-olive-bright': 'Olive Bright',
          'bg-purple': 'Purple',
          'bg-purple-bright': 'Purple Bright',
          'bg-aubergine': 'Aubergine',
          'bg-aubergine-bright': 'Aubergine Bright',
          'bg-success': 'Success',
          'bg-warning': 'Warning',
          'bg-danger': 'Danger',
          'bg-info': 'Info'
        }
      },
      options: [
        'null',
        'bg-primary',
        'bg-yellow',
        'bg-white',
        'bg-light',
        'bg-gray',
        'bg-black',
        'bg-nightblue',
        'bg-nightblue-bright',
        'bg-petrol',
        'bg-petrol-bright',
        'bg-coral',
        'bg-coral-bright',
        'bg-olive',
        'bg-olive-bright',
        'bg-purple',
        'bg-purple-bright',
        'bg-aubergine',
        'bg-aubergine-bright',
        'bg-success',
        'bg-warning',
        'bg-danger',
        'bg-info'
      ],
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
};

function toggle (args: Args, updateArgs: Function) {
  updateArgs({ checked: !args.checked });
}

const Template = (args: Args, story: Story) => {
  const [_, updateArgs] = useArgs();

  const id = `ExampleCheckbox_${story.name}`;
  const classes = [
    'form-check-input',
    args.validation
  ].filter(c => c && c !== 'null').join(' ');
  
  const contextuals: (JSX.Element | null)[] = [
    args.validation === 'is-valid' ? <p key="valid" className="valid-feedback">{ args.validFeedback }</p> : null,
    args.validation === 'is-invalid' ? <p key="invalid" className="invalid-feedback">{ args.invalidFeedback }</p> : null
  ].filter(f => f !== null);

  return <div className="form-check">
    <input
      id={ id }
      className={ classes }
      type="checkbox"
      value={ args.value }
      checked={ args.checked }
      disabled={ args.disabled }
      aria-label={ args.noLabel ? args.label : undefined }
      onClick={ (e: React.MouseEvent) => toggle(args, updateArgs) }
    />
    { args.noLabel ? null : <label htmlFor={ id } className="form-check-label">{ args.label }</label> }
    { contextuals }
  </div>;
};

export const Default = Template.bind({}) as Meta;
Default.decorators = [
  (Story: Story, { args }) => <div className={ `p-4 pb-2 ${args.background}` }>
    <Story/>
  </div>
];
