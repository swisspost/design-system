import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
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
      options: ['unua', 'dua', 'tria'],
    },
  },
};

export default meta;

function renderTabs(args: Partial<HTMLPostTabsElement>) {
  return html`
    <post-tabs active-panel="${ifDefined(args.activePanel)}">
      <post-tab-header panel="unua">Unua langeto</post-tab-header>
      <post-tab-header panel="dua">Dua langeto</post-tab-header>
      <post-tab-header panel="tria">Tria langeto</post-tab-header>

      <post-tab-panel name="unua">
        Jen la enhavo de la unua langeto. Defaŭlte ĝi montriĝas komence.
      </post-tab-panel>
      <post-tab-panel name="dua">
        Jen la enhavo de la dua langeto. Defaŭlte ĝi estas kaŝita komence.
      </post-tab-panel>
      <post-tab-panel name="tria">
        Jen la enhavo de la tria langeto. Defaŭlte ĝi ankaŭ estas kaŝita komence.
      </post-tab-panel>
    </post-tabs>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostTabsElement>;

export const Default: Story = {};

export const ActivePanel: Story = {
  args: {
    activePanel: 'tria',
  },
};

export const Async: Story = {
  decorators: [
    story => {
      let tabIndex = 0;
      const addTab = () => {
        const tabs = document.querySelector('post-tabs');

        tabIndex++;
        const newTab = `
          <post-tab-header panel="panel-${tabIndex}">Nova langeto ${tabIndex}</post-tab-header>
          <post-tab-panel name="panel-${tabIndex}">Jen la enhavo de la nova langeto ${tabIndex}.</post-tab-panel>
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
            <post-icon name="2040"></post-icon>
            Add tab
          </button>
          <button
            class="btn btn-default"
            id="remove-active-tab"
            type="button"
            @click="${removeActiveTab}"
          >
            <post-icon name="2039"></post-icon>
            Remove active tab
          </button>
        </div>
      `;
    },
  ],
};
