import { createBrowserChannel } from 'storybook/internal/channels';
import {
  CURRENT_STORY_WAS_SET,
  DOCS_RENDERED,
  NAVIGATE_URL,
  PREVIEW_KEYDOWN,
  SELECT_STORY,
  SET_CURRENT_STORY,
  STORY_ERRORED,
  STORY_MISSING,
  STORY_RENDER_PHASE_CHANGED,
  STORY_SPECIFIED,
  STORY_THREW_EXCEPTION,
} from 'storybook/internal/core-events';
import { DocsGlobals, sameGlobals } from './docs-globals';
import { SHELL_GLOBALS, SHELL_PAGE, SHELL_SCROLL_TO_HASH, ShellPagePayload } from './shell-events';

/** The id Storybook's channel looks for when it addresses the preview iframe. */
export const PREVIEW_IFRAME_ID = 'storybook-preview-iframe';

/** Render phases after which a story no longer changes the page (`STORY_RENDER_PHASE_CHANGED`) */
const RENDERED_PHASES = new Set(['completed', 'afterEach', 'finished', 'aborted', 'errored']);
/** Stories start rendering shortly after the docs page is rendered */
const STORIES_START_DELAY = 50;
/** A page counts as rendered after this time, even if a story is still rendering */
const STORIES_MAX_WAIT = 1500;

export type SelectStoryPayload = { storyId: string } | { title: string; name: string };

/** A key press, as the preview reports it (`PREVIEW_KEYDOWN`) and as a `KeyboardEvent` has it. */
export interface KeyPress {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

/** A docs page as the bridge sends it: its id, and its URL and params for the preview (`SHELL_PAGE`). */
export interface PreviewPage extends ShellPagePayload {
  id: string;
}

export interface BridgeHandlers {
  /** The preview finished rendering a docs page, including the stories on it. */
  onPageRendered(id: string): void;
  /** The preview could not render the page, or a story on it (it shows the error itself). */
  onPreviewError(): void;
  /** A link in the preview asks the shell to navigate (e.g. `/?path=/docs/…` or `#heading`). */
  onNavigateUrl(url: string): void;
  /** `@storybook/addon-links` asks the shell to show a story. */
  onSelectStory(payload: SelectStoryPayload): void;
  /** A key was pressed in the preview, outside form fields (e.g. ⌘K for the search). */
  onPreviewKeydown(key: KeyPress): void;
}

/**
 * The only place where the shell talks to the Storybook preview.
 * It uses Storybook's postMessage channel, the same one Storybook's own manager uses.
 */
export class PreviewBridge {
  private readonly channel = createBrowserChannel({ page: 'manager' });
  private ready = false;
  private started = false;
  /** The page the shell shows */
  private page: PreviewPage | null = null;
  private pendingPage: PreviewPage | null = null;
  /** The page whose URL and params the preview has (`SHELL_PAGE`) */
  private sentPage: PreviewPage | null = null;
  /** The globals the shell shows */
  private globals: DocsGlobals | null = null;
  /** The globals the preview has: from its URL, then from the last SHELL_GLOBALS; unknown after a reload */
  private previewGlobals: DocsGlobals | null = null;
  /** Stories of the current page that are still rendering; some start before the page is rendered */
  private readonly renderingStories = new Set<string>();
  /** The docs page that is rendered but waits for its stories */
  private settling: { id: string; timers: ReturnType<typeof setTimeout>[] } | null = null;

  constructor(handlers: BridgeHandlers) {
    // a new preview document announces itself with STORY_SPECIFIED: the first load, or a reload of the
    // iframe (e.g. a full reload by Vite in dev)
    this.channel.on(STORY_SPECIFIED, ({ storyId }: { storyId: string }) => {
      if (this.started) this.onPreviewReloaded(storyId);
      this.started = true;
      this.onReady();
    });
    // follows STORY_SPECIFIED and every SET_CURRENT_STORY
    this.channel.on(CURRENT_STORY_WAS_SET, () => this.onReady());

    // the stories of a docs page render after the page itself; it counts as rendered once they are done
    this.channel.on(DOCS_RENDERED, (id: string) => this.onDocsRendered(id, handlers));
    this.channel.on(
      STORY_RENDER_PHASE_CHANGED,
      ({ newPhase, storyId }: { newPhase: string; storyId: string }) =>
        this.onStoryPhase(storyId, newPhase, handlers),
    );
    [STORY_MISSING, STORY_ERRORED, STORY_THREW_EXCEPTION].forEach(event =>
      this.channel.on(event, () => handlers.onPreviewError()),
    );
    this.channel.on(NAVIGATE_URL, (url: string) => handlers.onNavigateUrl(url));
    this.channel.on(SELECT_STORY, (payload: SelectStoryPayload) => handlers.onSelectStory(payload));
    this.channel.on(PREVIEW_KEYDOWN, ({ event }: { event: KeyPress }) =>
      handlers.onPreviewKeydown(event),
    );
  }

  /**
   * Records what the preview is loaded with: the page and the globals of its URL.
   * The page's URL and params are sent once the preview is ready.
   */
  setInitialState(page: PreviewPage, globals: DocsGlobals) {
    this.page = page;
    this.globals = globals;
    this.previewGlobals = globals;
  }

  /**
   * Shows a docs page in the already loaded preview, without reloading the iframe.
   */
  showPage(page: PreviewPage) {
    this.page = page;
    if (!this.ready) {
      this.pendingPage = page;
      return;
    }

    this.pendingPage = null;
    this.renderingStories.clear();
    this.sendPage();
    this.channel.emit(SET_CURRENT_STORY, { storyId: page.id, viewMode: 'docs' });
  }

  /**
   * Updates the URL and params of the page the preview already shows (e.g. a new hash or query).
   */
  updatePage(page: PreviewPage) {
    this.page = page;
    if (this.ready) this.sendPage();
  }

  /**
   * Applies the globals in the preview. It restyles the page in place, without re-rendering it.
   */
  updateGlobals(globals: DocsGlobals) {
    this.globals = globals;
    if (this.ready) this.syncGlobals();
  }

  scrollToHash(hash: string) {
    this.channel.emit(SHELL_SCROLL_TO_HASH, hash);
  }

  private onReady() {
    this.ready = true;
    this.syncGlobals();
    if (this.pendingPage) this.showPage(this.pendingPage);
    else this.sendPage();
  }

  /**
   * A reload starts again from the iframe's own URL, which may hold another page and older globals
   * than the shell shows: both are sent again.
   */
  private onPreviewReloaded(storyId: string) {
    this.previewGlobals = null;
    this.sentPage = null;
    if (this.page && storyId !== this.page.id) this.pendingPage = this.page;
  }

  private onDocsRendered(id: string, handlers: BridgeHandlers) {
    this.stopSettling();
    const settling = { id, timers: [] as ReturnType<typeof setTimeout>[] };
    const done = () => {
      if (this.settling !== settling) return;
      this.stopSettling();
      handlers.onPageRendered(id);
    };

    this.settling = settling;
    settling.timers.push(
      setTimeout(() => {
        if (this.renderingStories.size === 0) done();
      }, STORIES_START_DELAY),
      setTimeout(done, STORIES_MAX_WAIT),
    );
  }

  private onStoryPhase(storyId: string, phase: string, handlers: BridgeHandlers) {
    if (!RENDERED_PHASES.has(phase)) {
      this.renderingStories.add(storyId);
      return;
    }

    const settling = this.settling;
    if (!this.renderingStories.delete(storyId) || this.renderingStories.size > 0 || !settling)
      return;

    // the source blocks of the canvases appear right after their story
    requestAnimationFrame(() => {
      if (this.settling !== settling || this.renderingStories.size > 0) return;
      this.stopSettling();
      handlers.onPageRendered(settling.id);
    });
  }

  private stopSettling() {
    this.settling?.timers.forEach(timer => clearTimeout(timer));
    this.settling = null;
  }

  private sendPage() {
    const page = this.page;
    if (!page || (this.sentPage && samePage(this.sentPage, page))) return;

    this.sentPage = page;
    const payload: ShellPagePayload = { url: page.url, params: page.params };
    this.channel.emit(SHELL_PAGE, payload);
  }

  private syncGlobals() {
    if (!this.globals) return;
    if (this.previewGlobals && sameGlobals(this.previewGlobals, this.globals)) return;

    this.previewGlobals = this.globals;
    this.channel.emit(SHELL_GLOBALS, this.globals);
  }
}

function samePage(a: PreviewPage, b: PreviewPage): boolean {
  return a.id === b.id && a.url === b.url && JSON.stringify(a.params) === JSON.stringify(b.params);
}
