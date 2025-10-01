import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostTabsElement & { mode: string; 'slots-default': string; 'slots-tabs': string }> = {
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
    mode: {
      name: 'mode',
      description: 'Select between panels mode (content sections) or navigation mode (page navigation)',
      control: 'radio',
      options: ['panels', 'navigation'],
      table: {
        category: 'Component Mode',
        defaultValue: { summary: 'panels' },
      },
    },
    activeTab: {
      name: 'active-tab',
      description: 'The name of the initially active tab',
      control: 'select',
      options: ['first', 'second', 'third'],
      if: { arg: 'mode' },
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
      description: 'Slot for complete tab content (both tab items and panels). Only available in panels mode. Takes precedence over slots-tabs if both are provided.',
      control: {
        type: 'text',
      },
      if: { arg: 'mode', eq: 'panels' },
      table: {
        category: 'Slots',
        type: {
          summary: 'HTML',
        },
      },
    },
    'slots-tabs': {
      name: 'tabs',
      description: 'Slot for tab items content. Available in both modes for customizing tab items.',
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

  },
  args: { 
    mode: 'panels',
    fullWidth: false,
    'slots-default': '',
    'slots-tabs': '',
  },
};

export default meta;

// Unified render function that switches based on mode
function renderTabs(args: Partial<HTMLPostTabsElement & { mode: string; 'slots-default': string; 'slots-tabs': string }>) {
  const mode = args.mode || 'panels';
  
  if (mode === 'navigation') {
    // Use custom tabs content if provided
    if (args['slots-tabs']) {
      return html`
        <post-tabs
          active-tab="${ifDefined(args.activeTab)}"
          full-width="${args.fullWidth ? true : nothing}"
        >
          ${unsafeHTML(args['slots-tabs'])}
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
  
  // Panels mode (default)
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
  
  if (args['slots-tabs']) {
    // Use custom tabs content with default panels
    return html`
      <post-tabs
        active-tab="${ifDefined(args.activeTab)}"
        full-width="${args.fullWidth ? true : nothing}"
      >
        ${unsafeHTML(args['slots-tabs'])}
        
        <post-tab-panel for="first">
          <p>This is the content of the first tab.</p>
        </post-tab-panel>

        <post-tab-panel for="second">
          <p>This is the content of the second tab.</p>
        </post-tab-panel>

        <post-tab-panel for="third">
          <p>This is the content of the third tab.</p>
        </post-tab-panel>
      </post-tabs>
    `;
  }
  
  return html`
    <post-tabs
      active-tab="${ifDefined(args.activeTab)}"
      full-width="${args.fullWidth ? true : nothing}"
    >
      <post-tab-item name="first">First tab</post-tab-item>
      <post-tab-panel for="first">
        <p>This is the content of the first tab.</p>
      </post-tab-panel>

      <post-tab-item name="second">Second tab</post-tab-item>
      <post-tab-panel for="second">
        <p>This is the content of the second tab.</p>
      </post-tab-panel>

      <post-tab-item name="third">Third tab</post-tab-item>
      <post-tab-panel for="third">
        <p>This is the content of the third tab.</p>
      </post-tab-panel>
    </post-tabs>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostTabsElement & { mode: string; 'slots-default': string; 'slots-tabs': string }>;

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Use the **Mode** control above to switch between panels mode (default) and navigation mode. The component automatically detects the mode based on whether tab items contain anchor links.',
      },
    },
  },
};

export const PanelsMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Panels mode displays tabbed content sections. Each tab shows its associated panel when clicked. Use this for organizing content on the same page.',
      },
    },
  },
  args: {
    mode: 'panels',
  },
};

export const NavigationMode: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Navigation mode is for page navigation. When tab items contain `<a>` elements, the component renders as semantic navigation. Perfect for sub-navigation menus.',
      },
    },
  },
  args: {
    mode: 'navigation',
  },
};

export const ActiveTab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set which tab is initially active using the `active-tab` property. Works in both modes.',
      },
    },
  },
  args: {
    mode: 'panels',
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
    mode: 'panels',
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
      
      <div class="container mt-3">
        <div class="alert alert-info">
          <strong>Integration tip:</strong> Connect the <code>active-tab</code> property to your router's current route.
          The tabs will persist across page navigations while highlighting the active page.
        </div>
        <pre class="bg-light p-3 rounded"><code>// React Router example
const location = useLocation();
const activeTab = location.pathname.split('/').pop();

&lt;post-tabs active-tab={activeTab}&gt;
  &lt;post-tab-item name="home"&gt;
    &lt;a href="/home"&gt;Home&lt;/a&gt;
  &lt;/post-tab-item&gt;
&lt;/post-tabs&gt;</code></pre>
      </div>
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
    mode: 'panels',
  },
  decorators: [
    story => {
      let tabIndex = 0;
      const addTab = () => {
        const tabs = document.querySelector('post-tabs');

        tabIndex++;
        const newTab = `
          <post-tab-item name="tab-${tabIndex}">New tab ${tabIndex}</post-tab-item>
          <post-tab-panel for="tab-${tabIndex}">This is the content of the new tab ${tabIndex}.</post-tab-panel>
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