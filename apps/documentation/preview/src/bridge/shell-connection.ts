import {
  isEnvelope,
  type MessagePayload,
  type PreviewMessageType,
  type ShellMessageType,
  toEnvelope,
} from '@shared/bridge';

export class ShellMessageEvent<T extends ShellMessageType = ShellMessageType> extends Event {
  constructor(
    type: T,
    readonly payload: MessagePayload<T>,
  ) {
    super(type);
  }
}

/**
 * Talks to the shell. Dispatches a `ShellMessageEvent` for every message of the shell.
 * It sends nothing until the shell has connected, so the preview keeps working on its own.
 */
export class ShellConnection extends EventTarget {
  private shellOrigin: string | null = null;

  // the page the preview shows, once it is ready
  private pageId: string | null = null;

  public start() {
    window.addEventListener('message', this.onMessage);
  }

  public stop() {
    window.removeEventListener('message', this.onMessage);
    this.shellOrigin = null;
  }

  /** The preview shows the page. The shell is told once, as soon as both are ready. */
  public ready(pageId: string) {
    const wasReady = this.pageId !== null;

    this.pageId = pageId;
    if (!wasReady) this.sendReady();
  }

  public rendered(pageId: string) {
    this.send('rendered', { pageId });
  }

  public error(pageId: string) {
    this.send('error', { pageId });
  }

  public navigate(href: string) {
    this.send('navigate', { href });
  }

  private sendReady() {
    if (this.pageId !== null) this.send('ready', { pageId: this.pageId });
  }

  private send<T extends PreviewMessageType>(type: T, payload: MessagePayload<T>) {
    if (this.shellOrigin) window.parent.postMessage(toEnvelope(type, payload), this.shellOrigin);
  }

  private readonly onMessage = (event: MessageEvent) => {
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
}
