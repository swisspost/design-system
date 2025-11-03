import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostTabsElement & { variant: string; 'slots-default': string; 'slots-panels': string }> = {
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
        description: 'Select between panels variant (content sections) or navigation variant (page navigation). <post-banner data-size="sm"><p>If you attempt to mix both variants(anchors + panels), the component will throw an error.</p></post-banner>',
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
    'slots-default': '',
    'slots-panels': '',
  },
};

export default meta;

function renderTabs(args: Partial<HTMLPostTabsElement & { variant: string; 'slots-default': string; 'slots-panels': string }>) {
  const variant = args.variant || 'panels';
  
  if (variant === 'navigation') {
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

// STORIES
type Story = StoryObj<HTMLPostTabsElement & { 
  variant: string; 
  'slots-default': string; 
  'slots-panels': string;
}>;

export const Default: Story = {
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