describe('layout overflow', () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  const containers = [
    { name: '.container next to post-side-navigation', storyId: 'snapshots--container-and-sidenav' },
    {
      name: '.container-fluid next to post-side-navigation',
      storyId: 'snapshots--container-fluid-and-sidenav',
    },
  ];

  containers.forEach(({ name, storyId }) => {
    describe(name, () => {
      beforeEach(() => {
        cy.visit(`/iframe.html?id=${storyId}`);
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
});