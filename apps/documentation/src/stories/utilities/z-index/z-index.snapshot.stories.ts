import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import meta from './z-index.stories';
import './z-index.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ZIndex: Story = {
  render: () => {
    return schemes(
      () => html`
        <div class="container-examples">
          <div class="position-absolute z-3">z-3</div>
          <div class="position-absolute z-2">z-2</div>
          <div class="position-absolute z-1">z-1</div>
          <div class="position-absolute z-0">z-0</div>
          <div class="position-absolute z-n1">z-n1</div>
        </div>
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};
