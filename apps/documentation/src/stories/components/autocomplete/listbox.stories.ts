import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'fb749467-c70e-4d87-b639-03cc713a8370',
  title: 'Components/Listbox',
  component: 'post-listbox',
  tags: ['package:WebComponents'],
  parameters: {
    badges: [],
    design: {},
  },
  render,
};

export default meta;

function render(_args: Args, context: StoryContext) {
  const listboxId = `listbox-${(context.id ?? context.name).replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`;

  return html`
    <div style="width: 280px;">
      <post-listbox id="${listboxId}">
        <div slot="blank-slate">Nothing to see here</div>
        <post-listbox-option value="Switzerland"></post-listbox-option>
        <post-listbox-option value="Germany"></post-listbox-option>
        <post-listbox-option value="France"></post-listbox-option>
        <post-listbox-option value="Italy"></post-listbox-option>
      </post-listbox>
    </div>
    <script>
      requestAnimationFrame(() => document.getElementById('${listboxId}')?.show());
    </script>
  `;
}

type Story = StoryObj;

export const Default: Story = {};
