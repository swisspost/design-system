import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostTabsElement & { variant: string; 'slots-default': string; 'slots-panels': string }> = {
  id: 'bb1291ca-4dbb-450c-a15f-596836d9f39e',
  title: 'Components/Tabs',
  tags: ['package:WebComponents'],
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
      description: 'Select between panels variant (content sections) or navigation variant (page navigation)',
      control: 'radio',
      options: ['panels', 'navigation'],
      table: {
        category: 'Component Variant',
        defaultValue: { summary: 'panels' },
      },
    },
    activeTab: {
      name: 'active-tab',
      description: 'The name of the initially active tab',
      control: 'select',
      options: ['first', 'second', 'third'],
      if: { arg: 'variant' },
      table: {
        category: 'Properties',
      },
    },
    fullWidth: {
      name: 'full-width',
      description: 'Stretch tabs container to full screen width',
      control: 'boolean',
      table: {
        category: 'Properties',
      },
    },
    'slots-default': {
      name: 'default',
      description: 'Slot for tab items. Available in both variants - for tab navigation buttons in both panels and navigation modes.',
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
    fullWidth: false,
    'slots-default': '',
    'slots-panels': '',
  },
};

export default meta;

// Unified render function that switches based on variant
function renderTabs(args: Partial<HTMLPostTabsElement & { variant: string; 'slots-default': string; 'slots-panels': string }>) {
  const variant = args.variant || 'panels';
  
  if (variant === 'navigation') {
    // Use custom tabs content if provided
    if (args['slots-default']) {
      return html`
        <post-tabs
          active-tab="${ifDefined(args.activeTab)}"
          full-width="${args.fullWidth ? true : nothing}"
        >
          ${unsafeHTML(args['slots-default'])}
        </post-tabs>
      `;
    }
    
    return html`
      <post-tabs
        active-tab="${ifDefined(args.activeTab)}"
        full-width="${args.fullWidth ? true : nothing}"
      >
        <post-tab-item name="first">
          <a href="#first">First page</a>
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
  
  // Panels variant (default)
  if (args['slots-default']) {
    // Use custom slot content if provided (complete custom content)
    return html`
      <post-tabs
        active-tab="${ifDefined(args.activeTab)}"
        full-width="${args.fullWidth ? true : nothing}"
      >
        ${unsafeHTML(args['slots-default'])}
      </post-tabs>
    `;
  }
  
  if (args['slots-panels']) {
    return html`
      <post-tabs
        active-tab="${ifDefined(args.activeTab)}"
        full-width="${args.fullWidth ? true : nothing}"
      >
        <post-tab-item name="first">First tab</post-tab-item>
        <post-tab-item name="second">Second tab</post-tab-item>
        <post-tab-item name="third">Third tab</post-tab-item>
        
        ${unsafeHTML(args['slots-panels'])}
      </post-tabs>
    `;
  }
  
  return html`
    <post-tabs
      active-tab="${ifDefined(args.activeTab)}"
      full-width="${args.fullWidth ? true : nothing}"
    >
      <post-tab-item name="first">First tab</post-tab-item>
      <post-tab-item name="second">Second tab</post-tab-item>
      <post-tab-item name="third">Third tab</post-tab-item>
      
      <post-tab-panel for="first" slot="panels">
        <p>This is the content of the first tab.</p>
      </post-tab-panel>
      <post-tab-panel for="second" slot="panels">
        <p>This is the content of the second tab.</p>
      </post-tab-panel>
      <post-tab-panel for="third" slot="panels">
        <p>This is the content of the third tab.</p>
      </post-tab-panel>
    </post-tabs>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostTabsElement & { 
  variant: string; 
  'slots-default': string; 
  'slots-panels': string;
}>;

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Use the **Variant** control above to switch between panels variant (default) and navigation variant. The component automatically detects the variant based on whether tab items contain anchor links.\n\n**Note**: The `content` CSS Shadow Part is only available in panels mode, while the `tabs` part is available in both modes.',
      },
    },
  },
};

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
        story: 'Navigation variant is for page navigation. When tab items contain `<a>` elements, the component renders as semantic navigation. Perfect for sub-navigation menus.',
      },
    },
  },
  args: {
    variant: 'navigation',
  },
};

export const NavigationMode: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Navigation mode for Cypress testing. When tab items contain `<a>` elements, the component renders as semantic navigation.',
      },
    },
  },
  args: {
    variant: 'navigation',
  },
};

export const ActiveTab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set which tab is initially active using the `active-tab` property. Works in both variants.',
      },
    },
  },
  args: {
    variant: 'panels',
    activeTab: 'third',
  },
};

export const FullWidth: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full-width mode stretches the tabs container across the full screen width while keeping content aligned. Available in both modes.',
      },
    },
  },
  args: { 
    variant: 'panels',
    fullWidth: true 
  },
  decorators: [story => html`<div class="container">${story()}</div>`],
};

export const NavigationWithRouting: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing navigation mode with realistic routing URLs. In a real app, these would connect to your routing framework (React Router, Angular Router, etc.).',
      },
    },
  },
  render: (args: Partial<HTMLPostTabsElement>) => {
    return html`
      <post-tabs
        active-tab="${ifDefined(args.activeTab)}"
        full-width="${args.fullWidth ? true : nothing}"
      >
        <post-tab-item name="home">
          <a href="/home">Home</a>
        </post-tab-item>
        <post-tab-item name="products">
          <a href="/products">Products</a>
        </post-tab-item>
        <post-tab-item name="about">
          <a href="/about">About</a>
        </post-tab-item>
        <post-tab-item name="contact">
          <a href="/contact">Contact</a>
        </post-tab-item>
      </post-tabs>
    `;
  },
  args: {
    activeTab: 'home',
  },
};

export const Async: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs can be dynamically added or removed. This example shows panels mode with dynamic tab management.',
      },
    },
  },
  args: {
    variant: 'panels',
  },
  decorators: [
    story => {
      let tabIndex = 0;
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

export const NavigationWithCurrent: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Navigation mode with aria-current="page" for detecting active tab.',
      },
    },
  },
  render: (args: Partial<HTMLPostTabsElement>) => {
    return html`
      <post-tabs
        active-tab="${ifDefined(args.activeTab)}"
        full-width="${args.fullWidth ? true : nothing}"
      >
        <post-tab-item name="first">
          <a href="#first">First page</a>
        </post-tab-item>
        <post-tab-item name="second">
          <a href="#second" aria-current="page">Second page</a>
        </post-tab-item>
        <post-tab-item name="third">
          <a href="#third">Third page</a>
        </post-tab-item>
      </post-tabs>
    `;
  },
  args: {
    variant: 'navigation',
  },
};

export const MixedMode: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Mixed mode example that demonstrates error handling when both navigation and panel elements are present.',
      },
    },
  },
  render: (args: Partial<HTMLPostTabsElement>) => {
    return html`
      <post-tabs
        active-tab="${ifDefined(args.activeTab)}"
        full-width="${args.fullWidth ? true : nothing}"
      >
        <post-tab-item name="first">
          <a href="#first">First page</a>
        </post-tab-item>
        <post-tab-item name="second">Second tab</post-tab-item>
        <post-tab-item name="third">Third tab</post-tab-item>
        
        <post-tab-panel for="second" slot="panels">
          <p>This is the content of the second tab.</p>
        </post-tab-panel>
        <post-tab-panel for="third" slot="panels">
          <p>This is the content of the third tab.</p>
        </post-tab-panel>
      </post-tabs>
    `;
  },
  args: {
    variant: 'panels',
  },
};