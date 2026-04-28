const BREADCRUMBS_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028b';

describe('Extract markup', () => {
  it('should extract markup for consumer apps', () => {
    cy.visit(`/iframe.html?id=${BREADCRUMBS_ID}--default`);
    cy.get('post-breadcrumbs')
      .invoke('prop', 'outerHTML')
      .then(before => {
        cy.writeMarkup('post-breadcrumbs', before);
      });
  });
});
