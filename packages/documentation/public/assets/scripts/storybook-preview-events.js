const previewIframe = document.body;
let footerEl = document.querySelector('.docs-footer');
let currentPage = null;

if (footerEl) {
  // if footer already exists, just emit ready event and listen for route-changes
  contentReady();
} else {
  // if footer does not exist yet, wait until its rendered, then emit contentReady event and listen for route-changes
  new MutationObserver(function () {
    footerEl = document.querySelector('.docs-footer');

    if (footerEl && isNewPage()) {
      contentReady();
      currentPage = globalThis.parent.location.href;
    }
  }).observe(previewIframe, {
    childList: true,
    subtree: true,
  });
}

function contentReady() {
  globalThis.dispatchEvent(new Event('storybook:contentReady'));
  globalThis.parent.dispatchEvent(new Event('storybook:contentReady'));
}

function isNewPage() {
  return currentPage !== globalThis.parent.location.href;
}
