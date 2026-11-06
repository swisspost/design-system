// Prepares klp-real.html before the widget upgrades: environment, language, initial state and the
// KLP service. Loaded with `defer`, so the markup exists and the components module (also deferred,
// later in the document) has not defined the widget yet.
(() => {
  const params = new URLSearchParams(location.search);
  const environment = params.get('env') || 'int02';
  const lang = params.get('lang') || 'de';
  const initialState = params.get('initialState');
  // A registered app whose login creates the KLP session and sends the user to that app's host.
  const service = params.get('service') || 'kvm';

  // Same mapping as the widget's defaults: the dev and test platforms are served by int1.
  const suffix = { prod: '', int02: 'int2' }[environment] ?? 'int1';

  document.documentElement.lang = lang;

  const widget = document.querySelector('post-klp-login-widget');
  widget.setAttribute('environment', environment);
  widget.setAttribute('service', service);
  if (initialState) widget.setAttribute('initial-state', initialState);

  if (params.get('widgets') === '2') {
    const second = widget.cloneNode(true);
    second.removeAttribute('slot');
    document.getElementById('klp-real-second-widget').append(second);
  }

  const setup = {
    'Page origin': location.origin,
    'Environment': environment,
    'Platform': `https://n.account${suffix}.post.ch`,
    'Service': service,
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
