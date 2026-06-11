const PROGRESSBAR_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

describe('Progressbar', () => {
  beforeEach(() => {
    cy.getComponent('progressbar', PROGRESSBAR_ID);
  });

  describe('Structure & Props', () => {
    it('should render', () => {
      cy.get('@progressbar').should('exist');
      cy.get('@progressbar').find('.progress-value').should('exist');
    });

    it('should expose aria attributes from the current fixture', () => {
      cy.get('@progressbar')
        .should('have.attr', 'role', 'progressbar')
        .and('have.attr', 'aria-valuemin', '0')
        .and('have.attr', 'aria-valuemax', '17')
        .and('have.attr', 'aria-valuenow', '11')
        .and('have.attr', 'aria-valuetext', '11 of 17');
    });

    it('should update aria values and fill percentage when min, max, and value change', () => {
      cy.get('@progressbar').invoke('attr', 'min', '10');
      cy.get('@progressbar').invoke('attr', 'max', '20');
      cy.get('@progressbar').invoke('attr', 'value', '15');

      cy.get('@progressbar')
        .should('have.attr', 'aria-valuemin', '10')
        .and('have.attr', 'aria-valuemax', '20')
        .and('have.attr', 'aria-valuenow', '15');

      cy.get('@progressbar')
        .find('.progress-value')
        .should('have.attr', 'style')
        .and('contain', '--post-progressbar-value: 50%');
    });

    it('should reflect aria-valuetext updates on the host element', () => {
      cy.get('@progressbar')
        .invoke('attr', 'aria-valuetext', '15 of 20 packages')
        .should('have.attr', 'aria-valuetext', '15 of 20 packages');
    });

    it('should fall back to the effective minimum when the value attribute is removed', () => {
      cy.get('@progressbar').invoke('attr', 'min', '10');
      cy.get('@progressbar').invoke('attr', 'max', '20');
      cy.get('@progressbar').invoke('removeAttr', 'value');

      cy.get('@progressbar').should('have.attr', 'aria-valuenow', '10');
      cy.get('@progressbar')
        .find('.progress-value')
        .should('have.attr', 'style')
        .and('contain', '--post-progressbar-value: 0%');
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('#root-inner');
    });
  });
});
