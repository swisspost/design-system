import { MetaComponent } from '@root/types';
import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: MetaComponent = {
  id: '9109c4fc-4b25-4b0e-a38b-fab98a8f5828',
  title: 'Components/Button',
  component: 'post-button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=16826-33449&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  tags: ['package:WebComponents'],
  args: {
    'type': 'button',
    'variant': 'primary',
    'size': 'null',
    'animated': 'end',
    'icon': 'null',
    'iconOnly': false,
    'iconPosition': 'start',
    'disabled': false,
    'loading': false,
    'slots-default': 'Button',
  },
  argTypes: {
    'type': {
      name: 'Input type',
      description: 'Defines the input type.',
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
    'variant': {
      name: 'Variant',
      description: 'Defines a style variant.',
      control: {
        type: 'inline-radio',
        labels: {
          primary: 'Primary',
          secondary: 'Secondary',
          tertiary: 'Tertiary',
          // 'btn-success': 'Success',
          // 'btn-danger': 'Danger',
          // 'btn-warning': 'Warning',
          // 'btn-info': 'Info',
        },
      },
      options: [
        'primary',
        'secondary',
        'tertiary',
        // 'btn-success',
        // 'btn-danger',
        // 'btn-warning',
        // 'btn-info',
      ],
      table: {
        category: 'General',
      },
    },
    'size': {
      name: 'Size',
      description: 'Sets the size of the component.',
      control: {
        type: 'select',
        labels: {
          sm: 'Small',
          rg: 'Regular',
          null: 'Medium',
          lg: 'Large',
        },
      },
      options: ['sm', 'rg', 'null', 'lg'],
      table: {
        category: 'General',
      },
    },
    'animated': {
      name: 'Animated',
      description: 'Sets an animation on hover.',
      if: {
        arg: 'icon',
        eq: 'null',
      },
      control: {
        type: 'inline-radio',
        labels: {
          null: 'None',
          end: 'End',
          start: 'Start',
        },
      },
      options: ['null', 'end', 'start'],
      table: {
        category: 'General',
      },
    },
    'icon': {
      name: 'Icon',
      description:
        'Defines a custom icon.' +
        '<span className="mt-mini alert alert-info alert-sm">' +
        'To use a custom icon, you must first ' +
        '<a href="/?path=/docs/40ed323b-9c1a-42ab-91ed-15f97f214608--docs">set up the icons in your project</a>' +
        '.</span>',
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
    'iconOnly': {
      name: 'Icon only',
      description: "When set to `true`, hides the component's text.",
      if: {
        arg: 'icon',
        neq: 'null',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Icon',
      },
    },
    'iconPosition': {
      name: 'Icon position',
      description: 'Defines the icon position.',
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
    'disabled': {
      name: 'Disabled',
      description:
        'When set to `true`, makes the component appear inactive and disables its functionality.<div className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</div>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    'loading': {
      name: 'Loading',
      description:
        'When set to `true`, a loader appears at the current icon position and the button is disabled.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    'slots-default': {
      name: 'default',
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Template = {
  render: (args: Args) => {
    const additionalClasses = args.additionalClasses ?? [];

    return html`
      <post-button
        class="${additionalClasses.length === 0 ? nothing : additionalClasses.join(' ')}"
        variant="${args.variant === 'null' ? nothing : args.variant}"
        size="${args.size === 'null' ? nothing : args.size}"
        icon="${args.icon === 'null' ? nothing : args.icon}"
        type="${args.type === 'button' ? nothing : args.type}"
        animated="${(args.animated ?? 'null') === 'null' ? nothing : args.animated}"
        icon-only="${args.iconOnly || nothing}"
        icon-position="${args.iconPosition === 'start' ? nothing : args.iconPosition}"
        disabled="${args.disabled ? 'true' : nothing}"
        loading="${args.loading ? 'true' : nothing}"
        autofocus="${args.autofocus ? 'true' : nothing}"
        form="${args.form || nothing}"
        formaction="${args.formaction || nothing}"
        formenctype="${args.formenctype || nothing}"
        formmethod="${args.formmethod || nothing}"
        formnovalidate="${args.formnovalidate ? 'true' : nothing}"
        formtarget="${args.formtarget || nothing}"
        name="${args.name || nothing}"
        popovertarget="${args.popovertarget || nothing}"
        popovertargetaction="${args.popovertargetaction || nothing}"
        value="${args.value || nothing}"
        >${unsafeHTML(args['slots-default'])}</post-button
      >
    `;
  },
} satisfies Story;

export const Default: Story = {
  ...Template,
};

export const Inverted: Story = {
  ...Template,
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html` <div class="p-3 bg-dark">${story(context.args, context)}</div> `,
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
          'slots-default': `${variant.at(0)?.toUpperCase()}${variant.substring(1)}`,
          variant,
        }),
      )}
    `,
};

export const AccentColors: Story = {
  ...VariantsTemplate,
  args: {
    variants: [
      'nightblue',
      'nightblue-bright',
      'petrol',
      'petrol-bright',
      'coral',
      'coral-bright',
      'olive',
      'olive-bright',
      'purple',
      'purple-bright',
      'aubergine',
      'aubergine-bright',
    ],
  },
};

export const SignalColors: Story = {
  ...VariantsTemplate,
  args: {
    variants: ['success', 'warning', 'error', 'info'],
  },
};

export const FullWidth: Story = {
  ...VariantsTemplate,
  args: {
    variants: ['primary'],
    additionalClasses: ['w-sm-100', 'w-md-auto'],
  },
};

export const Align: Story = {
  render: () => html`
    <div class="d-flex flex-row-reverse gap-mini justify-content-end">
      <post-button variant="primary">Send</post-button>
      <post-button variant="secondary">Cancel</post-button>
    </div>
  `,
};
