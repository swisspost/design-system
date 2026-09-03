import { getPopoverOpenSelector } from './helper/popovercontainer';

const CLOSE_BTN_ID = 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a';
const POPOVER_OPEN_SELECTOR = getPopoverOpenSelector();

describe('Close button', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('post-closebutton', CLOSE_BTN_ID);
    });

    it('should render with a close button and a11y label', () => {
      cy.get('@closebutton').should('exist');
      cy.get('@closebutton').find('.btn').should('exist');
      cy.get('@closebutton').find('span.visually-hidden').should('exist');
    });
  });

  describe('auto-close behavior', () => {
    describe('light DOM: <dialog>', () => {
      beforeEach(() => {
        cy.getComponent('post-closebutton', CLOSE_BTN_ID, 'close-dialog');
      });

      it('closes the dialog without any wiring', () => {
        cy.get('dialog').should('not.have.attr', 'open');
        cy.get('button').contains('Show dialog').click();
        cy.get('dialog').should('have.attr', 'open');

        cy.get('@closebutton').click();
        cy.get('dialog').should('not.have.attr', 'open');
      });
    });

    describe('slotted into another component: <post-banner>', () => {
      beforeEach(() => {
        cy.getComponent('post-closebutton', CLOSE_BTN_ID, 'close-banner');
      });

      it('dismisses the banner without any wiring', () => {
        cy.get('post-banner').should('exist');
        cy.get('@closebutton').click();
        cy.get('post-banner').should('not.exist');
      });
    });

    describe('rendered inside shadow DOM: <post-popover>', { baseUrl: null }, () => {
      beforeEach(() => {
        cy.visit('./cypress/fixtures/post-popover.test.html');
        cy.get('post-popover[data-hydrated][id="popover-one"]').as('popover');
        cy.get('post-popover-trigger[data-hydrated][for="popover-one"]')
          .find('button')
          .as('triggerButton');
        cy.get('@popover').find('post-closebutton').as('closebutton');
      });

      it('hides the popover using its built-in close button without any wiring', () => {
        cy.get('@triggerButton').click();
        cy.get(POPOVER_OPEN_SELECTOR).should('have.length', 1);

        cy.get('@closebutton').shadow().find('button').click();
        cy.get(POPOVER_OPEN_SELECTOR).should('not.exist');
      });
    });

    describe('post-popovercontainer', { baseUrl: null }, () => {
      beforeEach(() => {
        cy.visit('./cypress/fixtures/post-closebutton.test.html');
        cy.get('post-closebutton[data-hydrated]').as('closebutton');
      });

      it('hides the popovercontainer without any wiring', () => {
        cy.get('#open-popovercontainer').click();
        cy.get(POPOVER_OPEN_SELECTOR).should('have.id', 'close-button-popovercontainer');

        cy.get('@closebutton').shadow().find('button').click();
        cy.get(POPOVER_OPEN_SELECTOR).should('not.exist');
      });
    });

    describe('post-collapsible', { baseUrl: null }, () => {
      beforeEach(() => {
        cy.visit('./cypress/fixtures/post-collapsible.test.html');
        cy.get('#close-button-target post-collapsible[data-hydrated]').as('collapsible');
        cy.get('#close-button-target post-closebutton[data-hydrated]').as('closebutton');
      });

      it('collapses the collapsible without any wiring', () => {
        cy.get('@collapsible').should('be.visible');
        cy.get('@closebutton').shadow().find('button').click();
        cy.get('@collapsible').should('be.hidden');
      });
    });

    describe('post-accordion-item', { baseUrl: null }, () => {
      beforeEach(() => {
        cy.visit('./cypress/fixtures/post-accordion-item.test.html');
        cy.get('post-accordion-item[data-hydrated]').as('accordion-item');
        cy.get('@accordion-item').find('post-closebutton[data-hydrated]').as('closebutton');
      });

      it('collapses the accordion item without any wiring', () => {
        cy.get('@accordion-item').shadow().find('post-collapsible').should('be.visible');
        cy.get('@closebutton').shadow().find('button').click();
        cy.get('@accordion-item').shadow().find('post-collapsible').should('be.hidden');
      });
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-closebutton');
    cy.checkA11y('#root-inner', undefined, (violations) => {
      expect(violations).to.have.length(0);
    });
  });
});
