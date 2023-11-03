window.onload = function () {
  const previewWrapper = document.querySelector('#storybook-preview-wrapper');
  let storyAnchor = document.querySelector('#storybook-preview-wrapper > a');

  if (storyAnchor) {
    // if storyAnchor already exists, just emit ready event and listen for route-changes
    ready();
  } else {
    // if storyAnchor does not exist yet, wait until its rendered, then emit ready event and listen for route-changes
    new MutationObserver(function () {
      storyAnchor = document.querySelector('#storybook-preview-wrapper > a');

      if (storyAnchor) {
        this.disconnect();
        ready();
      }
    }).observe(previewWrapper, { childList: true });
  }

  function ready() {
    // execute on next cycle to ensure the doc-title has been updated by storybook
    setTimeout(() => {
      window.dispatchEvent(new Event('storybook:ready'));
    });

    new MutationObserver(() => {
      // execute on next cycle to ensure the doc-title has been updated by storybook
      setTimeout(() => {
        window.dispatchEvent(new Event('storybook:routeChange'));
      });
    }).observe(storyAnchor, { attributes: true });
  }
};
