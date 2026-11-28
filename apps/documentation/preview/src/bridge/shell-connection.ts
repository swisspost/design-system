import {
  isEnvelope,
  type MessagePayload,
  type PreviewMessageType,
  type ShellMessageType,
  toEnvelope,
} from '@shared/bridge';
import { TypedEventTarget } from '@shared/events';
import type { Shortcut } from '@shared/shortcuts';

export class ShellMessageEvent<T extends ShellMessageType = ShellMessageType> extends Event {
  constructor(
    type: T,
    public readonly payload: MessagePayload<T>,
  ) {
    super(type);
  }
}

type ShellConnectionEventMap = { [T in ShellMessageType]: ShellMessageEvent<T> };

interface PageReport {
  type: 'rendered' | 'error';
  pageId: string;
}

/**
 * Talks to the shell. Dispatches a `ShellMessageEvent` for every message of the
 * shell.
 */
export class ShellConnection extends TypedEventTarget<ShellConnectionEventMap> {
  private shellOrigin: string | null = null;
  private listeners: AbortController | null = null;

  // The page the preview shows, once it is ready.
  private pageId: string | null = null;

  // What became of the last page, for a shell that connects after it.
  private pageReport: PageReport | null = null;

  /** The origin of the shell, once it has connected. */
  public get origin(): string | null {
    return this.shellOrigin;
  }

  public start(): void {
    this.listeners = new AbortController();
    window.addEventListener('message', this.handleMessage, { signal: this.listeners.signal });
  }

  public stop(): void {
    this.listeners?.abort();
    this.listeners = null;
    this.shellOrigin = null;
  }

  /**
   * Reports that the preview is ready and shows the given page. The shell
   * receives `ready` once per connection: right away if it has already
   * connected, otherwise when it connects.
   */
  public ready(pageId: string): void {
    // Only the first page is reported, the shell chooses the next ones itself.
    // A shell that connects later still receives the page shown by then.
    const wasReady = this.pageId !== null;

    this.pageId = pageId;
    if (!wasReady) this.sendReady();
  }

  public rendered(pageId: string): void {
    this.pageReport = { type: 'rendered', pageId };
    this.sendPageReport();
  }

  public error(pageId: string): void {
    this.pageReport = { type: 'error', pageId };
    this.sendPageReport();
  }

  public navigate(href: string): void {
    this.send('navigate', { href });
  }

  public shortcut(name: Shortcut): void {
    this.send('shortcut', { name });
  }

  private readonly handleMessage = (event: MessageEvent) => {
    if (event.source !== window.parent || !isEnvelope<ShellMessageType>(event.data)) return;

    const { type, payload } = event.data;

    if (type === 'connect') {
      this.shellOrigin = event.origin;
      this.sendReady();

      // The page may have rendered before the shell connected.
      if (this.pageReport?.pageId === this.pageId) this.sendPageReport();
    } else if (event.origin !== this.shellOrigin) {
      return;
    }

    this.dispatchEvent(new ShellMessageEvent(type, payload));
  };

  private sendReady() {
    if (this.pageId !== null) this.send('ready', { pageId: this.pageId });
  }

  private sendPageReport() {
    if (this.pageReport) {
      this.send(this.pageReport.type, { pageId: this.pageReport.pageId });
    }
  }

  private send<T extends PreviewMessageType>(type: T, payload: MessagePayload<T>) {
    // Nothing is sent until the shell has connected, so that the preview also
    // works on its own.
    if (this.shellOrigin) {
      window.parent.postMessage(toEnvelope(type, payload), this.shellOrigin);
    }
  }
}
