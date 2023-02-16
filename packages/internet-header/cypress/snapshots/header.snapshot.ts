import snapshotConfig from '../percy/snapshot-configs/all.json';

describe('header', () => {
  it('default', () => {
    cy.visit('/iframe.html?args=&id=components-internet-header-header--default');
    cy.percySnapshot('Header', snapshotConfig);
  });
});
