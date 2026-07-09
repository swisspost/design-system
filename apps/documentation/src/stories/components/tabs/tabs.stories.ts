import { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<
  HTMLPostTabsElement & {
    'variant': string;
    'activeTab'?: string;
    'postChange': string;
    'post-tabs-content'?: string;
    'post-tabs'?: string;
    'slots-default'?: string;
    'slots-panels'?: string;
  }
> = {
  id: 'bb1291ca-4dbb-450c-a15f-596836d9f39e',
  title: 'Components/Tabs',
  tags: ['package:WebComponents'],
  component: 'post-tabs',
  render: renderTabs,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-V2?node-id=33280-33494',
    },
    controls: {
      exclude: ['postChange', 'show', 'post-tabs-content', 'post-tabs'],
    },
  },
  argTypes: {
    'variant': {
      name: 'variant',
      description:
        'Select between Content Tabs (panels) or Page Tabs variant (navigation links). <post-banner data-size="sm"><p>If you attempt to mix modes (panels + links), the component will throw an error.</p></post-banner>',
      control: 'radio',
      options: ['Content Tabs', 'Page Tabs'],
      table: {
        category: 'Component Variant',
      },
    },
    'activeTab': {
      control: false,
      if: { arg: 'variant', eq: 'Content Tabs' },
      table: {
        type: { summary: 'string' },
      },
    },
    'postChange': {
      name: 'postChange ',
      control: false,
      description:
        'An event emitted after the active tab changes, when the fade in transition of its associated panel is finished. The payload is the name of the newly active tab.',
      if: { arg: 'variant', eq: 'Content Tabs' },
      table: {
        category: 'Events',
        type: {
          summary: 'CustomEvent<string>',
        },
      },
    },
    'post-tabs-content': {
      name: 'post-tabs-content ', // trailing space is intentional to avoid conflict with auto-generated part
      control: false,
      description: 'The container element that displays the content of the currently active tab.',
      if: { arg: 'variant', eq: 'Content Tabs' },
      table: {
        category: 'CSS Shadow Parts',
        type: {
          summary: 'CSS Selector',
        },
      },
    },
    'post-tabs': {
      name: 'post-tabs ',
      control: false,
      description: 'The container element that holds the set of tabs.',
      table: {
        category: 'CSS Shadow Parts',
        type: {
          summary: 'CSS Selector',
        },
      },
    },
    'show': {
      name: 'show ',
      control: false,
      description:
        'Shows the panel with the given name and selects its associated tab. Any other panel that was previously shown becomes hidden and its associated tab is unselected.',
      if: { arg: 'variant', eq: 'Content Tabs' },
      table: {
        category: 'Methods',
        type: {
          summary: '(tabName: string) => Promise<void>',
        },
      },
    },
    'slots-default': {
      name: 'default',
      description: 'Slot for placing tab items.',
      control: {
        type: 'text',
        disable: true,
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'other',
        },
      },
    },
    'slots-panels': {
      name: 'panels',
      description: 'Slot for placing tab panels.',
      control: {
        type: 'text',
        disable: true,
      },
      if: { arg: 'variant', eq: 'Content Tabs' },
      table: {
        category: 'Slots',
        type: {
          summary: 'other',
        },
      },
    },
    'textPrevTabItems': {
      name: 'text-prev-tab-items',

      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    'textNextTabItems': {
      name: 'text-next-tab-items',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    'label': {
      name: 'label',
      description: 'ARIA label for the Page tabs.',
      control: 'text',
      type: { name: 'string', required: true },
      if: { arg: 'variant', eq: 'Page Tabs' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    'variant': 'Content Tabs',
    'activeTab': undefined,
    'label': 'Page Tabs',
    'size': 'large',
    'textPrevTabItems': 'Previous tab items',
    'textNextTabItems': 'Next tab items',
    'slots-default': '',
    'slots-panels': '',
  },
};

export default meta;

function renderPagesVariant(
  label: string | undefined,
  customSlots: string,
  size: string | undefined,
): ReturnType<typeof html> {
  if (customSlots) {
    return html`
      <post-tabs label="${ifDefined(label)}" size="${ifDefined(size)}">
        ${unsafeHTML(customSlots)}
      </post-tabs>
    `;
  }

  // Default page tabs example - first link is active
  return html`
    <post-tabs label="${ifDefined(label)}" size="${ifDefined(size)}">
      <post-tab-item name="first">
        <a href="/first" aria-current="page"><post-icon name="letter"></post-icon>First page</a>
      </post-tab-item>
      <post-tab-item name="second">
        <a href="/second"><post-icon name="letter"></post-icon>Second page</a>
      </post-tab-item>
      <post-tab-item name="third">
        <a href="/third"><post-icon name="letter"></post-icon>Third page</a>
      </post-tab-item>
    </post-tabs>
  `;
}

// Helper function to render tabs variant
function renderContentVariant(
  activeTab: string | undefined,
  customSlots: string,
  panelSlots: string,
  size: string | undefined,
): ReturnType<typeof html> {
  if (customSlots) {
    return html`
      <post-tabs active-tab="${ifDefined(activeTab)}" size="${ifDefined(size)}">
        ${unsafeHTML(customSlots)}
      </post-tabs>
    `;
  }

  if (panelSlots) {
    return html`
      <post-tabs active-tab="${ifDefined(activeTab)}" size="${ifDefined(size)}">
        <post-tab-item name="first"><post-icon name="letter"></post-icon>First tab</post-tab-item>
        <post-tab-item name="second"><post-icon name="letter"></post-icon>Second tab</post-tab-item>
        <post-tab-item name="third"><post-icon name="letter"></post-icon>Third tab</post-tab-item>

        ${unsafeHTML(panelSlots)}
      </post-tabs>
    `;
  }

  return html`
    <post-tabs active-tab="${ifDefined(activeTab)}" size="${ifDefined(size)}">
      <post-tab-item name="first"><post-icon name="letter"></post-icon>First tab</post-tab-item>
      <post-tab-item name="second"><post-icon name="letter"></post-icon>Second tab</post-tab-item>
      <post-tab-item name="third"><post-icon name="letter"></post-icon>Third tab</post-tab-item>

      <post-tab-panel for="first">
        This is the content of the first tab. By default it is shown initially.
      </post-tab-panel>
      <post-tab-panel for="second">
        This is the content of the second tab. By default it is hidden initially.
      </post-tab-panel>
      <post-tab-panel for="third">
        This is the content of the third tab. By default it is also hidden initially.
      </post-tab-panel>
    </post-tabs>
  `;
}

function renderTabs(
  args: Partial<
    HTMLPostTabsElement & {
      'variant': string;
      'activeTab'?: string;
      'slots-default'?: string;
      'slots-panels'?: string;
    }
  >,
) {
  const variant = args.variant || 'Content Tabs';

  return variant === 'Page Tabs'
    ? renderPagesVariant(args.label, args['slots-default'] || '', args.size)
    : renderContentVariant(
        args.activeTab,
        args['slots-default'] || '',
        args['slots-panels'] || '',
        args.size,
      );
}

// STORIES
type Story = StoryObj<
  HTMLPostTabsElement & {
    'variant': string;
    'activeTab'?: string;
    'slots-default'?: string;
    'slots-panels'?: string;
  }
>;

export const Default: Story = {};

export const ContentVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Content Tabs variant displays tabbed content sections. Each tab shows its associated panel when clicked. Use this for organizing content on the same page.',
      },
    },
  },
  args: {
    variant: 'Content Tabs',
  },
};

export const ActiveTab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set which tab is initially active using the `active-tab` property.',
      },
    },
  },
  args: {
    variant: 'Content Tabs',
    activeTab: 'second',
  },
};

export const PagesVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Page Tabs variant displays tabs as page navigation links. Each tab contains an anchor element for routing. Use this for site navigation. The active link must have an `aria-current="page"` attribute to ensure correct accessibility and styling.',
      },
    },
  },
  args: {
    variant: 'Page Tabs',
  },
};

export const ActivePagesItem: Story = {
  args: {
    'variant': 'Page Tabs',
    'slots-default': `
      <post-tab-item name="letters">
        <a href="/letters">Letters</a>
      </post-tab-item>
      <post-tab-item name="packages">
        <!-- The active link must have an aria-current="page" attribute to ensure correct accessibility and styling. -->
        <a href="/packages" aria-current="page">Packages</a>
      </post-tab-item>
      <post-tab-item name="logistics">
        <a href="/logistics">Logistics</a>
      </post-tab-item>
    `,
  },
};
