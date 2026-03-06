// Change base location of iframe to get relative parent anchor link and not relative to iframe url.
window.addEventListener('storybook:contentReady', function () {
  const previewIframe = document.getElementById('storybook-preview-iframe');
  let links = previewIframe.contentDocument.querySelectorAll('.docs-autolink a');
  links.forEach(link => {
    const anchor = link.getAttribute('href');
    if (anchor.startsWith('#')) {
      link.setAttribute('href', `${window.parent.location.href.replace(/#.*/, '')}${anchor}`);
    }
  });
});
