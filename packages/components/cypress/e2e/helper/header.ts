export const HEADER_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498';

export function getLanguageMenuTrigger() {
  return cy.get('@header').find('post-language-menu').shadow().find('post-menu-trigger button');
}

// waits until the header handled the scroll, so a "still expanded" assertion can't pass too early
// the header listens to scroll events before this function, so it already handled the scroll when the promise resolves
export function scrollAndWait(y: number) {
  cy.window().then(win => {
    const { scrollHeight, clientHeight } = win.document.scrollingElement;
    const target = Math.min(y, scrollHeight - clientHeight);

    // no scroll event is fired when the position does not change
    if (Math.round(win.scrollY) === target) return;

    return new Cypress.Promise<void>(resolve => {
      win.addEventListener('scroll', () => resolve(), { once: true });
      win.scrollTo({ top: target, behavior: 'instant' });
    });
  });
}

// retries, because the header also writes the value when its scroll max changes (ResizeObserver callback)
export function getScrollTopProperty() {
  return cy
    .document()
    .its('documentElement.style')
    .invoke('getPropertyValue', '--post-header-scroll-top');
}

export function getScrollMax() {
  return cy
    .get('@header')
    .shadow()
    .find('.scroll-max')
    .then($el => Math.ceil($el[0].getBoundingClientRect().width));
}
