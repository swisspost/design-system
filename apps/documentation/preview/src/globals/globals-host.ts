/**
 * The globals of a preview document.
 *
 * The docs page gets them from its URL and from the shell. Stories with `inline: false` render in
 * their own iframe inside the docs page, whose URL has no globals: they follow the docs page instead.
 */
import { compareGlobals, type Globals, GlobalsChangeEvent, parseGlobals } from '@shared/globals';

const HOST_KEY = '__postDocsGlobals__';

class GlobalsHost extends EventTarget {
  private globals: Globals;

  constructor() {
    super();

    const parentHost = getParentHost();
    this.globals =
      parentHost?.current ??
      parseGlobals(new URLSearchParams(location.search).get('globals') ?? '');

    if (parentHost) {
      parentHost.addEventListener('globals-change', this.onParentChange);
      window.addEventListener(
        'pagehide',
        () => parentHost.removeEventListener('globals-change', this.onParentChange),
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

  private readonly onParentChange = (event: Event) => {
    this.set((event as GlobalsChangeEvent).globals);
  };
}

function getParentHost(): GlobalsHost | null {
  if (window.parent === window) return null;

  try {
    return (window.parent as unknown as Record<string, GlobalsHost | undefined>)[HOST_KEY] ?? null;
  } catch {
    // the parent is on another origin, e.g. the shell in development
    return null;
  }
}

/** Dispatches a `GlobalsChangeEvent` whenever the globals change. */
export const globalsHost = new GlobalsHost();

(window as unknown as Record<string, GlobalsHost>)[HOST_KEY] = globalsHost;
