import type { StoryObj } from '@storybook/web-components-vite';
import meta from './togglebutton.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

const BTN = ['btn-primary', 'btn-secondary', 'btn-terciary'];
const SIZES = ['', 'btn-sm', 'btn-lg'];

type Story = StoryObj;

export const Togglebutton: Story = {
  render: () => {
    const TOGGLED = [false, true];

    return schemes(
      () => html`
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
      `,
    );
  },
};
