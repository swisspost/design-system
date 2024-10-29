import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './togglebutton.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots/Toggle Button',
};

type Story = StoryObj<HTMLPostTogglebuttonElement>;

export const PostToggleButtonSnapshots: Story = {
  render: (
    _args: Partial<HTMLPostTogglebuttonElement>,
    context: StoryContext<HTMLPostTogglebuttonElement>,
  ) => {
    return html`
      <div class="row gx-5">
        <div class="col">
          <p>Untoggled and Toggled States</p>
          <div class="row">
            <div class="col">
              <div class="my-mini">
                <post-togglebutton toggled="false">
                  <span slot="untoggled">Not Toggled</span>
                  <span slot="toggled">Toggled</span>
                </post-togglebutton>
              </div>
              <div class="my-mini">
                <post-togglebutton toggled="true">
                  <span slot="untoggled">Not Toggled</span>
                  <span slot="toggled">Toggled</span>
                </post-togglebutton>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};
