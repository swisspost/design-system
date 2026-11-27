import type { Decorator } from '@storybook/web-components-vite';
import { globalsApplier } from '@preview/globals/globals-applier';

/** Applies the story's own `globals` in story views, e.g. `globals: { appearance: 'compact' }`. */
export const withGlobals: Decorator = (story, context) => {
  if (context.viewMode === 'story') globalsApplier.setStoryGlobals(context.storyGlobals);

  return story();
};
