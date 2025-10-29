import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostTabsElement> = {
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
    activePanel: {
      name: 'active-panel',
      control: 'select',
      options: ['first', 'second', 'third'],
    },
  },
};

export default meta;

function renderTabs(args: Partial<HTMLPostTabsElement>) {
  return html`
    <post-tabs
      active-panel="${ifDefined(args.activePanel)}"
      full-width="${args.fullWidth ? true : nothing}"
    >
      <post-tab-header panel="first">First tab</post-tab-header>
      <post-tab-header panel="second">Second tab</post-tab-header>
      <post-tab-header panel="third">Third tab</post-tab-header>

      <post-tab-panel name="first">
        This is the content of the first tab. By default it is shown initially.
      </post-tab-panel>
      <post-tab-panel name="second">
        This is the content of the second tab. By default it is hidden initially.
      </post-tab-panel>
      <post-tab-panel name="third">
        This is the content of the third tab. By default it is also hidden initially.
      </post-tab-panel>
    </post-tabs>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostTabsElement>;

export const Default: Story = {
};

export const ActivePanel: Story = {
  args: {
    activePanel: 'third',
  },
};

export const FullWidth: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: { fullWidth: true },
  decorators: [story => html`<div class="container">${story()}</div>`],
};

export const Async: Story = {
  decorators: [
    story => {
      let tabIndex = 0;
      const addTab = () => {
        const tabs = document.querySelector('post-tabs');

        tabIndex++;
        const newTab = `
          <post-tab-header panel="panel-${tabIndex}">New tab ${tabIndex}</post-tab-header>
          <post-tab-panel name="panel-${tabIndex}">This is the content of the new tab ${tabIndex}.</post-tab-panel>
        `;

        tabs?.insertAdjacentHTML('beforeend', newTab);
      };

      const removeActiveTab = () => {
        const headers: NodeListOf<HTMLPostTabHeaderElement> | undefined =
          document.querySelectorAll('post-tab-header');

        const activeHeader: HTMLPostTabHeaderElement | undefined = Array.from(headers ?? []).find(
          () => document.querySelectorAll('post-tab-header.active'),
        );
        activeHeader?.remove();

        const activePanel: HTMLPostTabPanelElement | null =
          document.querySelector(`post-tab-panel[name=${activeHeader?.panel}]`) ?? null;
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
