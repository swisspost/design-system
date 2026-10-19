export const HEADER_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498';

export function getLanguageMenuTrigger() {
  return cy.get('@header').find('post-language-menu').shadow().find('post-menu-trigger button');
}

// waits until the header handled the scroll, so a "still expanded" assertion can't pass too early
export function scrollAndWait(y: number) {
  cy.scrollTo(0, y);
  cy.document()
    .its('documentElement.style')
    .invoke('getPropertyValue', '--post-header-scroll-top')
    .should('eq', `${y}px`);
}
