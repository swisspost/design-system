// New spec file, or add to an existing one — doesn't depend on tabs.stories.ts.

describe('layout overflow', () => {
  beforeEach(() => {
    cy.viewport(1440, 900); // sidenav only narrows layout at desktop width
  });

  describe('.container next to post-side-navigation', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--container-and-sidenav');
      cy.get('post-tab-item[data-hydrated]', { timeout: 30000 }).should('be.visible');
    });

    it('should not overlap the side navigation', () => {
      cy.get('post-side-navigation').then($sidenav => {
        const sidenavRight = $sidenav[0].getBoundingClientRect().right;
        cy.get('post-tabs')
          .shadow()
          .find('.tabs-wrapper')
          .then($wrapper => {
            expect($wrapper[0].getBoundingClientRect().left).to.be.at.least(sidenavRight);
          });
      });
    });

    it('should not create horizontal overflow', () => {
      cy.document().then(doc => {
        expect(doc.documentElement.scrollWidth).to.be.at.most(doc.documentElement.clientWidth);
      });
    });
  });

  describe('.container-fluid next to post-side-navigation', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--container-fluid-and-sidenav');
      cy.get('post-tab-item[data-hydrated]', { timeout: 30000 }).should('be.visible');
    });

    it('should not overlap the side navigation', () => {
      cy.get('post-side-navigation').then($sidenav => {
        const sidenavRight = $sidenav[0].getBoundingClientRect().right;
        cy.get('post-tabs')
          .shadow()
          .find('.tabs-wrapper')
          .then($wrapper => {
            expect($wrapper[0].getBoundingClientRect().left).to.be.at.least(sidenavRight);
          });
      });
    });

    it('should not create horizontal overflow', () => {
      cy.document().then(doc => {
        expect(doc.documentElement.scrollWidth).to.be.at.most(doc.documentElement.clientWidth);
      });
    });
  });
});