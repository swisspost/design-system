import snapshotConfig from '../percy/snapshot-configs/all.json';

describe('Snapshot Welcome Page', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=welcome--page');
  });

  it('render welcome page', function () {
    cy.percySnapshot('Welcome Page', snapshotConfig);
  });
});
