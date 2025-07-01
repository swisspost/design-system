const FOOTER_ID = 'd97528b3-a9ef-4201-bf28-9caf6e8997dc';

describe('Footer', () => {
  describe('Structure & Props', () => {
    beforeEach(() => {
      cy.getComponent('footer', FOOTER_ID);
      cy.get('@footer').find('> footer h2.visually-hidden').as('label');
    });

    it('should render', () => {
      cy.get('@footer').should('exist');
    });

    it('should set label text according to "label" prop', () => {
      cy.get('@label').should('have.text', 'Footer label');
    });

    it('should render the post-accordion on mobile', () => {
      cy.viewport('iphone-3');
      cy.get('@footer').find('post-accordion').as('accordion');

      cy.get('@accordion').should('exist');
    });

    it('should have accordion-items with slotted elements on mobile', () => {
      cy.viewport('iphone-3');
      cy.get('@footer').find('post-accordion').as('accordion');
      cy.get('@accordion').find('post-accordion-item').as('accordionItems');

      cy.get('@accordionItems').should('have.length', 4);
      cy.get('@accordionItems')
        .find('slot[name="header"]')
        .each($slot => {
          const headerSlot = $slot.get(0) as HTMLSlotElement;

          expect(headerSlot.assignedElements().length).to.be.greaterThan(0);
        });
      cy.get('@accordionItems')
        .find('slot:not([name])')
        .each($slot => {
          const slotDefault = $slot.get(0) as HTMLSlotElement;

          expect(slotDefault.assignedElements().length).to.be.greaterThan(0);
        });
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations', () => {
      cy.getSnapshots('footer');
      cy.checkA11y('#root-inner');
    });
  });
});
