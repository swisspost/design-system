const CLOSE_BTN_ID = 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a';

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
        cy.get('button').contains('Open dialog').click();
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

    describe('rendered inside shadow DOM: <post-popover>', () => {
      beforeEach(() => {
        cy.getComponent('post-closebutton', CLOSE_BTN_ID, 'close-post-popover');
      });

      it('hides the popover using its built-in close button without any wiring', () => {
        cy.get('post-popover-trigger').find('button').click();
        cy.get('post-popover').should('be.visible');

        cy.get('post-popover').find('post-closebutton').click();
        cy.get('post-popover').should('not.be.visible');
      });
    });

    describe('post-popovercontainer', () => {
      beforeEach(() => {
        cy.getComponent('post-closebutton', CLOSE_BTN_ID, 'close-post-popover-container');
      });

      it('hides the popovercontainer without any wiring', () => {
        cy.get('button').contains('Open popovercontainer').click();
        cy.get('post-popovercontainer').should('be.visible');

        cy.get('@closebutton').click();
        cy.get('post-popovercontainer').should('not.be.visible');
      });
    });

    describe('post-collapsible', () => {
      beforeEach(() => {
        cy.getComponent('post-closebutton', CLOSE_BTN_ID, 'close-collapsible');
      });

      it('collapses the collapsible without any wiring', () => {
        cy.get('post-collapsible').should('be.visible');
        cy.get('@closebutton').click();
        cy.get('post-collapsible').should('be.hidden');
      });
    });

    describe('post-accordion-item', () => {
      beforeEach(() => {
        cy.getComponent('post-closebutton', CLOSE_BTN_ID, 'close-accordion-item');
      });

      it('collapses the accordion item without any wiring', () => {
        cy.get('post-accordion-item').shadow().find('post-collapsible').should('be.visible');
        cy.get('@closebutton').click();
        cy.get('post-accordion-item').shadow().find('post-collapsible').should('be.hidden');
      });
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-closebutton');
    cy.checkA11y('#root-inner');
  });
});
