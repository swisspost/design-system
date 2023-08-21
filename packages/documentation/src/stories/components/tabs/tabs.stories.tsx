import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta<HTMLPostTabsElement> =  {
  title: 'Components/Tabs',
  component: 'post-tabs',
  render: renderTabs,
  parameters: {
    badge: [BADGE.BETA, BADGE.NEEDS_REVISION],
  },
  argTypes: {
    activePanel: {
      name: 'active-panel',
      control: 'select',
      options: ['unua', 'dua', 'tria']
    }
  }
};

export default meta;

// RENDERER
function renderTabs(args: Partial<HTMLPostTabsElement>) {
  return html`
    <post-tabs active-panel=${ifDefined(args.activePanel)}>
      <post-tab-header slot="tabs" panel="unua">Unua langeto</post-tab-header>
      <post-tab-header slot="tabs" panel="dua">Dua langeto</post-tab-header>
      <post-tab-header slot="tabs" panel="tria">Tria langeto</post-tab-header>

      <post-tab-panel name="unua">Jen la enhavo de la unua langeto. Defaŭlte ĝi montriĝas komence.</post-tab-panel>
      <post-tab-panel name="dua">Jen la enhavo de la dua langeto. Defaŭlte ĝi estas kaŝita komence.</post-tab-panel>
      <post-tab-panel name="tria">Jen la enhavo de la tria langeto. Defaŭlte ĝi ankaŭ estas kaŝita komence.</post-tab-panel>
    </post-tabs>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostTabsElement>;

export const Default: Story = {};

export const ActivePanel: Story = {
  args: {
    activePanel: 'tria'
  }
};
