import { BOOKMARK_PATH, bookmarkUrl, decodeUrlComponent, toDocsId } from '@shared/urls';

const PREVIEW_PATH = '/iframe.html';
const STORY_SELECTOR = '.docs-story, [id^="story--"]';
const IN_PAGE_LINK_SELECTOR = '#storybook-docs a[href^="#"]';
const FILE_PATTERN = /\.[a-z0-9]+$/i;

/**
 * Hands the clicks on the links of the docs page to the shell, which opens them
 * instead of the browser. The links in its stories stay in the story.
 */
export function interceptPageLinks(shellOrigin: string, navigate: (href: string) => void): void {
  // The preview has `<base target="_parent">`, so a link would otherwise load
  // the preview URL into the shell window.
  document.addEventListener('click', (event: MouseEvent) => {
    const anchor = findFollowedLink(event);
    if (!anchor) return;

    if (event.composedPath().some(el => el instanceof Element && el.matches(STORY_SELECTOR))) {
      followStoryLink(event, anchor);
      return;
    }

    const url = new URL(anchor.href);

    if (anchor.getAttribute('href')?.startsWith('#') || isLinkToCurrentPage(url, shellOrigin)) {
      event.preventDefault();
      navigate(url.hash);
      return;
    }

    if (url.origin !== location.origin) return;

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
 * Keeps the clicks on the links of a story shown on its own inside the story,
 * like the clicks on the links of the stories on a docs page.
 */
export function interceptStoryLinks(): void {
  // A docs story that is not inline renders in its own iframe, where
  // Storybook's `<base target="_parent">` would load the links into the docs
  // page around it.
  document.querySelector('base')?.setAttribute('target', '_self');

  document.addEventListener('click', (event: MouseEvent) => {
    const anchor = findFollowedLink(event);
    if (anchor) followStoryLink(event, anchor);
  });
}

/**
 * Points the in-page links of the docs page to the shell, so that a copied link
 * or a link opened in a new tab shows the page in the shell.
 */
export function pointPageLinksToShell(shellOrigin: string): void {
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

// A link written by `pointPageLinksToShell` still leads into the page shown.
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

// The link the browser follows in this window or one of its ancestors.
function findFollowedLink(event: MouseEvent): HTMLAnchorElement | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  const anchor = event
    .composedPath()
    .find(
      (el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement && el.hasAttribute('href'),
    );

  if (!anchor || anchor.hasAttribute('download')) return null;
  if (anchor.target && !['_self', '_parent', '_top'].includes(anchor.target)) return null;

  return anchor;
}

// The links in stories are part of the demo: they must not leave the page
// shown. In-page links lead to their target in the story, the other links to
// the preview do nothing, and links to other sites are left to the browser.
function followStoryLink(event: MouseEvent, anchor: HTMLAnchorElement) {
  const url = new URL(anchor.href);
  const isInPageLink = anchor.getAttribute('href')?.startsWith('#') ?? false;

  if (!isInPageLink && url.origin !== location.origin) return;

  event.preventDefault();
  if (isInPageLink) scrollToStoryTarget(anchor, url.hash.slice(1));
}

// In-page links such as skip links: the target is scrolled to and focused, as
// the browser would do.
function scrollToStoryTarget(anchor: HTMLAnchorElement, id: string) {
  if (!id) return;

  const root = anchor.getRootNode();
  if (!(root instanceof Document || root instanceof ShadowRoot)) return;

  const target = root.getElementById(decodeUrlComponent(id));
  if (!target) return;

  target.scrollIntoView();
  target.focus({ preventScroll: true });
}
