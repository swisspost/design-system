describe('Flex', () => {
  it('direction', () => {
    cy.visit('/iframe.html?id=snapshots--direction');
    cy.get('.flex-direction-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex direction', { widths: [320, 1440] });
  });

  it('align items', () => {
    cy.visit('/iframe.html?id=snapshots--align-items');
    cy.get('.flex-align-items-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex align items', { widths: [320, 1440] });
  });

  it('justify content', () => {
    cy.visit('/iframe.html?id=snapshots--justify-content');
    cy.get('.flex-justify-content-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex justify content', { widths: [320, 1440] });
  });

  it('align self', () => {
    cy.visit('/iframe.html?id=snapshots--align-self');
    cy.get('.flex-align-self-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex align self', { widths: [320, 1440] });
  });

  it('grow and shrink', () => {
    cy.visit('/iframe.html?id=snapshots--grow-shrink');
    cy.get('.flex-grow-shrink-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex grow and shrink', { widths: [320, 1440] });
  });

  it('align content', () => {
    cy.visit('/iframe.html?id=snapshots--align-content');
    cy.get('.flex-align-content-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex align content', { widths: [320, 1440] });
  });

  it('wrap', () => {
    cy.visit('/iframe.html?id=snapshots--wrap');
    cy.get('.flex-wrap-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex wrap', { widths: [320, 1440] });
  });

  it('order', () => {
    cy.visit('/iframe.html?id=snapshots--order');
    cy.get('.flex-order-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex order', { widths: [320, 1440] });
  });

  it('fill', () => {
    cy.visit('/iframe.html?id=snapshots--fill');
    cy.get('.flex-fill-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex fill', { widths: [320, 1440] });
  });
});
