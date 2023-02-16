describe('home', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=home--page');
    cy.percySnapshot('Home');
  });
});
