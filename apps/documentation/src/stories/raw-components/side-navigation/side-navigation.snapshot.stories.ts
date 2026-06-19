import type { StoryObj } from '@storybook/web-components-vite';
import meta, * as SideNavigationStories from './side-navigation.stories';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

/**
 * Snapshot: Uses the Default story from side-navigation.stories
 */
export const PostSideNavigation: Story = {
  render: () => {
    return schemes(() => {
      return SideNavigationStories.Default.render?.(
        SideNavigationStories.Default.args || meta.args,
        0, // no fake content in snapshots
      );
    });
  },
};