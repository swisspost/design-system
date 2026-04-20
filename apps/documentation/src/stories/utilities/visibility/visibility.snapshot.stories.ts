import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import meta from './visibility.stories';
import './visibility.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const VisibilityVisible: Story = {
  name: 'Visibility – visible',
  render: () =>
    schemes(
      () => html`
        <div class="visibility-example">
          <div class="visibility-box invisible ">Box 1</div>
          <div class="visibility-box visible">Box 2</div>
        </div>
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    ),
};
