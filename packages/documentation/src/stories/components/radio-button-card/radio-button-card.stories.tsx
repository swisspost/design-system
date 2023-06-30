import { Meta, Args, Story } from '@storybook/react';
import docsPage from './radio-button-card.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/Radio Button Card',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    label: 'Card check text',
    type: 'radio',
    checked: false,
    disabled: false,
    validation: 'null',
    showDescription: false,
    description: 'A small description',
    icon: 1000,
    showIcon: false,
  },
  argTypes: {
    label: {
      name: 'Label',
      type: 'string',
      description: 'The main label of the input',
      table: {
        category: 'General',
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'radio',
        labels: {
          radio: 'Radio button',
          checkbox: 'Checkbox',
        },
      },
      options: ['radio', 'checkbox'],
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked',
      type: 'boolean',
      description: 'When set to `true`, places the component in the checked state.',
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
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
    showDescription: {
      name: 'Show description',
      type: 'boolean',
      description: 'Toggles an additional description',
      table: {
        category: 'Description',
      },
    },
    description: {
      name: 'Description',
      type: 'string',
      description: 'A short additional description',
      table: {
        category: 'Description',
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'select',
      },
      options: [1000, 1001, 2000],
      table: {
        category: 'Icon',
      },
    },
    showIcon: {
      name: 'Show icon',
      type: 'boolean',
      description: 'Show or hide icon',
      table: {
        category: 'Icon',
      },
    },
  },
} as Meta;

const Template = (args: Args) => {
  const [_, updateArgs] = useArgs();
  const inputClasses = ['form-check-input', args.validation].filter(c => c !== 'null').join(' ');
  return (
    <div className="radio-button-card">
      <input
        id="radio-button-card-1"
        className={inputClasses}
        type={args.type}
        name="radio-button-card"
        disabled={args.disabled}
        checked={args.checked}
        onChange={() => {
          updateArgs({ checked: !args.checked });
        }}
        aria-labelledby={`radio-button-card-label-1${
          args.showDescription ? ' radio-button-card-description-1' : ''
        }`}
      />
      <label
        id="radio-button-card-label-1"
        htmlFor="radio-button-card-1"
        className="form-check-label"
      >
        {args.label}
      </label>
      {args.showIcon && <post-icon name={args.icon} aria-hidden="true"></post-icon>}
      {args.showDescription && (
        <label
          id="radio-button-card-description-1"
          htmlFor="radio-button-card-1"
          className="radio-button-card--description font-size-12"
        >
          {args.description}
        </label>
      )}
    </div>
  );
};

export const Default: Story = Template.bind({});
