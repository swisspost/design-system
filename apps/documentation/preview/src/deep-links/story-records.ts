/**
 * The args of the stories rendered in a preview document, recorded by the `withStoryRecords` decorator.
 *
 * Stories with `inline: false` render in their own iframe inside the docs page, so the docs page
 * reads their records from the iframe's document.
 */
import type { Args } from '@storybook/web-components-vite';

export interface StoryRecord {
  name: string;
  args: Args;
  initialArgs: Args;
}

type StoryRecords = Map<string, StoryRecord>;

const RECORDS_KEY = '__postDocsStories__';

const records: StoryRecords = new Map();
(window as Window & { [RECORDS_KEY]?: StoryRecords })[RECORDS_KEY] = records;

export function recordStory(storyId: string, record: StoryRecord) {
  records.set(storyId, record);
}

/** The record of a story, from this document or from the iframe it renders in. */
export function getStoryRecord(
  storyId: string,
  frame?: HTMLIFrameElement | null,
): StoryRecord | null {
  const local = records.get(storyId);
  if (local || !frame) return local ?? null;

  try {
    const frameWindow = frame.contentWindow as (Window & { [RECORDS_KEY]?: StoryRecords }) | null;
    return frameWindow?.[RECORDS_KEY]?.get(storyId) ?? null;
  } catch {
    // the iframe belongs to another origin
    return null;
  }
}
