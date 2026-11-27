import { decodeUrlComponent } from '@shared/urls';

const PREVIEW_PATH = '/iframe.html';
const STORY_SELECTOR = '.docs-story, [id^="story--"]';
const FILE_PATTERN = /\.[a-z0-9]+$/i;

/**
 * Hands the clicks on the links of the docs page to the shell, which opens them
 * instead of the browser.
 */
export function interceptLinks(navigate: (href: string) => void): void {
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
    const isInStory = path.some(el => el instanceof Element && el.matches(STORY_SELECTOR));

    if (href.startsWith('#')) {
      event.preventDefault();

      if (isInStory) followInStory(anchor, href.slice(1));
      else navigate(href);

      return;
    }

    // Other links in stories are part of the demo.
    const url = new URL(anchor.href);
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
