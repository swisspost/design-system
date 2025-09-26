import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';
import { repeat } from 'lit/directives/repeat.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'eb78afcb-ce92-4990-94b6-6536d5ec6af4',
  title: 'Components/Button',
  tags: ['package:Styles'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=302-9575&m=dev',
    },
  },
  args: {
    text: 'Button',
    tag: 'button',
    type: 'button',
    variant: 'btn-primary',
    size: 'null',
    iconPosition: 'iconBeforeText',
    icon: 'search',
    secondIcon: 'search',
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
          'btn-tertiary px-0': 'Tertiary (no padding)',
          'btn-link': 'Link',
        },
      },
      options: ['btn-primary', 'btn-secondary', 'btn-tertiary', 'btn-tertiary px-0', 'btn-link'],
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
          'null': 'Medium',
          'btn-lg': 'Large',
        },
      },
      options: ['btn-sm', 'null', 'btn-lg'],
      table: {
        category: 'General',
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
          textOnly: 'Text only',
          iconOnly: 'Icon only',
          iconBeforeText: 'Icon before text',
          iconAfterText: 'Icon after text',
          iconBothSides: 'Icon on both sides',
        },
      },
      options: ['textOnly', 'iconOnly', 'iconBeforeText', 'iconAfterText', 'iconBothSides'],
      table: {
        category: 'Icon',
      },
    },
    icon: {
      name: 'Icon',
      description:
        'Defines a custom icon.' +
        '<post-banner data-size="sm"><p>' +
        '<span>To use a custom icon, you must first ' +
        '<a href="/?path=/docs/40ed323b-9c1a-42ab-91ed-15f97f214608--docs">set up the icons in your project</a>' +
        '.</span></p></post-banner>',
      if: {
        arg: 'tag',
        neq: 'input',
      },
      control: {
        type: 'select',
        labels: {
          'null': 'None',
          'search': 'Search',
          'edit': 'Edit',
          'save': 'Save',
          'trash': 'Remove',
          'heart': 'Like',
        },
      },
      options: ['null', 'search', 'edit', 'save', 'trash', 'heart'],
      table: {
        category: 'Icon',
      },
    },
    secondIcon: {
      name: 'Second icon',
      description: 'Defines a custom second icon',
      if: {
        arg: 'iconPosition',
        eq: 'iconBothSides',
      },
      control: {
        type: 'select',
        labels: {
          'null': 'None',
          'search': 'Search',
          'edit': 'Edit',
          'save': 'Save',
          'trash': 'Remove',
          'heart': 'Like',
        },
      },
      options: ['null', 'search', 'edit', 'save', 'trash', 'heart'],
      table: {
        category: 'Icon',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, makes the component appear inactive and disables its functionality.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
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
    const props = createProps(args);
    if (args.tag === 'input') {
      return html` <${tagName} ${spread(props)} /> `;
    } else {
      const icon = html` <post-icon aria-hidden="true" name="${args.icon}"></post-icon> `;
      const secondIcon = html`
        <post-icon aria-hidden="true" name="${args.secondIcon}"></post-icon>
      `;
      const iconOnlyContent = html` <span class="visually-hidden">${args.text}</span> `;
      const text = html` ${args.text} `;

      return html`
        <${tagName} ${spread(props)}>
          ${
            args.icon !== 'null' &&
            (args.iconPosition === 'iconOnly' ||
              args.iconPosition === 'iconBeforeText' ||
              args.iconPosition === 'iconBothSides')
              ? icon
              : null
          }
          ${(args.iconPosition === 'iconOnly' && iconOnlyContent) || text}
          ${args.icon !== 'null' && args.iconPosition === 'iconAfterText' ? icon : null}
          ${args.secondIcon !== 'null' && args.iconPosition === 'iconBothSides' ? secondIcon : null}
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
      args.iconPosition === 'iconOnly' && 'btn-icon',
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

const VariantsTemplate = {
  parameters: {
    controls: {
      exclude: ['Text', 'Tag', 'Type', 'Variant', 'variants'],
    },
  },
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html` <div class="d-flex gap-12 flex-wrap">${story(context.args, context)}</div> `,
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

export const FullWidth: Story = {
  ...VariantsTemplate,
  args: {
    variants: ['btn-primary'],
    additionalClasses: ['w-sm-full', 'w-md-auto'],
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
