import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './togglebutton.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';
import { Default } from '@/stories/components/button/button.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

const BG = ['bg-white', 'bg-dark'];
const BTN = ['btn-primary', 'btn-secondary', 'btn-terciary'];
const SIZES = ['', 'btn-sm', 'btn-lg'];

type Story = StoryObj;

export const ToggleButton: Story = {
  render: () => {
    const TOGGLED = [false, true];

    return html`
      ${BG.map(
        bg => html`
          <div class="${bg} px-5">
            ${BTN.map(btn =>
              SIZES.map(size =>
                TOGGLED.map(
                  isToggled => html`
                    <post-togglebutton class="btn ${btn} ${size} my-5" ?toggled=${isToggled}>
                      <span slot="untoggled">Untoggled</span>
                      <span slot="toggled">Toggled</span>
                    </post-togglebutton>
                  `,
                ),
              ),
            )}
          </div>
        `,
      )}
    `;
  },
};
