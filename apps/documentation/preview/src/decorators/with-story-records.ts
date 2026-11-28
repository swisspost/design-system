import type { Decorator } from '@storybook/web-components-vite';
import { recordStory } from '@preview/deep-links/story-records';

/**
 * Records the current args of each story, for the canvas actions and deep
 * links.
 */
export const withStoryRecords: Decorator = (story, context) => {
  recordStory(context.id, {
    name: context.name,
    args: context.allArgs,
    initialArgs: context.initialArgs,
  });

  return story();
};
