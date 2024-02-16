const TOOLTIP_ID = 'cd684d90-e7a7-41a9-8923-b1b72ad9b384';

describe('tooltips', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('tooltip', TOOLTIP_ID, 'multiple');
      cy.get('button[data-tooltip-target="tooltip-multiple"]:first-of-type').as('target1');
      cy.get('button[data-tooltip-target="tooltip-multiple"]:last-of-type').as('target2');
      cy.get('#tooltip-multiple').find('div[popover]').as('tooltip');
      cy.get('#storybook-root').invoke('attr', 'style', 'overflow: visible', { force: true });
    });

    it('should display a tooltip', () => {
      cy.get('@tooltip').should('not.be.visible');
      cy.get('@target2').focus();
      // Checking if a popover is open is a bit tricky, but it either matches the pseudo selector :popover-open
      // or the polyfill sets the class :popover-open (a bit tricky to escape)
      // https://github.com/oddbird/popover-polyfill#caveats
      // prettier-ignore
      cy.get('.\\:popover-open, :popover-open').should('exist');
      cy.get('@target2').blur();
      cy.get('@tooltip').should('not.be.visible');
    });

    it('tooltip placement right', () => {
      cy.get('#tooltip-multiple').invoke('attr', 'placement', 'right');
      cy.get('@target2').focus();
      cy.wait(10);
      cy.get('@tooltip')
        .should('have.css', 'left')
        .then((v: unknown) => {
          expect(parseInt(v as string)).to.be.greaterThan(150);
        });
    });
  });

  describe('non-focusable element', () => {
    beforeEach(() => {
      cy.getComponent('tooltip', TOOLTIP_ID, 'non-focusable');
      cy.get('cite[data-tooltip-target="tooltip-non-focusable"]').as('target');
    });

    it('should add tabindex', () => {
      cy.get('@target').should('have.attr', 'tabindex').should('eq', '0');
    });
  });

  describe('aria', () => {
    beforeEach(() => {
      cy.getComponent('tooltip', TOOLTIP_ID, 'multiple');
      cy.get('button[data-tooltip-target="tooltip-multiple"]:first-of-type').as('target1');
      cy.get('@target1').invoke('attr', 'aria-describedby', 'existing-value');
    });

    it('should append aria-describedby without deleting existing values', () => {
      cy.get('@target1')
        .should('have.attr', 'aria-describedby')
        .should('eq', 'existing-value tooltip-multiple');
    });
  });
});
