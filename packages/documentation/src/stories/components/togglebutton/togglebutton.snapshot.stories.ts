import type { StoryObj } from '@storybook/web-components';
import meta from './togglebutton.stories';
import { html } from 'lit';

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
                    ${meta.render({
                      variant: btn,
                      size: size || 'null',
                      toggled: isToggled,
                      contentWhenUntoggled: 'Untoggled',
                      contentWhenToggled: 'Toggled',
                    })}
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