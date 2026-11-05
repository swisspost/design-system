import { addons } from 'storybook/preview-api';
import { NAVIGATE_URL } from 'storybook/internal/core-events';
import { SHELL_SCROLL_TO_HASH } from '../../shell/src/storybook/shell-events';

/**
 * The preview side of the documentation shell (`apps/documentation/shell`).
 *
 * `iframe.html` has `<base target="_parent">`, so a plain link in a docs page would load the whole
 * shell window again (and, in the two-port dev setup, the preview origin). Internal links are handed
 * to the shell through the channel instead, which routes them without a reload.
 */

const isFramed = globalThis.window !== undefined && globalThis.parent !== globalThis.window;

if (isFramed) {
  document.addEventListener('click', onLinkClick);
  addons.getChannel().on(SHELL_SCROLL_TO_HASH, scrollToHash);
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
