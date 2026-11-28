/**
 * Adapts Storybook to the shell connection: Storybook's events are reported to the shell,
 * and the shell's messages are applied to Storybook.
 */
import { addons } from 'storybook/preview-api';
import type { Channel } from 'storybook/internal/channels';
import {
  CURRENT_STORY_WAS_SET,
  DOCS_RENDERED,
  SET_CURRENT_STORY,
  STORY_ERRORED,
  STORY_MISSING,
  STORY_RENDER_PHASE_CHANGED,
  STORY_SPECIFIED,
  STORY_THREW_EXCEPTION,
} from 'storybook/internal/core-events';
import { stringifyGlobals } from '@shared/globals';
import { previewUrl } from '@shared/urls';
import { getGlobals, setGlobals } from '@preview/globals/globals-host';
import { interceptLinks } from './links';
import { ShellConnection, type ShellMessageEvent } from './shell-connection';

interface StorySelection {
  storyId: string;
}

interface RenderPhaseChange {
  newPhase: string;
  storyId: string;
}

interface UrlPage {
  id: string;
  params: Record<string, string>;
}

interface RenderingPage {
  id: string;
  timers: number[];
}

const STORYBOOK_PARAMS = new Set(['id', 'viewMode', 'globals']);

const SETTLED_PHASES = new Set(['completed', 'afterEach', 'finished', 'aborted', 'errored']);

// the stories of a docs page start rendering shortly after the page itself
const STORIES_START_DELAY = 50;
const STORIES_MAX_WAIT = 1500;

const shell = new ShellConnection();

/** The origin of the shell, once it has connected. */
export function getShellOrigin(): string | null {
  return shell.origin;
}

function setup(channel: Channel) {
  // the page Storybook shows, once it has selected one
  let pageId: string | null = null;

  // the page of the URL, which a reload shows again together with the globals
  let urlPage = readUrlPage();

  const replaceUrl = () => {
    const params = { ...urlPage.params, globals: stringifyGlobals(getGlobals()) };
    const url = previewUrl(urlPage.id, 'docs', params);

    if (url !== location.pathname + location.search) {
      history.replaceState(history.state, '', url + location.hash);
    }
  };

  const select = (id: string) => {
    pageId = id;
    shell.ready(id);
  };

  channel.on(STORY_SPECIFIED, (selection: StorySelection) => select(selection.storyId));
  channel.on(CURRENT_STORY_WAS_SET, (selection: StorySelection) => select(selection.storyId));

  for (const event of [STORY_MISSING, STORY_ERRORED, STORY_THREW_EXCEPTION]) {
    channel.on(event, () => {
      const id = pageId ?? new URLSearchParams(location.search).get('id') ?? '';

      select(id);
      shell.error(id);
    });
  }

  watchPageRenders(channel, id => shell.rendered(id));

  shell.addEventListener('connect', () => interceptLinks(href => shell.navigate(href)), {
    once: true,
  });

  shell.addEventListener('page', event => {
    const { payload } = event as ShellMessageEvent<'page'>;

    urlPage = { id: payload.id, params: payload.params };
    replaceUrl();

    if (payload.id !== pageId) {
      channel.emit(SET_CURRENT_STORY, { storyId: payload.id, viewMode: 'docs' });
    }
  });

  shell.addEventListener('globals', event => {
    const { payload } = event as ShellMessageEvent<'globals'>;

    setGlobals(payload.globals);
    replaceUrl();
  });

  shell.addEventListener('scroll-to', event => {
    const { payload } = event as ShellMessageEvent<'scroll-to'>;
    const target = payload.hash ? document.getElementById(payload.hash) : null;

    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  });

  shell.start();
}

function readUrlPage(): UrlPage {
  const search = new URLSearchParams(location.search);
  const params: Record<string, string> = {};

  for (const [name, value] of search) {
    if (!STORYBOOK_PARAMS.has(name)) params[name] = value;
  }

  return { id: search.get('id') ?? '', params };
}

/** Calls `onRendered` once a docs page and the stories on it are rendered. */
function watchPageRenders(channel: Channel, onRendered: (pageId: string) => void) {
  const renderingStories = new Set<string>();
  let renderingPage: RenderingPage | null = null;

  const cancel = () => {
    for (const timer of renderingPage?.timers ?? []) clearTimeout(timer);
    renderingPage = null;
  };

  const finish = (page: RenderingPage) => {
    if (renderingPage !== page) return;

    cancel();
    onRendered(page.id);
  };

  channel.on(CURRENT_STORY_WAS_SET, () => {
    cancel();
    renderingStories.clear();
  });

  channel.on(DOCS_RENDERED, (id: string) => {
    cancel();

    const page: RenderingPage = { id, timers: [] };
    page.timers.push(
      window.setTimeout(() => {
        if (renderingStories.size === 0) finish(page);
      }, STORIES_START_DELAY),
      window.setTimeout(() => finish(page), STORIES_MAX_WAIT),
    );

    renderingPage = page;
  });

  channel.on(STORY_RENDER_PHASE_CHANGED, (change: RenderPhaseChange) => {
    if (!SETTLED_PHASES.has(change.newPhase)) {
      renderingStories.add(change.storyId);
      return;
    }

    const page = renderingPage;
    if (!renderingStories.delete(change.storyId) || renderingStories.size > 0 || !page) return;

    // the source blocks of the canvases appear right after their story
    requestAnimationFrame(() => {
      if (renderingStories.size === 0) finish(page);
    });
  });
}

addons.ready().then(setup);
