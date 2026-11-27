/**
 * The globals of a preview document.
 *
 * The docs page gets them from its URL and from the shell. Stories with `inline: false` render in
 * their own iframe inside the docs page, whose URL has no globals: they follow the docs page instead.
 */
import { TypedEventTarget } from '@shared/events';
import {
  compareGlobals,
  type Globals,
  GlobalsChangeEvent,
  type GlobalsEventMap,
  parseGlobals,
} from '@shared/globals';

const HOST_KEY = '__postDocsGlobals__';

declare global {
  interface Window {
    [HOST_KEY]?: GlobalsHost;
  }
}

class GlobalsHost extends TypedEventTarget<GlobalsEventMap> {
  private globals: Globals;

  constructor() {
    super();

    const parentHost = getParentHost();
    this.globals =
      parentHost?.current ??
      parseGlobals(new URLSearchParams(location.search).get('globals') ?? '');

    if (parentHost) {
      parentHost.addEventListener('globals-change', this.handleParentChange);
      window.addEventListener(
        'pagehide',
        () => parentHost.removeEventListener('globals-change', this.handleParentChange),
        { once: true },
      );
    }
  }

  get current(): Globals {
    return this.globals;
  }

  public set(globals: Globals) {
    if (compareGlobals(globals, this.globals)) return;

    this.globals = globals;
    this.dispatchEvent(new GlobalsChangeEvent(globals));
  }

  private readonly handleParentChange = (event: GlobalsChangeEvent) => {
    this.set(event.globals);
  };
}

function getParentHost(): GlobalsHost | null {
  if (window.parent === window) return null;

  try {
    return window.parent[HOST_KEY] ?? null;
  } catch {
    // the parent is on another origin, e.g. the shell in development
    return null;
  }
}

/** Dispatches a `GlobalsChangeEvent` whenever the globals change. */
export const globalsHost = new GlobalsHost();

window[HOST_KEY] = globalsHost;
