import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Args, Story } from '@storybook/react';
import React from 'react';
import docsPage from './button-group.docs.mdx';

export default {
  title: 'Components/Button Group',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    size: '',
    element: 'button',
    label_1: 'Left',
    label_2: 'Middle',
    label_3: 'Right',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: "Sets the size of the button group.",
      control: {
        type: 'select',
        labels: {
          ' btn-sm': 'Small',
          ' btn-rg': 'Regular',
          ' btn-md': 'Medium',
          ' btn-lg': 'Large',
        },
      },
      options: [' btn-sm', ' btn-rg', ' btn-md', ' btn-lg'],
      table: {
        category: 'General'
      }
    },
    element: {
      name: 'Variant',
      description: "Defined the semantic elements used as button within the group.",
      control: {
        type: 'radio',
        labels: {
          button: 'Buttons',
          link: 'Links',
          checkbox: 'Checkboxes',
          radio: 'Radio Buttons',
        },
      },
      options: ['button', 'link', 'checkbox', 'radio'],
      table: {
        category: 'General'
      }
    },
    label_1: {
      name: 'First Label',
      description: 'Defines the label of the first button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content'
      }
    },
    label_2: {
      name: 'Second Label',
      description: 'Defines the label of the second button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content'
      }
    },
    label_3: {
      name: 'Third Label',
      description: 'Defines the label of the third button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content'
      }
    },
    checked: {
      name: 'Checked Button',
      description: "Defined which button is checked in a radio button group.",
      if: {
        arg: 'element',
        eq: 'radio',
      },
      control: {
        type: 'inline-radio',
        labels: {
          1: 'First',
          2: 'Second',
          3: 'Third',
        },
      },
      options: [1, 2, 3],
      table: {
        category: 'Value'
      }
    },
    selected: {
      name: 'Selected Button',
      description: "Defined which button is selected in a checkbox group.",
      if: {
        arg: 'element',
        eq: 'checkbox',
      },
      control: {
        type: 'inline-check',
        labels: {
          1: 'First',
          2: 'Second',
          3: 'Third',
        },
      },
      options: [1, 2, 3],
      table: {
        category: 'Value'
      }
    },
  },
} as Meta;

const ButtonTemplate = (args: Args, index: number) => {
  const position = index + 1;
  const label = args[`label_${position}`];
  switch (args.element) {
    case 'checkbox': {
      const isSelected = args.selected?.includes(position);
      return [
        <input type="checkbox" className="btn-check" id={`btncheck${position}`} autoComplete="off" defaultChecked={isSelected} key={`check${position}`} />,
        <label className={`btn${args.size} btn-secondary`} htmlFor={`btncheck${position}`} key={`checklabel${position}`}>{label}</label>,
      ];
    }
    case 'radio': {
      const isChecked = position === args.checked;
      return [
        <input type="radio" className="btn-check" name="btnradio" id={`btnradio${position}`} autoComplete="off" defaultChecked={isChecked} key={`radio${position}`} />,
        <label className={`btn${args.size} btn-secondary`} htmlFor={`btnradio${position}`} key={`radiolabel${position}`}>{label}</label>
      ];
    }
    case 'link':
      return <a href="#" className={`btn${args.size} btn-secondary`}>{label}</a>;
    case 'button':
    default:
      return <button type="button" className={`btn${args.size} btn-secondary`}>{label}</button>;
  }
};

const Template = (args: Args) => (
  <div className="btn-group" role="group" aria-label="Button group example">
    {Array.from({length: 3}).map((_, i) => ButtonTemplate(args, i))}
  </div>
);

export const Default: Story = Template.bind({});

export const Sizing: Story = Template.bind({});
Sizing.parameters = {
  controls: {
    exclude: ['Variant', 'First Label', 'Second Label', 'Third Label', 'Checked Button', 'Selected Button'],
  },
};
Sizing.args = {
  size: ' btn-sm'
};

export const Checks: Story = Template.bind({});
Checks.storyName = 'Checkbox & Radio';
Checks.parameters = {
  controls: {
    exclude: ['Size', 'First Label', 'Second Label', 'Third Label'],
  },
};
Checks.args = {
  element: 'checkbox',
  selected: [1, 3],
  checked: 2
};
