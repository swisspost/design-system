import type { Channel } from 'storybook/internal/channels';
import { DOCS_RENDERED, UPDATE_STORY_ARGS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { parseArgs } from '@preview/utils/story-urls';
import { getStoryRecord } from './story-records';

export const STORY_ANCHOR_PREFIX = 'story--';

// the story blocks of a docs page, their id is the anchor `story--<id>`
const STORY_BLOCK_SELECTOR = `[data-story-block][id^="${STORY_ANCHOR_PREFIX}"]`;

/**
 * Applies the args of a deep link (`?story=<story>&args=<args>`) to the story it names,
 * once its docs page has rendered. The args are updated like the controls do, so the controls show them
 * and stories rendered in their own iframe receive them too.
 */
export function startApplyingDeepLinks() {
  addons.ready().then(channel => {
    channel.on(DOCS_RENDERED, () => applyDeepLink(channel));
  });
}

/** The story segment of a story id, e.g. `default` for `components-button--default`. */
export function toStorySlug(storyId: string): string {
  return storyId.split('--').at(-1) ?? storyId;
}

export function getPageStoryIds(root: ParentNode = document): string[] {
  return Array.from(root.querySelectorAll(STORY_BLOCK_SELECTOR), element =>
    element.id.slice(STORY_ANCHOR_PREFIX.length),
  );
}

function applyDeepLink(channel: Channel) {
  const params = new URLSearchParams(location.search);
  const story = params.get('story');
  const args = params.get('args');
  if (!story || !args) return;

  const storyId = getPageStoryIds().find(id => matchesStory(id, story));
  const updatedArgs = parseArgs(args);

  if (storyId && Object.keys(updatedArgs).length > 0) {
    channel.emit(UPDATE_STORY_ARGS, { storyId, updatedArgs });
  }
}

// older links name the story, e.g. `story=Default`
function matchesStory(storyId: string, wanted: string): boolean {
  const simplify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = simplify(wanted);
  const name = getStoryRecord(storyId)?.name;

  return target === simplify(toStorySlug(storyId)) || (!!name && target === simplify(name));
}
