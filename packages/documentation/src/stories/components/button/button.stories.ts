import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';
import { repeat } from 'lit/directives/repeat.js';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

const meta: Meta = {
  title: 'Components/Button',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=10576-49992&mode=design&t=OK8meBHjpJvBhwZI-4',
    },
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
      description: 'Defines the HTML element used for the component.',
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
      description: 'When set to `true`, the component animates on hover.',
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
      description: 'Defines a custom icon.' +
        '<span className="mt-mini alert alert-info alert-sm">' +
        'To use a custom icon, you must first ' +
        '<a href="/?path=/docs/icons-getting-started--docs">set up the icons in your project</a>' +
        '.</span>',
      if: {
        arg: 'tag',
        neq: 'input',
      },
      control: {
        type: 'select',
        labels: {
          'null': 'None',
          '2069': 'Search (2069)',
          '3193': 'Edit (3193)',
          '2059': 'Save (2059)',
          '2015': 'Remove (2015)',
          '2286': 'Like (2286)',
        },
      },
      options: ['null', '2069', '3193', '2059', '2015', '2286'],
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
        'When set to `true`, makes the component appear inactive and disables its functionality.<div className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/foundations-accessibility--docs#disabled-state">disabled state accessibility guide</a>.</div>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const Template = {
  render: (args: Args) => {
    const tagName = unsafeStatic(args.tag);
    const isAnimated = args.tag !== 'input' && args.animated;
    const props = createProps(args, isAnimated);

    if (args.tag === 'input') {
      return html`
        <${tagName} ${spread(props)} />
      `;
    } else {
      const icon = html`
        <post-icon aria-hidden="true" name=${args.icon}/>
      `;
      const iconOnlyContent = html`
        <span class="visually-hidden">${args.text}</span>
      `;
      const animatedContent = html`
        <span>${args.text}</span>
      `;
      const text = html`
        ${args.text}
      `;

      return html`
        <${tagName} ${spread(props)}>
          ${args.icon !== 'null' && args.iconPosition === 'start' ? icon : null}
          ${(args.iconOnly && iconOnlyContent) || (isAnimated && animatedContent) || text}
          ${args.icon !== 'null' && args.iconPosition === 'end' ? icon : null}
        </${tagName}>
      `;
    }
  },
};

function createProps(args: Args, isAnimated: boolean) {
  return {
    class: [
      'btn',
      args.variant,
      args.size,
      isAnimated && 'btn-animated',
      args.iconOnly && 'btn-icon',
    ]
      .filter(c => c && c !== 'null')
      .join(' '),
    href: args.tag === 'a' ? '#' : null,
    type: args.tag === 'input' ? args.type : null,
    value: args.tag === 'input' ? args.text : null,
    disabled: args.disabled ? args.disabled : null,
  };
}

export const Default: Story = {
  ...Template,
};

export const Inverted: Story = {
  ...Template,
  decorators: [
    (story: Function) => html`
      <div class="p-3 bg-dark">${story()}</div>
    `,
  ],
};

const VariantsTemplate = {
  parameters: {
    controls: {
      exclude: ['Text', 'Tag', 'Type', 'Variant', 'variants'],
    },
  },
  decorators: [
    (story: Function) =>
      html`
        <div class="d-flex gap-small-r flex-wrap">${story()}</div>
      `,
  ],
  render: (args: Args) =>
    html`
      ${repeat(args.variants, (variant: string) =>
        Template.render({
          ...args,
          text: variant.replace(/^btn-(.)/g, (_m: string, g: string) => g.toUpperCase()),
          variant,
        }),
      )}
    `,
};

export const AccentColors: Story = {
  ...VariantsTemplate,
  args: {
    variants: [
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
  },
};

export const ContextualColors: Story = {
  ...VariantsTemplate,
  args: {
    variants: ['btn-success', 'btn-info', 'btn-warning', 'btn-danger'],
  },
};
