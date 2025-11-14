import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostTabsElement & { 
  variant: string; 
  activeTabPanels?: string;
  postChange: string,
  content?: string,
  tabs?: string,
  'slots-default'?: string; 
  'slots-panels'?: string; 
}> = {
  id: 'bb1291ca-4dbb-450c-a15f-596836d9f39e',
  title: 'Components/Tabs',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-tabs',
  render: renderTabs,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=19714-14521&mode=design&t=PR2ZnqAacaK7UiXP-4',
    },
    controls: {
      exclude: ['postChange', 'show', 'content', 'tabs'],
    },
  },
  argTypes: {
    variant: {
      name: 'variant',
      description: 'Select between panels variant (content sections) or navigation variant (page navigation). <post-banner data-size="sm"><p>If you attempt to mix modes (anchors + panels), the component will throw an error.</p></post-banner>',
      control: 'radio',
      options: ['panels', 'navigation'],
      table: {
        category: 'Component Variant',
        defaultValue: { summary: 'panels' },
      },
    },
    activeTabPanels: {
      name: 'active-tab',
      description:
        'The name of the tab that is initially active. If not specified, it defaults to the first tab.\n\n**Changing this value after initialization has no effect.**',
      control: 'select',
      options: ['first', 'second', 'third'],
      if: { arg: 'variant', eq: 'panels' },
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    activeTab: {
      table: {
        disable: true,
      },
    },
    fullWidth: {
      name: 'full-width',
      description: 'When set to true, this property allows the tabs container to span the full width of the screen, from edge to edge.',
      control: 'boolean',
      table: {
        category: 'Props',
      },
    },
    label: {
      name: 'label',
      description: 'The accessible label for the tabs component in navigation mode.',
      control: 'text',
      if: { arg: 'variant', eq: 'navigation' },
      table: {
        category: 'Props',
        type: {
          summary: 'string',
        },
      },
    },
    postChange: {
      name: 'postChange ',
      description: 'An event emitted after the active tab changes, when the fade in transition of its associated panel is finished. The payload is the name of the newly active tab.',
      if: { arg: 'variant', eq: 'panels' },
      table: {
        category: 'Events',
        type: {
          summary: 'CustomEvent<string>',
        },
      },
    },
    content: {
      name: 'content ',
      description: 'The container element that displays the content of the currently active tab.',
      if: { arg: 'variant', eq: 'panels' },
      table: {
        category: 'CSS SHADOW PARTS',
        type: {
          summary: 'other',
        },
      },
    },
    tabs: {
      name: 'tabs ',
      description: 'The container element that holds the set of tabs.',
      if: { arg: 'variant', eq: 'panels' },
      table: {
        category: 'CSS SHADOW PARTS',
        type: {
          summary: 'other',
        },
      },
    },
    show: {
      name: 'show ',
      description: 'Shows the panel with the given name and selects its associated tab. Any other panel that was previously shown becomes hidden and its associated tab is unselected.',
      if: { arg: 'variant', eq: 'panels' },
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
      if: { arg: 'variant', eq: 'panels' },
      table: {
        category: 'Slots',
        type: {
          summary: 'other',
        },
      },
    },
  },
  args: {
    variant: 'panels',
    postChange: 'postChange',
    content: 'content',
    activeTabPanels: undefined,
    label: 'Tabs navigation',
    'slots-default': '',
    'slots-panels': '',
  },
};

export default meta;

function renderNavigationVariant(
  fullWidth: boolean | undefined,
  label: string | undefined,
  customSlots: string
): ReturnType<typeof html> {
  if (customSlots) {
    return html`
      <post-tabs
        full-width="${fullWidth ? true : nothing}"
        label="${ifDefined(label)}"
      >
        ${unsafeHTML(customSlots)}
      </post-tabs>
    `;
  }
  
  // Default navigation example - first link is active
  return html`
    <post-tabs
      full-width="${fullWidth ? true : nothing}"
      label="${ifDefined(label)}"
    >
      <post-tab-item name="first">
        <a href="/first" aria-current="page">First page</a>
      </post-tab-item>
      <post-tab-item name="second">
        <a href="/second">Second page</a>
      </post-tab-item>
      <post-tab-item name="third">
        <a href="/third">Third page</a>
      </post-tab-item>
    </post-tabs>
  `;
}

// Helper function to render tabs variant
function renderPanelsVariant(
  activeTab: string | undefined,
  fullWidth: boolean | undefined,
  customSlots: string,
  panelSlots: string
): ReturnType<typeof html> {
  if (customSlots) {
    return html`
      <post-tabs
        active-tab="${ifDefined(activeTab)}"
        full-width="${fullWidth ? true : nothing}"
      >
        ${unsafeHTML(customSlots)}
      </post-tabs>
    `;
  }
  
  if (panelSlots) {
    return html`
      <post-tabs
        active-tab="${ifDefined(activeTab)}"
        full-width="${fullWidth ? true : nothing}"
      >
        <post-tab-item name="first">First tab</post-tab-item>
        <post-tab-item name="second">Second tab</post-tab-item>
        <post-tab-item name="third">Third tab</post-tab-item>
        
        ${unsafeHTML(panelSlots)}
      </post-tabs>
    `;
  }
  
  return html`
    <post-tabs
      active-tab="${ifDefined(activeTab)}"
      full-width="${fullWidth ? true : nothing}"
    >
      <post-tab-item name="first">First tab</post-tab-item>
      <post-tab-item name="second">Second tab</post-tab-item>
      <post-tab-item name="third">Third tab</post-tab-item>

      <post-tab-panel for="first" slot="panels">
        This is the content of the first tab. By default it is shown initially.
      </post-tab-panel>
      <post-tab-panel for="second" slot="panels">
        This is the content of the second tab. By default it is hidden initially.
      </post-tab-panel>
      <post-tab-panel for="third" slot="panels">
        This is the content of the third tab. By default it is also hidden initially.
      </post-tab-panel>
    </post-tabs>
  `;
}

function renderTabs(args: Partial<HTMLPostTabsElement & { 
  variant: string; 
  activeTabPanels?: string;
  'slots-default'?: string; 
  'slots-panels'?: string;
}>) {
  const variant = args.variant || 'panels';
  
  return variant === 'navigation'
    ? renderNavigationVariant(args.fullWidth, args.label, args['slots-default'] || '')
    : renderPanelsVariant(args.activeTabPanels, args.fullWidth, args['slots-default'] || '', args['slots-panels'] || '');
}

// STORIES
type Story = StoryObj<HTMLPostTabsElement & { 
  variant: string; 
  activeTabPanels?: string;
  'slots-default'?: string; 
  'slots-panels'?: string;
}>;

export const Default: Story = {};

export const PanelsVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Panels variant displays tabbed content sections. Each tab shows its associated panel when clicked. Use this for organizing content on the same page.',
      },
    },
  },
  args: {
    variant: 'panels',
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
    variant: 'panels',
    activeTabPanels: 'second',
  },
};

export const FullWidth: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: { 
    fullWidth: true,
    variant: 'panels',
  },
  decorators: [story => html`<div class="container">${story()}</div>`],
};

export const NavigationVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navigation variant displays tabs as page navigation links. Each tab contains an anchor element for routing. Use this for site navigation. The active link must have an `aria-current="page"` attribute to ensure correct accessibility and styling.',
      },
    },
  },
  args: {
    variant: 'navigation',
  },
};

export const ActiveNavigationItem: Story = {
  args: {
    variant: 'navigation',
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

export const Async: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dynamically add or remove tabs in panels mode. The component handles DOM mutations and updates accordingly.',
      },
    },
  },
  decorators: [
    story => {
      let tabIndex = 3;
      const addTab = () => {
        const tabs = document.querySelector('post-tabs');

        tabIndex++;
        const newTab = `
          <post-tab-item name="tab-${tabIndex}">New tab ${tabIndex}</post-tab-item>
          <post-tab-panel for="tab-${tabIndex}" slot="panels">This is the content of the new tab ${tabIndex}.</post-tab-panel>
        `;

        tabs?.insertAdjacentHTML('beforeend', newTab);
      };

      const removeActiveTab = () => {
        const items: NodeListOf<HTMLPostTabItemElement> | undefined =
          document.querySelectorAll('post-tab-item');

        const activeItem: HTMLPostTabItemElement | undefined = Array.from(items ?? []).find(
          item => item.classList.contains('active'),
        );
        
        if (!activeItem) return;

        const activePanel: HTMLPostTabPanelElement | null =
          document.querySelector(`post-tab-panel[for="${activeItem.name}"]`) ?? null;
        
        activeItem?.remove();
        activePanel?.remove();
      };

      return html`
        ${story()}
        <hr />
        <div class="d-flex gap-8">
          <button class="btn btn-default" id="add-tab" type="button" @click="${addTab}">
            <post-icon name="plus"></post-icon>
            Add tab
          </button>
          <button
            class="btn btn-default"
            id="remove-active-tab"
            type="button"
            @click="${removeActiveTab}"
          >
            <post-icon name="minus"></post-icon>
            Remove active tab
          </button>
        </div>
      `;
    },
  ],
};