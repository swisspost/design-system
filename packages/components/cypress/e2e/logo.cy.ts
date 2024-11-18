const LOGO_ID = '73066e1c-0720-4a9b-8f81-a29d4250872a';

describe('logo', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('logo', LOGO_ID);
    });

    it('should render', () => {
      cy.get('@logo').should('exist');
    });

    it('should not be a link', () => {
      cy.get('@logo').shadow().find('a').should('not.exist');
    });

    it('should contain text', () => {
      cy.get('@logo').invoke('text').should('not.be.empty');
    });

    it('should fit the parent height', () => {
      cy.get('@logo')
        .parent()
        .invoke('innerHeight')
        .then(parentHeight => {
          cy.get('@logo').invoke('outerHeight').should('eq', parentHeight);
        });
    });
  });

  describe('link', () => {
    beforeEach(() => {
      cy.getComponent('logo', LOGO_ID, 'link');
    });

    it('should be a link', () => {
      cy.get('@logo').shadow().find('a').as('link');
      cy.get('@link').should('exist');
      cy.get('@link').invoke('attr', 'href').should('not.be.empty');
    });

    it('should contain text', () => {
      cy.get('@logo').invoke('text').should('not.be.empty');
    });
  });

  describe('custom height', () => {
    beforeEach(() => {
      cy.getComponent('logo', LOGO_ID, 'height');
    });

    // it('should not fit the parent height', () => {
    //   cy.get('@logo')
    //     .parent()
    //     .invoke('innerHeight')
    //     .then(parentHeight => {
    //       cy.get('@logo').invoke('outerHeight').should('not.eq', parentHeight);
    //     });
    // });

    it('should have its own height', () => {
      cy.get('@logo').invoke('css', 'height').should('not.be.undefined');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-logo');
    cy.checkA11y('#root-inner');
  });
});
