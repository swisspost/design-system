// Prepares klp-real.html before the widget upgrades: environment, initial state and the real
// platform routes for every slot. Loaded with `defer`, so the markup exists and the components
// module (also deferred, later in the document) has not defined the widget yet.
(() => {
  const params = new URLSearchParams(location.search);
  const environment = params.get('env') || 'int02';
  const lang = params.get('lang') || 'de';
  const initialState = params.get('initialState');
  // A registered app whose login creates the KLP session. Without one, the IdP falls back to its
  // default app (PostOne on INT2 since 2026-10-28), which does not.
  const app = params.get('app') ?? 'kvm';

  // Same mapping as the widget's KLP_BASE_URLS: the dev and test platforms are served by int1.
  const suffix = { prod: '', int02: 'int2' }[environment] ?? 'int1';
  const account = `https://account${suffix}.post.ch`;
  const service = `https://service${suffix}.post.ch`;

  // KLP sends the user to the app's own host after login, not back here.
  const appParams = app ? `&app=${app}&service=${app}` : '';
  const routes = {
    login: `${account}/idp/?login&lang=${lang}${appParams}`,
    logout: `${account}/logout/?lang=${lang}&inIframe=false`,
    switch: `${account}/logout/?lang=${lang}&inIframe=false&changecompany=true`,
    profile: `${account}/selfadmin/?lang=${lang}`,
    messages: `${account}/selfadmin/messages/?lang=${lang}`,
    settings: `${service}/kvm/app/ui/settings?lang=${lang}`,
  };

  document.documentElement.lang = lang;

  const widget = document.querySelector('post-klp-login-widget');
  widget.setAttribute('environment', environment);
  if (initialState) widget.setAttribute('initial-state', initialState);

  widget.querySelectorAll('[data-klp-route]').forEach(element => {
    const url = routes[element.dataset.klpRoute];
    element.setAttribute(element.localName === 'a' ? 'href' : 'url', url);
  });

  if (params.get('widgets') === '2') {
    const second = widget.cloneNode(true);
    second.removeAttribute('slot');
    document.getElementById('klp-real-second-widget').append(second);
  }

  const setup = {
    'Page origin': location.origin,
    'Environment': environment,
    'Platform': `https://n.account${suffix}.post.ch`,
    'Login': routes.login,
  };
  const list = document.getElementById('klp-real-setup');
  Object.entries(setup).forEach(([term, value]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = term;
    dd.textContent = value;
    list.append(dt, dd);
  });
})();
