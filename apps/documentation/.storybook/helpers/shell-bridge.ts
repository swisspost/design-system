import type { Args, Decorator } from '@storybook/web-components-vite';
import { addons, useArgs } from 'storybook/preview-api';
import { NAVIGATE_URL } from 'storybook/internal/core-events';
import {
  SHELL_GLOBALS,
  SHELL_PAGE,
  SHELL_SCROLL_TO_HASH,
  ShellPagePayload,
} from '../../shell/src/storybook/shell-events';
import {
  DocsGlobals,
  getGlobalsQueryParams,
  getStylesheetHref,
  normalizeGlobals,
  parseGlobalsParam,
  sameGlobals,
  stringifyGlobalsParam,
} from '../../shell/src/storybook/docs-globals';
import { parseArgsParam, stringifyArgsParam } from './story-args';

/**
 * The preview side of the documentation shell (`apps/documentation/shell`).
 *
 * Links: `iframe.html` has `<base target="_parent">`, so a plain link in a docs page would load the whole
 * shell window again (and, in the two-port dev setup, the preview origin). Internal links are handed
 * to the shell through the channel instead, which routes them without a reload.
 *
 * Globals (theme, appearance, color scheme, palette): every preview document applies them to itself.
 * - The preview embedded in the shell gets them from its URL (`globals=`) and from `SHELL_GLOBALS`.
 *   Storybook's own globals keep the values of the URL: changing them would re-render every story.
 * - The bare preview (fullscreen demo, Cypress) gets them from its URL.
 * - Stories with `inline: false` render in their own iframe inside a docs page, whose URL has no globals:
 *   they take the globals of the docs page they are in.
 * Docs pages stay light; the scheme and palette apply to the canvases (`.sbdocs-preview`, `.docs-story`).
 * Story views apply them to the whole document, together with the story's own `globals`.
 *
 * Deep links: the shell puts the page's own query params into the preview URL (`SHELL_PAGE`). A link
 * with `story` and `args` (from "Copy deep link") sets the args of that story once the page renders.
 * The canvas actions "View full screen" and "Copy deep link" build their URLs from the story's args.
 */

type GlobalsListener = (globals: DocsGlobals) => void;

interface GlobalsHost {
  get(): DocsGlobals;
  subscribe(listener: GlobalsListener): () => void;
}

interface StoryArgs {
  args: Args;
  initialArgs: Args;
}

/** How a preview document offers its globals to the story iframes inside it */
const HOST_KEY = '__swisspostDocsGlobals__';
/** How a preview document offers the args of its stories to the canvas actions of the docs page */
const STORIES_KEY = '__swisspostDocsStories__';

/** Query params of the preview URL that belong to Storybook, not to the page */
const PREVIEW_PARAMS = ['id', 'viewMode', 'globals'];

/** The design-system stylesheet in `preview-head.html` */
const STYLESHEET_ID = 'post-styles';

const PALETTE_CLASSES = ['palette-default', 'palette-alternate', 'palette-accent', 'palette-brand'];

const isBrowser = globalThis.window !== undefined;
const isFramed = isBrowser && globalThis.parent !== globalThis.window;
const isDocsView = isBrowser && new URLSearchParams(location.search).get('viewMode') === 'docs';

const listeners = new Set<GlobalsListener>();
let userGlobals: DocsGlobals = normalizeGlobals({});
/** The current story's own `globals` (story views only) */
let storyGlobals: Record<string, unknown> = {};
/** The current args of the stories rendered in this document, by story id */
const stories = new Map<string, StoryArgs>();
/** Deep links already applied, as `<preview query>|<story id>`, so later arg changes are kept */
const appliedDeepLinks = new Set<string>();
/** The shell URL of the docs page (`SHELL_PAGE`) */
let shellPageUrl: string | null = null;
/** The stylesheet of a new theme or appearance, until it has loaded */
let pendingStylesheet: HTMLLinkElement | null = null;

if (isBrowser) {
  userGlobals = connectGlobals();
  (globalThis.window as unknown as Record<string, GlobalsHost>)[HOST_KEY] = {
    get: getDocsGlobals,
    subscribe: subscribeDocsGlobals,
  };
  (globalThis.window as unknown as Record<string, Map<string, StoryArgs>>)[STORIES_KEY] = stories;

  applyGlobals();
  if (isDocsView) observeCanvases();
}

if (isFramed) {
  document.addEventListener('click', onLinkClick);
  addons.getChannel().on(SHELL_SCROLL_TO_HASH, scrollToHash);
  if (isDocsView) addons.getChannel().on(SHELL_PAGE, onShellPage);
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
 * Keeps the args of each story for the canvas actions, and applies the args of a deep link
 * (`?story=<story>&args=<args>`) to the story it names, once per link.
 */
export const withDeepLinks: Decorator = (story, context) => {
  const [, updateArgs] = useArgs();
  stories.set(context.id, { args: context.allArgs, initialArgs: context.initialArgs });

  const search = getDeepLinkSearch();
  const params = new URLSearchParams(search);
  const storyParam = params.get('story');
  const argsParam = params.get('args');
  const key = `${search}|${context.id}`;

  if (storyParam && argsParam && !appliedDeepLinks.has(key) && isStory(context, storyParam)) {
    appliedDeepLinks.add(key);
    const args = parseArgsParam(argsParam, context.args, context.argTypes);
    if (Object.entries(args).some(([name, value]) => context.args[name] !== value)) {
      updateArgs(args);
    }
  }

  return story();
};

/**
 * "View full screen": opens the story in the bare preview, with the current globals and args.
 */
export function openFullScreenDemo(event: Event) {
  const story = findCanvasStory(event.target as Element);
  if (!story) return;

  const params = new URLSearchParams({ id: story.id, viewMode: 'story' });
  const globalsParam = stringifyGlobalsParam(userGlobals);
  if (globalsParam) params.set('globals', globalsParam);
  const argsParam = stringifyArgsParam(story.args, story.initialArgs);
  if (argsParam) params.set('args', argsParam);

  globalThis.open(`${location.origin}${location.pathname}${toQuery(params)}`, '_blank');
}

/**
 * "Copy deep link": copies the shell URL of the page that opens it with the story's current args and
 * the current globals (theme, appearance, color scheme, palette).
 */
export function copyDeepLink(event: Event) {
  const button = (event.target as Element).closest('button');
  const story = findCanvasStory(event.target as Element);
  if (!story) return;

  const params = new URLSearchParams({ story: story.id.split('--').at(-1) ?? story.id });
  const argsParam = stringifyArgsParam(story.args, story.initialArgs);
  if (argsParam) params.set('args', argsParam);
  Object.entries(getGlobalsQueryParams(userGlobals)).forEach(([name, value]) =>
    params.set(name, value),
  );

  const pageUrl = shellPageUrl ?? `${location.origin}/docs/${getPreviewParam('id') ?? ''}`;
  navigator.clipboard.writeText(`${pageUrl}${toQuery(params)}#story--${story.id}`);

  if (button) {
    const text = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => (button.textContent = text), 1500);
  }
}

/**
 * The story of the canvas an action button belongs to, with its current args.
 * Stories with `inline: false` render in their own iframe, which keeps their args.
 */
function findCanvasStory(target: Element): (StoryArgs & { id: string }) | null {
  const canvas = target.closest('.docs-story');
  const id = canvas?.querySelector('[id^="story--"]')?.id.replace(/^story--/, '');
  if (!canvas || !id) return null;

  let source = stories;
  const iframe = canvas.querySelector('iframe');
  try {
    const nested = (iframe?.contentWindow as unknown as Record<string, Map<string, StoryArgs>>)?.[
      STORIES_KEY
    ];
    if (nested) source = nested;
  } catch {
    // not a preview document
  }

  return { id, ...(source.get(id) ?? { args: {}, initialArgs: {} }) };
}

/**
 * The query that holds a deep link: the docs page's own, also for stories rendered in their own iframe.
 */
function getDeepLinkSearch(): string {
  if (isDocsView) return location.search;
  if (!getParentHost()) return '';

  try {
    return globalThis.parent.location.search;
  } catch {
    return '';
  }
}

function isStory({ id, name }: { id: string; name: string }, wanted: string): boolean {
  const simplify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = simplify(wanted);
  return target === simplify(id.split('--').at(-1) ?? '') || target === simplify(name);
}

/**
 * The shell opens a page: its params go into the preview URL, where content reads them.
 */
function onShellPage({ url, params }: ShellPagePayload) {
  shellPageUrl = url;

  const current = new URLSearchParams(location.search);
  const next = new URLSearchParams();
  PREVIEW_PARAMS.forEach(name => {
    const value = current.get(name);
    if (value !== null) next.set(name, value);
  });
  Object.entries(params).forEach(([name, value]) => next.set(name, value));

  if (sortedQuery(next) === sortedQuery(current)) return;
  history.replaceState(history.state, '', `${location.pathname}${toQuery(next)}${location.hash}`);
  appliedDeepLinks.clear();
}

function getPreviewParam(name: string): string | null {
  return new URLSearchParams(location.search).get(name);
}

function sortedQuery(params: URLSearchParams): string {
  return [...params.entries()]
    .map(([name, value]) => `${name}=${value}`)
    .sort()
    .join('&');
}

/**
 * Storybook's arg and global syntax (`key:value;flag:!true`) is kept readable in URLs.
 */
function toQuery(params: URLSearchParams): string {
  const query = params.toString().replace(/%3A/gi, ':').replace(/%3B/gi, ';');
  return query ? `?${query}` : '';
}

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

  addons.getChannel().on(SHELL_GLOBALS, (globals: Record<string, unknown>) => {
    setUserGlobals(normalizeGlobals(globals, userGlobals));
    // a reload of the preview starts with them
    const params = new URLSearchParams(location.search);
    const globalsParam = stringifyGlobalsParam(userGlobals);
    if (globalsParam) params.set('globals', globalsParam);
    else params.delete('globals');
    history.replaceState(
      history.state,
      '',
      `${location.pathname}${toQuery(params)}${location.hash}`,
    );
  });

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

  setStylesheet(getStylesheetHref(globals));

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
 * Replaces the design-system stylesheet once the new one has loaded, so the page is never unstyled.
 */
function setStylesheet(href: string) {
  const current = document.getElementById(STYLESHEET_ID);
  if (!current || pendingStylesheet?.getAttribute('href') === href) return;

  pendingStylesheet?.remove();
  pendingStylesheet = null;
  if (current.getAttribute('href') === href) return;

  const next = current.cloneNode() as HTMLLinkElement;
  next.removeAttribute('id');
  next.setAttribute('href', href);
  const swap = () => {
    if (pendingStylesheet !== next) return;
    pendingStylesheet = null;
    current.remove();
    next.id = STYLESHEET_ID;
  };
  next.addEventListener('load', swap, { once: true });
  next.addEventListener('error', swap, { once: true });

  pendingStylesheet = next;
  current.after(next);
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
 * picked up as they appear. The observer runs before the next paint, so they never show unstyled.
 */
function observeCanvases() {
  const observer = new MutationObserver(applyToCanvases);

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
