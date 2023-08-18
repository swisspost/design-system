import { Meta, Args, Story } from '@storybook/react';
import docsPage from './button.docs.mdx';
import { forEach } from '../../../utils/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    text: 'Button',
    tag: 'button',
    type: 'button',
    variant: 'btn-primary',
    size: 'null',
    animated: true,
    icon: 'null',
    iconOnly: false,
    iconPosition: 'start',
    disabled: false,
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'Text within the button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    tag: {
      name: 'Tag',
      description: 'Defines the components HTML-tag.',
      control: {
        type: 'inline-radio',
        labels: {
          button: 'Button',
          a: 'Link',
          input: 'Input',
        },
      },
      options: ['button', 'a', 'input'],
      table: {
        category: 'General',
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
    variant: {
      name: 'Variant',
      description: 'Defines a style variant.',
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
    animated: {
      name: 'Animated',
      description: "When set to `true`, enables the component's animations.",
      if: {
        arg: 'icon',
        eq: 'null',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      description: 'Defines a custom icon.',
      if: {
        arg: 'tag',
        neq: 'input',
      },
      control: {
        type: 'select',
        labels: {
          'null': 'None',
          'pi-2069': 'Search (2069)',
          'pi-3193': 'Edit (3193)',
          'pi-2059': 'Save (2059)',
          'pi-2015': 'Remove (2015)',
          'pi-2286': 'Like (2286)',
        },
      },
      options: ['null', 'pi-2069', 'pi-3193', 'pi-2059', 'pi-2015', 'pi-2286'],
      table: {
        category: 'Icon',
      },
    },
    iconOnly: {
      name: 'Icon only',
      description: "When set to `true`, hides the component's text.",
      if: {
        arg: 'tag',
        neq: 'input',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Icon',
      },
    },
    iconPosition: {
      name: 'Icon position',
      description: 'Defines the icon position.',
      if: {
        arg: 'tag',
        neq: 'input',
      },
      control: {
        type: 'inline-radio',
        labels: {
          start: 'Start',
          end: 'End',
        },
      },
      options: ['start', 'end'],
      table: {
        category: 'Icon',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<div className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--page#disabled-state">disabled state accessibility guide</a>.</div>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
  },
} as Meta;

const Template = (args: Args) => {
  const props = {
    key: args.key,
    href: args.tag === 'a' ? 'javascript:void' : undefined,
    type: args.tag === 'input' ? args.type : undefined,
    value: args.tag === 'input' ? args.text : undefined,
  };

  const isAnimated = args.tag !== 'input' && args.animated;

  const classes = [
    'btn',
    args.variant,
    args.size,
    isAnimated && 'btn-animated',
    args.iconOnly && 'btn-icon',
  ]
    .filter(c => c && c !== 'null')
    .join(' ');

  if (args.tag === 'input') {
    return <args.tag {...props} className={classes} disabled={args.disabled} />;
  } else {
    const icon =
      args.icon !== 'null' ? <span aria-hidden="true" className={`pi ${args.icon}`}></span> : null;
    const content = isAnimated ? <span>{args.text}</span> : args.text;

    return (
      <args.tag {...props} className={classes} disabled={args.disabled}>
        {args.iconPosition === 'start' && icon}
        {args.iconOnly ? <span className="visually-hidden">{args.text}</span> : content}
        {args.iconPosition === 'end' && icon}
      </args.tag>
    );
  }
};

export const Default: Story = Template.bind({});

export const Inverted: Story = Template.bind({});
Inverted.decorators = [
  (Story: Story) => {
    return (
      <div className="p-3 bg-dark">
        <Story />
      </div>
    );
  },
];
Inverted.parameters = {
  controls: {
    exclude: ['Text', 'Tag', 'Type', 'Variant'],
  },
};

const AccentTemplate = (args: Args) => {
  return (
    <div className="d-flex gap-small-r flex-wrap">
      {forEach(
        [
          'btn-nightblue',
          'btn-nightblue-bright',
          'btn-petrol',
          'btn-petrol-bright',
          'btn-coral',
          'btn-coral-bright',
          'btn-olive',
          'btn-olive-bright',
          'btn-purple',
          'btn-purple-bright',
          'btn-aubergine',
          'btn-aubergine-bright',
        ],
        (data: { key: number; value: any }) =>
          Template({
            ...args,
            key: data.key,
            text: data.value.replace(/^btn-(.)/g, (_m: string, g: string) => g.toUpperCase()),
            variant: data.value,
          }),
      )}
    </div>
  );
};

export const AccentColors: Story = AccentTemplate.bind({});
AccentColors.parameters = {
  controls: {
    exclude: ['Text', 'Tag', 'Type', 'Variant'],
  },
};

const ContextualTemplate = (args: Args) => {
  return (
    <div className="d-flex gap-small-r flex-wrap">
      {forEach(
        ['btn-success', 'btn-info', 'btn-warning', 'btn-danger'],
        (data: { key: number; value: any }) =>
          Template({
            ...args,
            key: data.key,
            text: data.value.replace(/^btn-(.)/g, (_m: string, g: string) => g.toUpperCase()),
            variant: data.value,
          }),
      )}
    </div>
  );
};

export const ContextualColors: Story = ContextualTemplate.bind({});
ContextualColors.parameters = {
  controls: {
    exclude: ['Text', 'Tag', 'Type', 'Variant'],
  },
};
