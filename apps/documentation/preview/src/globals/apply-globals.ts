/**
 * Applies the globals to the preview document.
 *
 * Docs pages stay light: the scheme and palette only apply to the canvases of the stories.
 * Story views apply them to the whole document, together with the story's own `globals`.
 */
import {
  compareGlobals,
  GLOBAL_DEFINITIONS,
  type Globals,
  normalizeGlobals,
} from '@shared/globals';
import { globalsHost } from './globals-host';

const STYLESHEET_ID = 'post-styles';
const CANVAS_SELECTOR = '.sbdocs-preview, .docs-story';
const PALETTE_CLASSES = Object.keys(GLOBAL_DEFINITIONS.palette.options).map(
  palette => `palette-${palette}`,
);

const isDocsView = new URLSearchParams(location.search).get('viewMode') === 'docs';

let storyGlobals: Partial<Globals> = {};
let appliedGlobals: Globals | null = null;
let pendingStylesheet: HTMLLinkElement | null = null;

export function startApplyingGlobals() {
  globalsHost.addEventListener('globals-change', applyGlobals);
  applyGlobals();

  if (isDocsView) observeCanvases();
}

/** Applies the `globals` of the story shown in a story view, e.g. `globals: { appearance: 'compact' }`. */
export function setStoryGlobals(globals: Partial<Globals>) {
  if (isDocsView) return;

  storyGlobals = globals;
  applyGlobals();
}

export function getStylesheetHref(globals: Pick<Globals, 'theme' | 'appearance'>): string {
  return `/styles/${globals.theme}-${globals.appearance}.css`;
}

function applyGlobals() {
  const globals = isDocsView
    ? globalsHost.current
    : normalizeGlobals(storyGlobals, globalsHost.current);
  if (appliedGlobals && compareGlobals(appliedGlobals, globals)) return;

  appliedGlobals = globals;
  setStylesheet(getStylesheetHref(globals));

  if (isDocsView) {
    document.documentElement.dataset.colorScheme = 'light';
    applyToCanvases(globals);
  } else {
    document.documentElement.dataset.colorScheme = globals.scheme;
    // the default palette is the page itself, so that stories look the same as without the shell
    setPalette(document.body, globals.palette === 'default' ? null : globals.palette);
  }
}

/**
 * Replaces the stylesheet once the new one has loaded, so that the page is never unstyled.
 * It is kept last in the head: the design-system styles must win over the docs styles, which are injected after `preview-head.html`.
 */
function setStylesheet(href: string) {
  const current = document.getElementById(STYLESHEET_ID);
  if (!current) return;

  pendingStylesheet?.remove();
  pendingStylesheet = null;

  const stylesheets = document.head.querySelectorAll('link[rel="stylesheet"], style');
  const isLast = stylesheets[stylesheets.length - 1] === current;
  if (current.getAttribute('href') === href && isLast) return;

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
  document.head.append(next);
}

function applyToCanvases(globals: Globals) {
  for (const canvas of document.querySelectorAll<HTMLElement>('.sbdocs-preview')) {
    if (canvas.dataset.colorScheme !== globals.scheme) canvas.dataset.colorScheme = globals.scheme;

    const story = canvas.querySelector<HTMLElement>('.docs-story');
    if (story) setPalette(story, globals.palette);
  }
}

/**
 * Canvases render after the docs page, and again when React resets their classes.
 * The observer runs before the next paint, so that they never show without the globals.
 */
function observeCanvases() {
  const observer = new MutationObserver(mutations => {
    if (appliedGlobals && mutations.some(isCanvasMutation)) applyToCanvases(appliedGlobals);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
}

function isCanvasMutation(mutation: MutationRecord): boolean {
  if (mutation.type === 'attributes') return (mutation.target as Element).matches(CANVAS_SELECTOR);

  return [...mutation.addedNodes].some(
    node =>
      node instanceof Element &&
      (node.matches(CANVAS_SELECTOR) || node.querySelector(CANVAS_SELECTOR) !== null),
  );
}

// the classes only change when needed, any change of a canvas class notifies the observer again
function setPalette(element: HTMLElement, palette: string | null) {
  const paletteClass = palette ? `palette-${palette}` : null;
  const staleClasses = PALETTE_CLASSES.filter(
    name => name !== paletteClass && element.classList.contains(name),
  );

  if (staleClasses.length > 0) element.classList.remove(...staleClasses);

  if (paletteClass && !element.classList.contains(paletteClass)) {
    element.classList.add('palette', paletteClass);
  } else if (!paletteClass && element.classList.contains('palette')) {
    element.classList.remove('palette');
  }
}
