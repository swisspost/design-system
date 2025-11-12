import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostTabsElement & { 
  variant: string; 
  activeTabPanels?: string;
  'slots-default': string; 
  'slots-panels': string;
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
      description: 'The accessible label for the tabs component in navigation mode. **Required for navigation variant.**',
      control: 'text',
      if: { arg: 'variant', eq: 'navigation' },
      table: {
        category: 'Props',
        type: {
          summary: 'string',
        },
      },
    },
    'slots-default': {
      name: 'default',
      description: 'Slot for tab items. Available in both variants - for tab navigation buttons in panels mode, and for navigation links in navigation mode.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'HTML',
        },
      },
    },
    'slots-panels': {
      name: 'panels',
      description: 'Slot for tab panels content. Only available in panels variant for customizing panel content.',
      control: {
        type: 'text',
      },
      if: { arg: 'variant', eq: 'panels' },
      table: {
        category: 'Slots',
        type: {
          summary: 'HTML',
        },
      },
    },
  },
  args: {
    variant: 'panels',
    activeTabPanels: undefined,
    label: 'Tabs navigation',
    'slots-default': '',
    'slots-panels': '',
  },
};

export default meta;

function renderNavigationVariant(
  fullWidth: boolean,
  label: string,
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
        <a href="#first" aria-current="page">First page</a>
      </post-tab-item>
      <post-tab-item name="second">
        <a href="#second">Second page</a>
      </post-tab-item>
      <post-tab-item name="third">
        <a href="#third">Third page</a>
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
  'slots-default': string; 
  'slots-panels': string;
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
  'slots-default': string; 
  'slots-panels': string;
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

export const NavigationVariant: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Navigation variant is for page navigation. When tab items contain \`<a>\` elements, the component renders as semantic \`<nav>\` navigation.

**How it works:**
- Your routing framework sets \`aria-current="page"\` on the active link
- The component automatically styles the active tab
- Works the same way as navigation in the header component
- Perfect for sub-navigation menus or section navigation`,
      },
    },
  },
  args: {
    variant: 'navigation',
    label: 'Page navigation',
  },
};

export const ActiveTab: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Panel mode only:** Set which tab is initially active using the `active-tab` property.',
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
