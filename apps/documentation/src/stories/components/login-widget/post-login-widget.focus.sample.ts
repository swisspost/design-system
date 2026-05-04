const widget = document.querySelector('post-login-widget') as HTMLPostLoginWidgetElement;

widget.addEventListener('postLoginChange', (e) => {
  if (e.detail.authenticated === false) {
    // User logged out: move focus to login link
    const loginLink = widget.querySelector('[slot="unauthenticated"]');
    loginLink?.focus();
  }
});
