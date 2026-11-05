import { createBrowserChannel } from 'storybook/internal/channels';
import {
  CURRENT_STORY_WAS_SET,
  DOCS_RENDERED,
  NAVIGATE_URL,
  PREVIEW_KEYDOWN,
  SELECT_STORY,
  SET_CURRENT_STORY,
  STORY_SPECIFIED,
  UPDATE_GLOBALS,
} from 'storybook/internal/core-events';
import { DocsGlobals, sameGlobals } from './docs-globals';
import { SHELL_SCROLL_TO_HASH } from './shell-events';

/** The id Storybook's channel looks for when it addresses the preview iframe. */
export const PREVIEW_IFRAME_ID = 'storybook-preview-iframe';

export type SelectStoryPayload = { storyId: string } | { title: string; name: string };

/** A key press, as the preview reports it (`PREVIEW_KEYDOWN`) and as a `KeyboardEvent` has it. */
export interface KeyPress {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export interface BridgeHandlers {
  /** The preview finished rendering a docs page. */
  onDocsRendered(id: string): void;
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
  private pageId: string | null = null;
  private pendingPageId: string | null = null;
  /** The globals the shell shows */
  private globals: DocsGlobals | null = null;
  /** The globals the preview has: from its URL, then from the last UPDATE_GLOBALS; unknown after a reload */
  private previewGlobals: DocsGlobals | null = null;

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

    this.channel.on(DOCS_RENDERED, (id: string) => handlers.onDocsRendered(id));
    this.channel.on(NAVIGATE_URL, (url: string) => handlers.onNavigateUrl(url));
    this.channel.on(SELECT_STORY, (payload: SelectStoryPayload) => handlers.onSelectStory(payload));
    this.channel.on(PREVIEW_KEYDOWN, ({ event }: { event: KeyPress }) =>
      handlers.onPreviewKeydown(event),
    );
  }

  /**
   * Records what the preview is loaded with: the page and the globals of its URL.
   */
  setInitialState(pageId: string, globals: DocsGlobals) {
    this.pageId = pageId;
    this.globals = globals;
    this.previewGlobals = globals;
  }

  /**
   * Shows a docs page in the already loaded preview, without reloading the iframe.
   */
  showPage(id: string) {
    this.pageId = id;
    if (!this.ready) {
      this.pendingPageId = id;
      return;
    }

    this.pendingPageId = null;
    this.channel.emit(SET_CURRENT_STORY, { storyId: id, viewMode: 'docs' });
  }

  /**
   * Applies the globals in the preview. The preview re-renders the current page with them.
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
    if (this.pendingPageId) this.showPage(this.pendingPageId);
  }

  /**
   * A reload starts again from the iframe's own URL, which may hold another page and older globals
   * than the shell shows: both are sent again.
   */
  private onPreviewReloaded(storyId: string) {
    this.previewGlobals = null;
    if (this.pageId && storyId !== this.pageId) this.pendingPageId = this.pageId;
  }

  private syncGlobals() {
    if (!this.globals) return;
    if (this.previewGlobals && sameGlobals(this.previewGlobals, this.globals)) return;

    this.previewGlobals = this.globals;
    this.channel.emit(UPDATE_GLOBALS, { globals: this.globals });
  }
}
