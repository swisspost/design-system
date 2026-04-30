import ClickOptions = Cypress.ClickOptions;

describe('post-linkarea', { baseUrl: null }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-linkarea.test.html');
      cy.get('post-linkarea.card').as('card');
      cy.get('@card').find('a').as('link');
    });

    it('should delegate click to link', () => {
      cy.get('@card').click();

      cy.get('@link')
        .invoke('attr', 'href')
        .then(href => {
          cy.url().should('include', href);
        });
    });

    ['ctrlKey', 'shiftKey', 'altKey', 'metaKey'].forEach((keyOption: keyof ClickOptions) => {
      it(`should delegate the ${keyOption} option`, () => {
        cy.get('@link').then($link => {
          $link.on('click', cy.stub().as('clickEvent'));
        });

        cy.get('@card').click({ [keyOption]: true });

        cy.get('@clickEvent').should(
          'have.been.calledOnceWith',
          Cypress.sinon.match(event => {
            return event[keyOption] === true;
          }),
        );
      });
    });
  });
});
