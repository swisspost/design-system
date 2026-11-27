import type { Decorator } from '@storybook/web-components-vite';
import { setStoryGlobals } from '@preview/globals/apply-globals';

/** Applies the story's own `globals` in story views, e.g. `globals: { appearance: 'compact' }`. */
export const withGlobals: Decorator = (story, context) => {
  if (context.viewMode === 'story') setStoryGlobals(context.storyGlobals);

  return story();
};
