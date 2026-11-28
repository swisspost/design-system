import type { Decorator } from '@storybook/web-components-vite';
import type { Globals } from '@shared/globals';
import { setStoryGlobals } from '@preview/globals/apply-globals';

/** Applies the story's own `globals` in story views, e.g. `globals: { appearance: 'compact' }`. */
export const withGlobals: Decorator = (story, context) => {
  if (context.viewMode === 'story') setStoryGlobals(context.storyGlobals as Partial<Globals>);

  return story();
};
