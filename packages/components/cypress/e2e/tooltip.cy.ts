describe('tooltips', { baseUrl: null }, () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/tooltip/tooltip-non-focusable.html');
    cy.get('p[data-tooltip-target="t1"]').as('target1');
    cy.get('button[data-tooltip-target="t2"]').as('target2');
    cy.get('#t1').shadow().find('div[popover]').as('tooltip1');
    cy.get('#t2').shadow().find('div[popover]').as('tooltip2');
  });

  describe('default', () => {
    it('should display a tooltip', () => {
      cy.get('@tooltip2').should('not.be.visible');
      cy.get('button[data-tooltip-target="t2"]').focus();
      cy.get('@tooltip2').should('be.visible');
      cy.get('@target2').blur();
      cy.get('@target1').focus();
      cy.get('@tooltip2').should('not.be.visible');
    });

    it('tooltip placement right', () => {
      cy.get('#t2').invoke('attr', 'placement', 'right');
      cy.get('@target2').focus();
      cy.wait(10);
      cy.get('@tooltip2')
        .should('have.css', 'left')
        .then((v: any) => {
          expect(parseInt(v)).to.be.greaterThan(150);
        });
    });
  });

  describe('applying patches', () => {
    it('should add tabindex', () => {
      cy.get('@target1').should('have.attr', 'tabindex').should('eq', '0');
    });
    it('should add aria-describedby', () => {
      cy.get('@target1').should('have.attr', 'aria-describedby').should('eq', 't1');
    });
    it('should append aria-describedby without deleting existing values', () => {
      cy.get('@target2').should('have.attr', 'aria-describedby').should('eq', 'something t2');
    });
  });
});
