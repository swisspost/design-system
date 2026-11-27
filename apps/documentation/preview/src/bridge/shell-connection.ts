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

/**
 * Talks to the shell. Dispatches a `ShellMessageEvent` for every message of the shell.
 * It sends nothing until the shell has connected, so the preview keeps working on its own.
 */
export class ShellConnection extends TypedEventTarget<ShellConnectionEventMap> {
  private shellOrigin: string | null = null;
  private listeners: AbortController | null = null;

  // the page the preview shows, once it is ready
  private pageId: string | null = null;

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

  /** The preview shows the page. The shell is told once, as soon as both are ready. */
  public ready(pageId: string): void {
    const wasReady = this.pageId !== null;

    this.pageId = pageId;
    if (!wasReady) this.sendReady();
  }

  public rendered(pageId: string): void {
    this.send('rendered', { pageId });
  }

  public error(pageId: string): void {
    this.send('error', { pageId });
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
    } else if (event.origin !== this.shellOrigin) {
      return;
    }

    this.dispatchEvent(new ShellMessageEvent(type, payload));
  };

  private sendReady() {
    if (this.pageId !== null) this.send('ready', { pageId: this.pageId });
  }

  private send<T extends PreviewMessageType>(type: T, payload: MessagePayload<T>) {
    if (this.shellOrigin) window.parent.postMessage(toEnvelope(type, payload), this.shellOrigin);
  }
}
