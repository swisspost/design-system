import { BOOKMARK_PATH, bookmarkUrl, decodeUrlComponent, toDocsId } from '@shared/urls';

const PREVIEW_PATH = '/iframe.html';
const STORY_SELECTOR = '.docs-story, [id^="story--"]';
const IN_PAGE_LINK_SELECTOR = '#storybook-docs a[href^="#"]';
const FILE_PATTERN = /\.[a-z0-9]+$/i;

/**
 * Hands the clicks on the links of the docs page to the shell, which opens them
 * instead of the browser.
 */
export function interceptLinks(shellOrigin: string, navigate: (href: string) => void): void {
  // The preview has `<base target="_parent">`, so a link would otherwise load
  // the preview URL into the shell window.
  document.addEventListener('click', (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const path = event.composedPath();
    const anchor = path.find(
      (el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement && el.hasAttribute('href'),
    );

    if (!anchor || anchor.hasAttribute('download')) return;
    if (anchor.target && !['_self', '_parent', '_top'].includes(anchor.target)) return;

    const href = anchor.getAttribute('href') ?? '';
    const url = new URL(anchor.href);
    const isInStory = path.some(el => el instanceof Element && el.matches(STORY_SELECTOR));

    if (href.startsWith('#') || isLinkToCurrentPage(url, shellOrigin)) {
      event.preventDefault();

      if (isInStory) followInStory(anchor, url.hash.slice(1));
      else navigate(url.hash);

      return;
    }

    // Other links in stories are part of the demo.
    if (isInStory || url.origin !== location.origin) return;

    // Relative links in the old format (`?path=/docs/…`) resolve to the
    // preview.
    if (url.pathname === PREVIEW_PATH) {
      if (!url.searchParams.has('path')) return;
      url.pathname = '/';
    } else if (FILE_PATTERN.test(url.pathname)) {
      return;
    }

    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  });
}

/**
 * Points the in-page links of the docs page to the shell, so that a copied link
 * or a link opened in a new tab shows the page in the shell.
 */
export function linkToShell(shellOrigin: string): void {
  const pageId = currentPageId();
  if (!pageId) return;

  for (const anchor of document.querySelectorAll<HTMLAnchorElement>(IN_PAGE_LINK_SELECTOR)) {
    const hash = anchor.getAttribute('href') ?? '';

    // The links in stories are part of the demo.
    if (hash.length > 1 && !anchor.closest(STORY_SELECTOR)) {
      anchor.href = shellOrigin + bookmarkUrl(pageId, { hash });
    }
  }
}

// A link written by `linkToShell` still leads to a place on the page shown.
function isLinkToCurrentPage(url: URL, shellOrigin: string): boolean {
  const pageId = url.searchParams.get('page');

  return (
    url.origin === shellOrigin &&
    url.pathname === BOOKMARK_PATH &&
    url.hash !== '' &&
    pageId !== null &&
    toDocsId(pageId) === currentPageId()
  );
}

function currentPageId(): string | null {
  return new URLSearchParams(location.search).get('id');
}

// In-page links such as skip links: the target is scrolled to and focused, as
// the browser would do.
function followInStory(anchor: HTMLAnchorElement, id: string) {
  if (!id) return;

  const root = anchor.getRootNode();
  if (!(root instanceof Document || root instanceof ShadowRoot)) return;

  const target = root.getElementById(decodeUrlComponent(id));
  if (!target) return;

  target.scrollIntoView();
  target.focus({ preventScroll: true });
}
