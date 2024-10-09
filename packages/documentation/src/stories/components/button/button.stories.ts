import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';
import { repeat } from 'lit/directives/repeat.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'eb78afcb-ce92-4990-94b6-6536d5ec6af4',
  title: 'Components/Button',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=16826-33449&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    text: 'Button',
    tag: 'button',
    type: 'button',
    variant: 'btn-primary',
    size: 'null',
    animated: 'btn-animated',
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
          'btn-link': 'Link (no padding)',
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
        'btn-link',
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
      description: 'Sets an animation on hover.',
      if: {
        arg: 'icon',
        eq: 'null',
      },
      control: {
        type: 'inline-radio',
        labels: {
          'null': 'None',
          'btn-animated': 'End',
          'btn-animated-start': 'Start',
        },
      },
      options: ['null', 'btn-animated', 'btn-animated-start'],
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      description:
        'Defines a custom icon.' +
        '<span className="mt-8 alert alert-info alert-sm">' +
        'To use a custom icon, you must first ' +
        '<a href="/?path=/docs/40ed323b-9c1a-42ab-91ed-15f97f214608--docs">set up the icons in your project</a>' +
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
        'When set to `true`, makes the component appear inactive and disables its functionality.<div className="mt-8 alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</div>',
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
    const isAnimated = args.tag !== 'input' && args.animated !== 'none';
    const props = createProps(args);

    if (args.tag === 'input') {
      return html` <${tagName} ${spread(props)} /> `;
    } else {
      const icon = html` <post-icon aria-hidden="true" name="${args.icon}"></post-icon> `;
      const iconOnlyContent = html` <span class="visually-hidden">${args.text}</span> `;
      const animatedContent = html` <span>${args.text}</span> `;
      const text = html` ${args.text} `;

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

function createProps(args: Args) {
  const additionalClasses = args.additionalClasses ?? [];
  return {
    class: [
      'btn',
      args.variant,
      args.size,
      args.animated,
      args.iconOnly && 'btn-icon',
      ...additionalClasses,
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
    (story: StoryFn, context: StoryContext) =>
      html` <div class="p-16 bg-dark">${story(context.args, context)}</div> `,
  ],
};

const VariantsTemplate = {
  parameters: {
    controls: {
      exclude: ['Text', 'Tag', 'Type', 'Variant', 'variants'],
    },
  },
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html` <div class="d-flex gap-small-r flex-wrap">${story(context.args, context)}</div> `,
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

export const SignalColors: Story = {
  ...VariantsTemplate,
  args: {
    variants: ['btn-success', 'btn-warning', 'btn-error', 'btn-info'],
  },
};

export const FullWidth: Story = {
  ...VariantsTemplate,
  args: {
    variants: ['btn-primary'],
    additionalClasses: ['w-sm-100', 'w-md-auto'],
  },
};

export const Align: Story = {
  render: () => html`
    <div class="d-flex flex-row-reverse gap-8 justify-content-end">
      <button class="btn btn-primary">Send</button>
      <button class="btn btn-secondary">Cancel</button>
    </div>
  `,
};
