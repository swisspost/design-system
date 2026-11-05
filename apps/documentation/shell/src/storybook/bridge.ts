import { createBrowserChannel } from 'storybook/internal/channels';
import {
  CURRENT_STORY_WAS_SET,
  DOCS_RENDERED,
  NAVIGATE_URL,
  SELECT_STORY,
  SET_CURRENT_STORY,
  STORY_SPECIFIED,
} from 'storybook/internal/core-events';
import { SHELL_SCROLL_TO_HASH } from './shell-events';

/** The id Storybook's channel looks for when it addresses the preview iframe. */
export const PREVIEW_IFRAME_ID = 'storybook-preview-iframe';

export type SelectStoryPayload = { storyId: string } | { title: string; name: string };

export interface BridgeHandlers {
  /** The preview finished rendering a docs page. */
  onDocsRendered(id: string): void;
  /** A link in the preview asks the shell to navigate (e.g. `/?path=/docs/…` or `#heading`). */
  onNavigateUrl(url: string): void;
  /** `@storybook/addon-links` asks the shell to show a story. */
  onSelectStory(payload: SelectStoryPayload): void;
}

/**
 * The only place where the shell talks to the Storybook preview.
 * It uses Storybook's postMessage channel, the same one Storybook's own manager uses.
 */
export class PreviewBridge {
  private readonly channel = createBrowserChannel({ page: 'manager' });
  private ready = false;
  private pendingPageId: string | null = null;

  constructor(handlers: BridgeHandlers) {
    // the preview announces itself with STORY_SPECIFIED, or CURRENT_STORY_WAS_SET when it reloads
    const onReady = () => {
      this.ready = true;
      if (this.pendingPageId) this.showPage(this.pendingPageId);
    };
    this.channel.on(STORY_SPECIFIED, onReady);
    this.channel.on(CURRENT_STORY_WAS_SET, onReady);

    this.channel.on(DOCS_RENDERED, (id: string) => handlers.onDocsRendered(id));
    this.channel.on(NAVIGATE_URL, (url: string) => handlers.onNavigateUrl(url));
    this.channel.on(SELECT_STORY, (payload: SelectStoryPayload) => handlers.onSelectStory(payload));
  }

  /**
   * Shows a docs page in the already loaded preview, without reloading the iframe.
   */
  showPage(id: string) {
    if (!this.ready) {
      this.pendingPageId = id;
      return;
    }

    this.pendingPageId = null;
    this.channel.emit(SET_CURRENT_STORY, { storyId: id, viewMode: 'docs' });
  }

  scrollToHash(hash: string) {
    this.channel.emit(SHELL_SCROLL_TO_HASH, hash);
  }
}
