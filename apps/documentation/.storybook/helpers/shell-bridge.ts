import type { Decorator } from '@storybook/web-components-vite';
import { addons } from 'storybook/preview-api';
import { NAVIGATE_URL, UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { SHELL_SCROLL_TO_HASH } from '../../shell/src/storybook/shell-events';
import {
  DocsGlobals,
  getStylesheetHref,
  normalizeGlobals,
  parseGlobalsParam,
  sameGlobals,
} from '../../shell/src/storybook/docs-globals';

/**
 * The preview side of the documentation shell (`apps/documentation/shell`).
 *
 * Links: `iframe.html` has `<base target="_parent">`, so a plain link in a docs page would load the whole
 * shell window again (and, in the two-port dev setup, the preview origin). Internal links are handed
 * to the shell through the channel instead, which routes them without a reload.
 *
 * Globals (theme, appearance, color scheme, palette): every preview document applies them to itself.
 * - The preview embedded in the shell gets them from its URL (`globals=`) and from `UPDATE_GLOBALS`.
 * - The bare preview (fullscreen demo, Cypress) gets them from its URL.
 * - Stories with `inline: false` render in their own iframe inside a docs page, whose URL has no globals:
 *   they take the globals of the docs page they are in.
 * Docs pages stay light; the scheme and palette apply to the canvases (`.sbdocs-preview`, `.docs-story`).
 * Story views apply them to the whole document, together with the story's own `globals`.
 */

type GlobalsListener = (globals: DocsGlobals) => void;

interface GlobalsHost {
  get(): DocsGlobals;
  subscribe(listener: GlobalsListener): () => void;
}

/** How a preview document offers its globals to the story iframes inside it */
const HOST_KEY = '__swisspostDocsGlobals__';

const PALETTE_CLASSES = ['palette-default', 'palette-alternate', 'palette-accent', 'palette-brand'];

const isBrowser = globalThis.window !== undefined;
const isFramed = isBrowser && globalThis.parent !== globalThis.window;
const isDocsView = isBrowser && new URLSearchParams(location.search).get('viewMode') === 'docs';

const listeners = new Set<GlobalsListener>();
let userGlobals: DocsGlobals = normalizeGlobals({});
/** The current story's own `globals` (story views only) */
let storyGlobals: Record<string, unknown> = {};

if (isBrowser) {
  userGlobals = connectGlobals();
  (globalThis.window as unknown as Record<string, GlobalsHost>)[HOST_KEY] = {
    get: getDocsGlobals,
    subscribe: subscribeDocsGlobals,
  };

  applyGlobals();
  if (isDocsView) observeCanvases();
}

if (isFramed) {
  document.addEventListener('click', onLinkClick);
  addons.getChannel().on(SHELL_SCROLL_TO_HASH, scrollToHash);
}

/**
 * The globals chosen in the shell toolbar, without the `globals` of individual stories.
 */
export function getDocsGlobals(): DocsGlobals {
  return userGlobals;
}

/**
 * Calls `listener` whenever the globals change. Returns a function that removes it.
 */
export function subscribeDocsGlobals(listener: GlobalsListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Applies a story's own `globals` (e.g. `globals: { appearance: 'compact' }`) in story views.
 * In docs pages they are ignored: the stylesheet is shared by all stories of the page.
 */
export const withShellGlobals: Decorator = (story, context) => {
  if (context.viewMode === 'story') {
    const before = getAppliedGlobals();
    storyGlobals = context.storyGlobals ?? {};
    if (!sameGlobals(before, getAppliedGlobals())) applyGlobals();
  }

  return story();
};

/**
 * Reads the initial globals and keeps them up to date.
 */
function connectGlobals(): DocsGlobals {
  const parentHost = getParentHost();
  if (parentHost) {
    const unsubscribe = parentHost.subscribe(setUserGlobals);
    globalThis.addEventListener('pagehide', unsubscribe);
    return parentHost.get();
  }

  addons
    .getChannel()
    .on(UPDATE_GLOBALS, ({ globals }: { globals: Record<string, unknown> }) =>
      setUserGlobals(normalizeGlobals(globals, userGlobals)),
    );

  const param = new URLSearchParams(location.search).get('globals') ?? '';
  return normalizeGlobals(parseGlobalsParam(param));
}

/**
 * The globals host of the docs page this story iframe is rendered in, if any.
 */
function getParentHost(): GlobalsHost | undefined {
  if (!isFramed) return undefined;

  try {
    return (globalThis.parent as unknown as Record<string, GlobalsHost | undefined>)[HOST_KEY];
  } catch {
    // the parent is the shell on another origin (two-port dev setup)
    return undefined;
  }
}

function setUserGlobals(globals: DocsGlobals) {
  if (sameGlobals(globals, userGlobals)) return;

  userGlobals = globals;
  applyGlobals();
  listeners.forEach(listener => {
    try {
      listener(globals);
    } catch {
      // the listener belongs to a story iframe that is gone
      listeners.delete(listener);
    }
  });
}

function getAppliedGlobals(): DocsGlobals {
  return isDocsView ? userGlobals : normalizeGlobals(storyGlobals, userGlobals);
}

function applyGlobals() {
  const globals = getAppliedGlobals();

  const stylesheet = document.getElementById('post-styles');
  const href = getStylesheetHref(globals);
  if (stylesheet && stylesheet.getAttribute('href') !== href) stylesheet.setAttribute('href', href);

  if (isDocsView) {
    document.documentElement.dataset.colorScheme = 'light';
    applyToCanvases();
  } else {
    document.documentElement.dataset.colorScheme = globals.scheme;
    // the default palette is the page itself, so story views look as they do without the shell
    setPalette(document.body, globals.palette === 'default' ? null : globals.palette);
  }
}

/**
 * Docs canvases follow the scheme and palette; `preview.scss` styles the canvas toolbar for both schemes.
 */
function applyToCanvases() {
  document.querySelectorAll<HTMLElement>('.sbdocs-preview').forEach(canvas => {
    if (canvas.dataset.colorScheme !== userGlobals.scheme) {
      canvas.dataset.colorScheme = userGlobals.scheme;
    }
    const story = canvas.querySelector<HTMLElement>('.docs-story');
    if (story) setPalette(story, userGlobals.palette);
  });
}

/**
 * Canvases are rendered after the docs page (and again when content tabs switch), so they are
 * picked up as they appear.
 */
function observeCanvases() {
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyToCanvases();
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
}

function setPalette(element: HTMLElement, palette: string | null) {
  const wanted = palette ? `palette-${palette}` : null;
  const stale = PALETTE_CLASSES.filter(name => name !== wanted && element.classList.contains(name));
  if (stale.length) element.classList.remove(...stale);

  if (wanted && !element.classList.contains(wanted)) element.classList.add('palette', wanted);
  if (!wanted && element.classList.contains('palette')) element.classList.remove('palette');
}

function onLinkClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const anchor = event
    .composedPath()
    .find(
      (el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement && el.hasAttribute('href'),
    );
  if (!anchor || anchor.hasAttribute('download')) return;
  if (anchor.target && !['_parent', '_top', '_self'].includes(anchor.target)) return;

  const href = anchor.getAttribute('href') ?? '';

  // heading links (e.g. the table of contents and the autolink icons)
  if (href.startsWith('#')) {
    event.preventDefault();
    scrollToHash(href);
    addons.getChannel().emit(NAVIGATE_URL, href);
    return;
  }

  // docs links in the old manager format, e.g. `/?path=/docs/<id>--docs#heading`
  const url = new URL(anchor.href);
  if (url.origin === location.origin && url.pathname === '/' && url.searchParams.has('path')) {
    event.preventDefault();
    addons.getChannel().emit(NAVIGATE_URL, `/${url.search}${url.hash}`);
  }
}

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  const target = id ? document.getElementById(id) : null;

  if (target) target.scrollIntoView();
  else globalThis.scrollTo(0, 0);
}
