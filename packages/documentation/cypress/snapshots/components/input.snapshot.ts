describe('Input', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--inputtext');
    cy.percySnapshot('Inputs-Text', { widths: [320, 1024] });
    cy.visit('/iframe.html?id=snapshots--inputpassword');
    cy.percySnapshot('Inputs-Password', { widths: [320, 1024] });
    cy.visit('/iframe.html?id=snapshots--inputdate');
    cy.percySnapshot('Inputs-Date', { widths: [320, 1024] });
    cy.visit('/iframe.html?id=snapshots--inputdatetimelocal');
    cy.percySnapshot('Inputs-Datetime-local', { widths: [320, 1024] });
    cy.visit('/iframe.html?id=snapshots--inputmonth');
    cy.percySnapshot('Inputs-Month', { widths: [320, 1024] });
    cy.visit('/iframe.html?id=snapshots--inputweek');
    cy.percySnapshot('Inputs-Week', { widths: [320, 1024] });
    cy.visit('/iframe.html?id=snapshots--inputtime');
    cy.percySnapshot('Inputs-Time', { widths: [320, 1024] });
    cy.visit('/iframe.html?id=snapshots--inputcolor');
    cy.percySnapshot('Inputs-Color', { widths: [320, 1024] });
  });
});
