/**
 * The globals of a preview document.
 *
 * The docs page gets them from its URL and from the shell. Stories with `inline: false` render in
 * their own iframe inside the docs page, whose URL has no globals: they follow the docs page instead.
 */
import { compareGlobals, type Globals, parseGlobals } from '@shared/globals';

type GlobalsListener = (globals: Globals) => void;

interface GlobalsHost {
  get(): Globals;
  subscribe(listener: GlobalsListener): () => void;
}

const HOST_KEY = '__postDocsGlobals__';

const listeners = new Set<GlobalsListener>();
let globals = connect();

export function getGlobals(): Globals {
  return globals;
}

export function setGlobals(next: Globals) {
  if (compareGlobals(next, globals)) return;

  globals = next;
  for (const listener of listeners) {
    try {
      listener(next);
    } catch {
      // the listener belongs to a story iframe that is gone
      listeners.delete(listener);
    }
  }
}

/** Calls `listener` whenever the globals change, until the returned function is called. */
export function subscribeGlobals(listener: GlobalsListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function connect(): Globals {
  (window as unknown as Record<string, GlobalsHost>)[HOST_KEY] = {
    get: getGlobals,
    subscribe: subscribeGlobals,
  };

  const parentHost = getParentHost();
  if (!parentHost) return parseGlobals(new URLSearchParams(location.search).get('globals') ?? '');

  const unsubscribe = parentHost.subscribe(setGlobals);
  window.addEventListener('pagehide', unsubscribe, { once: true });
  return parentHost.get();
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
