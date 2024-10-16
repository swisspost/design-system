import type { StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './borders.stories';
import './borders.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

const BorderSnapshot: Story = {
  render: () => {
    const samples = [
      ['border', 'null', 'null', 'null'],
      ['border-top', 'null', 'null', 'null'],
      ['border-end', 'null', 'null', 'null'],
      ['border-bottom', 'null', 'null', 'null'],
      ['border-start', 'null', 'null', 'null'],
      ['border', '10', 'null', 'null'],
      ['border-top', '10', 'null', 'null'],
      ['border-end', '10', 'null', 'null'],
      ['border-bottom', '10', 'null', 'null'],
      ['border-start', '10', 'null', 'null'],
      ['border', '2', 'primary', 'null'],
      ['border-top', '2', 'secondary', 'null'],
      ['border', '2', 'info', 'null'],
      ['border', '2', 'success', 'null'],
      ['border', '2', 'danger', 'null'],
      ['border', '5', 'secondary', '100'],
      ['border', '5', 'secondary', '75'],
      ['border', '5', 'secondary', '50'],
      ['border', '5', 'secondary', '25'],
      ['border', '5', 'secondary', '10'],
      ['border', '5', 'secondary', '0'],
    ];

    return html`
      ${samples.map(([borderSide, borderWidth, borderColor, borderOpacity]) => {
        return html`
          <div
            class="${borderSide} ${borderWidth !== 'null'
              ? `border-${borderWidth}`
              : ''} ${borderColor !== 'null' ? `border-${borderColor}` : ''} ${borderOpacity !==
            'null'
              ? `border-opacity-${borderOpacity}`
              : ''}"
          >
            Sample Text
          </div>
        `;
      })}
    `;
  },
};

const RoundedSnapshot: Story = {
  render: () => {
    const samples = [
      ['rounded', 'null'],
      ['rounded-top', 'null'],
      ['rounded-end', 'null'],
      ['rounded-bottom', 'null'],
      ['rounded-start', 'null'],
      ['rounded', '1'],
      ['rounded', '2'],
      ['rounded', '3'],
      ['rounded', '4'],
      ['rounded', '5'],
      ['rounded', 'circle'],
      ['rounded', 'pill'],
    ];

    return html`
      ${samples.map(([roundedSide, radius]) => {
        return html`
          <div class="border ${roundedSide}${radius !== 'null' ? `-${radius}` : ''}">
            Sample Text
          </div>
        `;
      })}
    `;
  },
};

export const Borders: Story = {
  render: (_, context) =>
    html`<div class="borders-example">${BorderSnapshot.render?.({}, context)}</div>`,
};

export const Rounded: Story = {
  render: (_, context: StoryContext) =>
    html` <div class="borders-example">${RoundedSnapshot.render?.({}, context)}</div> `,
};
