describe('Collapsible', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--collapsible');
    cy.waitForComponent('post-collapsible');
    cy.wait(500); // Wait for collapse animation to run
    cy.percySnapshot('Collapsible');
  });
});
