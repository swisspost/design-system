import {
  isEnvelope,
  type MessagePayload,
  type PreviewMessageType,
  type ShellMessageType,
  toEnvelope,
} from '@shared/bridge';
import { compareGlobals, type Globals } from '@shared/globals';

export interface PreviewPage {
  id: string;
  params: Record<string, string>;
}

export class PreviewMessageEvent<T extends PreviewMessageType = PreviewMessageType> extends Event {
  constructor(
    type: T,
    readonly payload: MessagePayload<T>,
  ) {
    super(type);
  }
}

/** Talks to the preview iframe. Dispatches a `PreviewMessageEvent` for every message of the preview. */
export class PreviewConnection extends EventTarget {
  private readonly previewOrigin: string;
  private previewPage: PreviewPage | null = null;
  private previewGlobals: Globals | null = null;
  private previewFrame: HTMLIFrameElement | null = null;
  private previewReady = false;

  private requestedPage: PreviewPage | null = null;
  private requestedGlobals: Globals | null = null;

  constructor(previewOrigin: string) {
    super();
    this.previewOrigin = previewOrigin || location.origin;
  }

  public connect(frame: HTMLIFrameElement) {
    if (this.previewFrame === frame) return;

    this.disconnect();
    this.previewFrame = frame;
    frame.addEventListener('load', this.onLoad);
    window.addEventListener('message', this.onMessage);
  }

  public disconnect() {
    window.removeEventListener('message', this.onMessage);

    this.previewFrame?.removeEventListener('load', this.onLoad);
    this.previewFrame = null;
    this.previewReady = false;
  }

  /** Shows the page in the preview once it is ready, without reloading it. */
  public showPage(page: PreviewPage) {
    this.requestedPage = page;
    this.sendPage();
  }

  /** Applies the globals to the preview once it is ready, without reloading it. */
  public setGlobals(globals: Globals) {
    this.requestedGlobals = globals;
    this.sendGlobals();
  }

  public scrollTo(hash: string) {
    if (this.previewReady) this.send('scroll-to', { hash });
  }

  private sendPage() {
    if (!this.previewReady || !this.requestedPage || this.requestedPage === this.previewPage)
      return;

    this.previewPage = this.requestedPage;
    this.send('page', this.requestedPage);
  }

  private sendGlobals() {
    if (!this.previewReady || !this.requestedGlobals) return;
    if (this.previewGlobals && compareGlobals(this.previewGlobals, this.requestedGlobals)) return;

    this.previewGlobals = this.requestedGlobals;
    this.send('globals', { globals: this.requestedGlobals });
  }

  private send<T extends ShellMessageType>(type: T, payload: MessagePayload<T>) {
    this.previewFrame?.contentWindow?.postMessage(toEnvelope(type, payload), this.previewOrigin);
  }

  // every load is a new preview document (also a reload), which waits for its own `connect`
  private readonly onLoad = () => {
    this.previewReady = false;
    this.previewPage = null;
    this.previewGlobals = null;
    this.send('connect', {});
  };

  private readonly onMessage = (event: MessageEvent) => {
    if (!this.previewFrame || event.source !== this.previewFrame.contentWindow) return;
    if (event.origin !== this.previewOrigin || !isEnvelope<PreviewMessageType>(event.data)) return;

    const { type, payload } = event.data;

    if (type === 'ready') {
      this.previewReady = true;
      this.previewPage = null;
      this.previewGlobals = null;

      // the globals first, so that the page renders with them
      this.sendGlobals();
      this.sendPage();
    }

    this.dispatchEvent(new PreviewMessageEvent(type, payload));
  };
}
