window.onload = function () {
  new MutationObserver(function () {
    const storyAnker = document.querySelector('#storybook-preview-wrapper > a');

    if (storyAnker) {
      this.disconnect();

      // execute on next cycle to ensure the doc-title has been updated by storybook
      setTimeout(() => {
        window.dispatchEvent(new Event('storybook:ready'));
      });

      new MutationObserver(() => {
        // execute on next cycle to ensure the doc-title has been updated by storybook
        setTimeout(() => {
          window.dispatchEvent(new Event('storybook:routeChange'));
        });
      }).observe(storyAnker, { attributes: true });
    }
  }).observe(document.querySelector('#storybook-preview-wrapper'), { childList: true });
};

window.gtm = window.gtm || {};
window.__GTM__ = window.__GTM__ || {};

window.gtm.setConstant = function (name, value) {
  if (!window.__GTM__[name]) window.__GTM__[name] = value;
};

window.gtm.getEnvironment = function () {
  return (Object.entries(window.__GTM__.ENVIRONMENTS).find(([_env, hosts = '']) =>
    hosts.split(',').some(host => window.location.host.indexOf(host) === 0),
  ) ?? [window.__GTM__.ENVIRONMENT_FALLBACK])[0];
};

window.gtm.getPageTitle = function () {
  return document.head.querySelector('title')?.text ?? '';
};
