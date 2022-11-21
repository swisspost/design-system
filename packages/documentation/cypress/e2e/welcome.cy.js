import snapshotConfig from '../percy/snapshot-configs/all.json'

describe('Snapshot Welcome Page', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=welcome--page&viewMode=story')
  })

  it('render welcome page', function () {
    cy.percySnapshot('Welcome Page', snapshotConfig)
  })
})
