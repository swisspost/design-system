import type { StoryObj, Args } from '@storybook/web-components';
import { html } from 'lit';
import meta from './borders.stories';
import './borders.styles.scss';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Borders: Story = {
  render: () => {
    return html`
      ${bombArgs({
        borderWidth: Borders.argTypes?.borderWidth?.values,
        borderSide: Borders.argTypes?.border?.values,
      }).map((bombargs: Args) => {
        return html`
          <div
            class="${bombargs.borderSide} ${bombargs.borderWidth !== 'null'
              ? `border-${bombargs.borderWidth}`
              : ''}"
          >
            Sample Text
          </div>
        `;
      })}
    `;
  },
  decorators: [story => html` <div class="borders-example">${story()}</div> `],
};

export const Rounded: Story = {
  render: () => {
    return html`
      ${bombArgs({
        roundedScale: Borders.argTypes?.radius?.values,
        roundedSide: Borders.argTypes?.roundedSide?.values,
      }).map((bombargs: Args) => {
        return html`
          <div
            class="border ${bombargs.roundedSide}${bombargs.radius !== 'null'
              ? `-${bombargs.radius}`
              : ''}"
          >
            Sample Text
          </div>
        `;
      })}
    `;
  },
  decorators: [story => html` <div class="borders-example">${story()}</div> `],
};
