import { bookmarkUrl } from '@shared/urls';
import { getShellOrigin } from '@preview/bridge/storybook-adapter';
import { globalsHost } from '@preview/globals/globals-host';
import { storyUrl, stringifyArgs } from '@preview/utils/story-urls';
import { getPageStoryIds, STORY_ANCHOR_PREFIX, toStorySlug } from './deep-links';
import { getStoryRecord, type StoryRecord } from './story-records';

const COPIED_TEXT = 'Copied!';
const COPIED_DURATION = 1500;

/** "View full screen": opens the story of the canvas in the bare preview, with its current args. */
export function viewFullScreen(event: Event) {
  const story = findCanvasStory(event.target as Element);
  if (!story) return;

  const url = storyUrl(story.id, {
    args: story.record?.args,
    initialArgs: story.record?.initialArgs,
    globals: globalsHost.current,
  });

  window.open(url, '_blank');
}

/** "Copy deep link": copies the shell URL of the page, which opens the story of the canvas with its current args. */
export function copyDeepLink(event: Event) {
  const button = (event.target as Element).closest('button');
  const story = findCanvasStory(event.target as Element);
  const pageId = new URLSearchParams(location.search).get('id');
  if (!story || !pageId) return;

  const { id, record } = story;
  const url = bookmarkUrl(pageId, {
    hash: STORY_ANCHOR_PREFIX + id,
    globals: globalsHost.current,
    params: {
      story: toStorySlug(id),
      args: record ? stringifyArgs(record.args, record.initialArgs) : null,
    },
  });

  navigator.clipboard
    .writeText((getShellOrigin() ?? location.origin) + url)
    .then(() => {
      if (button) showCopied(button);
    })
    .catch((error: unknown) => console.warn('Unable to copy the deep link.', error));
}

interface CanvasStory {
  id: string;
  record: StoryRecord | null;
}

function findCanvasStory(target: Element): CanvasStory | null {
  const canvas = target.closest('.docs-story');
  const id = canvas ? getPageStoryIds(canvas).at(0) : null;
  if (!canvas || !id) return null;

  return { id, record: getStoryRecord(id, canvas.querySelector('iframe')) };
}

function showCopied(button: HTMLButtonElement) {
  if (button.textContent === COPIED_TEXT) return;

  const text = button.textContent;
  button.textContent = COPIED_TEXT;
  setTimeout(() => (button.textContent = text), COPIED_DURATION);
}
