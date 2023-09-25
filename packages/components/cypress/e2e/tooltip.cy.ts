describe('tooltips', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('tooltip', 'multiple');
      cy.get('button[data-tooltip-target="tooltip-three"]:first-of-type').as('target1');
      cy.get('button[data-tooltip-target="tooltip-three"]:last-of-type').as('target2');
      cy.get('#tooltip-three').shadow().find('div[popover]').as('tooltip');
    });

    it('should display a tooltip', () => {
      cy.get('@tooltip').should('not.be.visible');
      cy.get('@target2').focus();
      cy.get('@tooltip').should('be.visible');
      cy.get('@target2').blur();
      cy.get('@tooltip').should('not.be.visible');
    });

    it('tooltip placement right', () => {
      cy.get('#tooltip-three').invoke('attr', 'placement', 'right');
      cy.get('@target2').focus();
      cy.wait(10);
      cy.get('@tooltip')
        .should('have.css', 'left')
        .then((v: any) => {
          expect(parseInt(v)).to.be.greaterThan(150);
        });
    });
  });

  describe('non-focusable element', () => {
    beforeEach(() => {
      cy.getComponent('tooltip', 'non-focusable');
      cy.get('cite[data-tooltip-target="tooltip-two"]').as('target');
    });

    it('should add tabindex', () => {
      cy.get('@target').should('have.attr', 'tabindex').should('eq', '0');
    });
  });

  describe('aria', () => {
    beforeEach(() => {
      cy.getComponent('tooltip', 'multiple');
      cy.get('button[data-tooltip-target="tooltip-three"]:first-of-type').as('target1');
      cy.get('@target1').invoke('attr', 'aria-describedby', 'existing-value');
    });

    it('should append aria-describedby without deleting existing values', () => {
      cy.get('@target1')
        .should('have.attr', 'aria-describedby')
        .should('eq', 'existing-value tooltip-three');
    });
  });
});
