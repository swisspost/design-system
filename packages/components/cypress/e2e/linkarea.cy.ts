import ClickOptions = Cypress.ClickOptions;

describe('post-linkarea', { baseUrl: null }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-linkarea.test.html');
      cy.get('post-linkarea#without-data-link .card').as('card');
      cy.get('@card').find('a').first().as('firstLink');
    });

    it('should allow clicking on all links', () => {
      cy.get('@card')
        .find('a')
        .each($link => {
          cy.wrap($link).click();
          cy.url().should('include', $link.attr('href'));
        });
    });

    it('should delegate click to first link', () => {
      cy.get('@card').click();

      cy.get('@firstLink')
        .invoke('attr', 'href')
        .then(href => {
          cy.url().should('include', href);
        });
    });

    ['ctrlKey', 'shiftKey', 'altKey', 'metaKey'].forEach((keyOption: keyof ClickOptions) => {
      it(`should delegate the ${keyOption} option`, () => {
        cy.get('@firstLink').then($firstLink => {
          $firstLink.on('click', cy.stub().as('clickEvent'));
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

  describe('with specified link selector', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-linkarea.test.html');
      cy.get('post-linkarea#with-data-link .card').as('card');
    });

    it('should allow clicking on all links', () => {
      cy.get('@card')
        .find('a')
        .each($link => {
          cy.wrap($link).click();
          cy.url().should('include', $link.attr('href'));
        });
    });

    it('should delegate click to link with data-link attribute', () => {
      cy.get('@card').click();

      cy.get('@card')
        .find('[data-link]')
        .first()
        .invoke('attr', 'href')
        .then(href => {
          cy.url().should('include', href);
        });
    });
  });
});
