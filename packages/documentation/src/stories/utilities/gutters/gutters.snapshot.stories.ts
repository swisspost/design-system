import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import meta from './gutters.stories';
import './gutters.styles.scss';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

const sizes = ['0', '1', '2', '4', '8', '12', '24', '32', '48'];
const gutterType = ['g', 'gx', 'gy'];

export const Gutters: StoryObj = {
  render: () => {
    return schemes(
      () => {
        return html`
          ${bombArgs({
            gutterType: gutterType,
            sizes: sizes,
          }).map(
            (args: Args) =>
              html`
                <div class="container my-24 mx-0">
                  <div class="row ${args.gutterType}-${args.sizes}">
                    <div class="col-6">${args.gutterType}-${args.sizes}</div>
                    <div class="col-6">${args.gutterType}-${args.sizes}</div>
                    <div class="col-6">${args.gutterType}-${args.sizes}</div>
                    <div class="col-6">${args.gutterType}-${args.sizes}</div>
                  </div>
                </div>
              `,
          )}
        `;
      },
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};
