/**
 * Adapts Storybook to the shell connection: Storybook's events are reported to
 * the shell, and the shell's messages are applied to Storybook.
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
import { globalsHost } from '@preview/globals/globals-host';
import { interceptLinks, linkToShell } from './links';
import { ShellConnection, type ShellMessageEvent } from './shell-connection';
import { forwardShortcuts } from './shortcuts';

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

const ERROR_EVENTS = [STORY_MISSING, STORY_ERRORED, STORY_THREW_EXCEPTION];

// The stories of a docs page start rendering shortly after the page itself.
const STORIES_START_DELAY_MS = 50;
const STORIES_MAX_WAIT_MS = 1500;

const shell = new ShellConnection();

/**
 * The origin of the shell, once it has connected.
 */
export function getShellOrigin(): string | null {
  return shell.origin;
}

class StorybookAdapter {
  // The page Storybook shows, once it has selected one.
  private pageId: string | null = null;

  // The page of the URL, which a reload shows again together with the globals.
  private urlPage = readUrlPage();

  constructor(private readonly channel: Channel) {}

  public start(): void {
    this.reportStorybookEvents();
    this.applyShellMessages();
    shell.start();
  }

  private reportStorybookEvents() {
    this.channel.on(STORY_SPECIFIED, (selection: StorySelection) => this.select(selection.storyId));
    this.channel.on(CURRENT_STORY_WAS_SET, (selection: StorySelection) =>
      this.select(selection.storyId),
    );

    for (const event of ERROR_EVENTS) this.channel.on(event, this.handleStoryError);

    new PageRenderWatcher(this.channel, this.handlePageRendered).start();
  }

  private applyShellMessages() {
    shell.addEventListener('connect', this.handleConnect, { once: true });
    shell.addEventListener('page', this.handlePage);
    shell.addEventListener('globals', this.handleGlobals);
    shell.addEventListener('scroll-to', this.handleScrollTo);
  }

  private readonly handleStoryError = () => {
    const id = this.pageId ?? new URLSearchParams(location.search).get('id') ?? '';

    this.select(id);
    shell.error(id);
  };

  private readonly handlePageRendered = (id: string) => {
    if (shell.origin) linkToShell(shell.origin);
    shell.rendered(id);
  };

  private readonly handleConnect = () => {
    if (shell.origin) {
      interceptLinks(shell.origin, href => shell.navigate(href));
      linkToShell(shell.origin);
    }

    forwardShortcuts(name => shell.shortcut(name));
  };

  private readonly handlePage = (event: ShellMessageEvent<'page'>) => {
    this.urlPage = { id: event.payload.id, params: event.payload.params };
    this.replaceUrl();

    if (event.payload.id !== this.pageId) {
      this.channel.emit(SET_CURRENT_STORY, { storyId: event.payload.id, viewMode: 'docs' });
    }
  };

  private readonly handleGlobals = (event: ShellMessageEvent<'globals'>) => {
    globalsHost.set(event.payload.globals);
    this.replaceUrl();
  };

  private readonly handleScrollTo = (event: ShellMessageEvent<'scroll-to'>) => {
    const target = event.payload.hash ? document.getElementById(event.payload.hash) : null;

    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  };

  private select(id: string) {
    this.pageId = id;
    shell.ready(id);
  }

  private replaceUrl() {
    const params = { ...this.urlPage.params, globals: stringifyGlobals(globalsHost.current) };
    const url = previewUrl(this.urlPage.id, 'docs', params);

    if (url !== location.pathname + location.search) {
      history.replaceState(history.state, '', url + location.hash);
    }
  }
}

/**
 * Calls `onRendered` once a docs page and the stories on it are rendered.
 */
class PageRenderWatcher {
  private readonly renderingStories = new Set<string>();
  private renderingPage: RenderingPage | null = null;

  constructor(
    private readonly channel: Channel,
    private readonly onRendered: (pageId: string) => void,
  ) {}

  public start(): void {
    this.channel.on(CURRENT_STORY_WAS_SET, this.handleStoryChange);
    this.channel.on(DOCS_RENDERED, this.handleDocsRendered);
    this.channel.on(STORY_RENDER_PHASE_CHANGED, this.handleRenderPhaseChange);
  }

  private readonly handleStoryChange = () => {
    this.cancel();
    this.renderingStories.clear();
  };

  private readonly handleDocsRendered = (id: string) => {
    this.cancel();

    const page: RenderingPage = { id, timers: [] };
    page.timers.push(
      window.setTimeout(() => {
        if (this.renderingStories.size === 0) this.finish(page);
      }, STORIES_START_DELAY_MS),
      window.setTimeout(() => this.finish(page), STORIES_MAX_WAIT_MS),
    );

    this.renderingPage = page;
  };

  private readonly handleRenderPhaseChange = (change: RenderPhaseChange) => {
    if (!SETTLED_PHASES.has(change.newPhase)) {
      this.renderingStories.add(change.storyId);
      return;
    }

    const page = this.renderingPage;
    if (!this.renderingStories.delete(change.storyId) || this.renderingStories.size > 0 || !page) {
      return;
    }

    // The source blocks of the canvases appear right after their story.
    requestAnimationFrame(() => {
      if (this.renderingStories.size === 0) this.finish(page);
    });
  };

  private finish(page: RenderingPage) {
    if (this.renderingPage !== page) return;

    this.cancel();
    this.onRendered(page.id);
  }

  private cancel() {
    for (const timer of this.renderingPage?.timers ?? []) clearTimeout(timer);
    this.renderingPage = null;
  }
}

function readUrlPage(): UrlPage {
  const search = new URLSearchParams(location.search);
  const params: Record<string, string> = {};

  for (const [name, value] of search) {
    if (!STORYBOOK_PARAMS.has(name)) params[name] = value;
  }

  return { id: search.get('id') ?? '', params };
}

addons.ready().then(channel => new StorybookAdapter(channel).start());
