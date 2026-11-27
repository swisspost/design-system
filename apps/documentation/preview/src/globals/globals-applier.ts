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

class GlobalsApplier {
  private storyGlobals: Record<string, unknown> = {};
  private appliedGlobals: Globals | null = null;
  private pendingStylesheet: HTMLLinkElement | null = null;

  public start(): void {
    globalsHost.addEventListener('globals-change', this.handleGlobalsChange);
    this.apply();

    if (isDocsView) this.observeCanvases();
  }

  /** Applies the `globals` of the story shown in a story view, e.g. `globals: { appearance: 'compact' }`. */
  public setStoryGlobals(globals: Record<string, unknown>): void {
    if (isDocsView) return;

    this.storyGlobals = globals;
    this.apply();
  }

  private readonly handleGlobalsChange = () => {
    this.apply();
  };

  private apply() {
    const globals = isDocsView
      ? globalsHost.current
      : normalizeGlobals(this.storyGlobals, globalsHost.current);
    if (this.appliedGlobals && compareGlobals(this.appliedGlobals, globals)) return;

    this.appliedGlobals = globals;
    this.setStylesheet(getStylesheetHref(globals));

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
  private setStylesheet(href: string) {
    const current = document.getElementById(STYLESHEET_ID);
    if (!current) return;

    this.pendingStylesheet?.remove();
    this.pendingStylesheet = isStylesheetApplied(current, href)
      ? null
      : this.loadStylesheet(current, href);
  }

  private loadStylesheet(current: HTMLElement, href: string): HTMLLinkElement {
    const next = current.cloneNode() as HTMLLinkElement;
    next.removeAttribute('id');
    next.setAttribute('href', href);

    const swap = () => {
      if (this.pendingStylesheet !== next) return;

      this.pendingStylesheet = null;
      current.remove();
      next.id = STYLESHEET_ID;
    };

    next.addEventListener('load', swap, { once: true });
    next.addEventListener('error', swap, { once: true });
    document.head.append(next);

    return next;
  }

  /**
   * Canvases render after the docs page, and again when React resets their classes.
   * The observer runs before the next paint, so that they never show without the globals.
   */
  private observeCanvases() {
    const observer = new MutationObserver(mutations => {
      if (this.appliedGlobals && mutations.some(isCanvasMutation)) {
        applyToCanvases(this.appliedGlobals);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}

export const globalsApplier = new GlobalsApplier();

function getStylesheetHref(globals: Pick<Globals, 'theme' | 'appearance'>): string {
  return `/styles/${globals.theme}-${globals.appearance}.css`;
}

function isStylesheetApplied(current: HTMLElement, href: string): boolean {
  const stylesheets = document.head.querySelectorAll('link[rel="stylesheet"], style');
  return current.getAttribute('href') === href && stylesheets[stylesheets.length - 1] === current;
}

function applyToCanvases(globals: Globals) {
  for (const canvas of document.querySelectorAll<HTMLElement>('.sbdocs-preview')) {
    if (canvas.dataset.colorScheme !== globals.scheme) canvas.dataset.colorScheme = globals.scheme;

    const story = canvas.querySelector<HTMLElement>('.docs-story');
    if (story) setPalette(story, globals.palette);
  }
}

function isCanvasMutation(mutation: MutationRecord): boolean {
  if (mutation.type === 'attributes') {
    return mutation.target instanceof Element && mutation.target.matches(CANVAS_SELECTOR);
  }

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
