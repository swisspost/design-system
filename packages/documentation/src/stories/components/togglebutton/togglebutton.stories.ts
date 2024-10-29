import { type Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { spread } from '@open-wc/lit-helpers';

export interface PostTogglebuttonProps {
  type?: 'button' | 'submit' | 'reset';
  toggled?: boolean;
  variant?: string;
  size?: string;
  contentWhenToggled?: string;
  contentWhenUntoggled?: string;
}

const meta: MetaComponent<PostTogglebuttonProps> = {
  id: '12345-abcde',
  title: 'Components/Toggle Button',
  tags: ['package:WebComponents'],
  component: 'post-togglebutton',
  parameters: {
    design: {},
  },
  args: {
    contentWhenToggled: 'Toggled',
    contentWhenUntoggled: 'Untoggled',
    type: 'button',
    variant: 'btn-primary',
    size: 'null',
  },
  argTypes: {
    toggled: {
      control: 'boolean',
      description: 'Defines whether the button is toggled or not.',
    },
    contentWhenToggled: {
      name: 'Toggled text',
      description: "Text within the button when it's toggled.",
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    contentWhenUntoggled: {
      name: 'Untoggled text',
      description: "Text within the button when it's untoggled.",
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    type: {
      name: 'Input type',
      description: 'Defines the input type.',
      if: {
        arg: 'tag',
        eq: 'input',
      },
      control: {
        type: 'inline-radio',
        labels: {
          button: 'Button',
          submit: 'Submit',
          reset: 'Reset',
        },
      },
      options: ['button', 'submit', 'reset'],
      table: {
        category: 'General',
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the component.',
      control: {
        type: 'select',
        labels: {
          'btn-sm': 'Small',
          'btn-rg': 'Regular',
          'null': 'Medium',
          'btn-lg': 'Large',
        },
      },
      options: ['btn-sm', 'btn-rg', 'null', 'btn-lg'],
      table: {
        category: 'General',
      },
    },
    variant: {
      name: 'Variant',
      description:
        'Defines a style variant.' +
        '<span className="mt-8 alert alert-info alert-sm">' +
        'For more options, please see the ' +
        '<a href="/?path=/docs/eb78afcb-ce92-4990-94b6-6536d5ec6af4--docs">button component</a>' +
        '.</span>',
      control: {
        type: 'inline-radio',
        labels: {
          'btn-primary': 'Primary',
          'btn-secondary': 'Secondary',
          'btn-tertiary': 'Tertiary',
          // 'btn-success': 'Success',
          // 'btn-danger': 'Danger',
          // 'btn-warning': 'Warning',
          // 'btn-info': 'Info',
        },
      },
      options: [
        'btn-primary',
        'btn-secondary',
        'btn-tertiary',
        // 'btn-success',
        // 'btn-danger',
        // 'btn-warning',
        // 'btn-info',
      ],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

const Template: StoryObj<PostTogglebuttonProps> = {
  render: (args: Args) => {
    return html`
      <post-togglebutton ${spread(createProps(args))}>
        <span slot="untoggled">${args.contentWhenUntoggled}</span>
        <span slot="toggled">${args.contentWhenToggled}</span>
      </post-togglebutton>
    `;
  },
};

function createProps(args: Args) {
  return {
    class: ['btn', args.variant, args.size].filter(c => c && c !== 'null').join(' '),
    type: args.type,
    toggled: args.toggled,
  };
}

export const Default: StoryObj<PostTogglebuttonProps> = {
  ...Template,
};

export const InitiallyToggled: StoryObj<PostTogglebuttonProps> = {
  ...Template,
  args: {
    ...Default.args,
    toggled: true,
  },
};
