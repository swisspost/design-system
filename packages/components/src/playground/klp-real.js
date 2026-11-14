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
})();
