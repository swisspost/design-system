import {
  isEnvelope,
  type MessagePayload,
  type PreviewMessageType,
  type ShellMessageType,
  toEnvelope,
} from '@shared/bridge';
import { TypedEventTarget } from '@shared/events';
import { compareGlobals, type Globals } from '@shared/globals';

export interface PreviewPage {
  id: string;
  params: Record<string, string>;
}

export class PreviewMessageEvent<T extends PreviewMessageType = PreviewMessageType> extends Event {
  constructor(
    type: T,
    public readonly payload: MessagePayload<T>,
  ) {
    super(type);
  }
}

type PreviewConnectionEventMap = { [T in PreviewMessageType]: PreviewMessageEvent<T> };

/** Talks to the preview iframe. Dispatches a `PreviewMessageEvent` for every message of the preview. */
export class PreviewConnection extends TypedEventTarget<PreviewConnectionEventMap> {
  private readonly previewOrigin: string;
  private previewPage: PreviewPage | null = null;
  private previewGlobals: Globals | null = null;
  private previewFrame: HTMLIFrameElement | null = null;
  private isPreviewReady = false;
  private listeners: AbortController | null = null;

  private requestedPage: PreviewPage | null = null;
  private requestedGlobals: Globals | null = null;

  constructor(previewOrigin: string) {
    super();
    this.previewOrigin = previewOrigin || location.origin;
  }

  public connect(frame: HTMLIFrameElement): void {
    if (this.previewFrame === frame) return;

    this.disconnect();
    this.previewFrame = frame;
    this.listeners = new AbortController();
    const signal = this.listeners.signal;

    frame.addEventListener('load', this.handleLoad, { signal });
    window.addEventListener('message', this.handleMessage, { signal });
  }

  public disconnect(): void {
    this.listeners?.abort();
    this.listeners = null;
    this.previewFrame = null;
    this.isPreviewReady = false;
  }

  /** Shows the page in the preview once it is ready, without reloading it. */
  public showPage(page: PreviewPage): void {
    this.requestedPage = page;
    this.sendPage();
  }

  /** Applies the globals to the preview once it is ready, without reloading it. */
  public setGlobals(globals: Globals): void {
    this.requestedGlobals = globals;
    this.sendGlobals();
  }

  public scrollTo(hash: string): void {
    if (this.isPreviewReady) this.send('scroll-to', { hash });
  }

  // every load is a new preview document (also a reload), which waits for its own `connect`
  private readonly handleLoad = () => {
    this.isPreviewReady = false;
    this.previewPage = null;
    this.previewGlobals = null;
    this.send('connect', {});
  };

  private readonly handleMessage = (event: MessageEvent) => {
    if (!this.previewFrame || event.source !== this.previewFrame.contentWindow) return;
    if (event.origin !== this.previewOrigin || !isEnvelope<PreviewMessageType>(event.data)) return;

    const { type, payload } = event.data;

    if (type === 'ready') {
      this.isPreviewReady = true;
      this.previewPage = null;
      this.previewGlobals = null;

      // the globals first, so that the page renders with them
      this.sendGlobals();
      this.sendPage();
    }

    this.dispatchEvent(new PreviewMessageEvent(type, payload));
  };

  private sendPage() {
    if (!this.isPreviewReady || !this.requestedPage || this.requestedPage === this.previewPage) {
      return;
    }

    this.previewPage = this.requestedPage;
    this.send('page', this.requestedPage);
  }

  private sendGlobals() {
    if (!this.isPreviewReady || !this.requestedGlobals) return;
    if (this.previewGlobals && compareGlobals(this.previewGlobals, this.requestedGlobals)) return;

    this.previewGlobals = this.requestedGlobals;
    this.send('globals', { globals: this.requestedGlobals });
  }

  private send<T extends ShellMessageType>(type: T, payload: MessagePayload<T>) {
    this.previewFrame?.contentWindow?.postMessage(toEnvelope(type, payload), this.previewOrigin);
  }
}
