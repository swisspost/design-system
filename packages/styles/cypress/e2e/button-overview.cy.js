import snapshotConfig from '../percy/snapshot-configs/lg.json'

describe('Snapshot Button States', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9301/iframe.html?args=&id=design-system-button--page&viewMode=story')
  })

  it('displays focussed buttons on dark background', function () {
    cy
      .get('.sbdocs-preview')
      .invoke('addClass', 'bg-dark')
      .find('.btn')
      .invoke('addClass', 'pretend-focus')
    cy.percySnapshot('@dark: Button State: focus', snapshotConfig)
  })

  it('displays hovered buttons on dark background', function () {
    cy
      .get('.sbdocs-preview')
      .invoke('addClass', 'bg-dark')
      .find('.btn')
      .invoke('addClass', 'pretend-hover')
    cy.percySnapshot('@dark: Button State: hover', snapshotConfig)
  })

  it('displays default buttons on dark background', function () {
    cy
      .get('.sbdocs-preview')
      .invoke('addClass', 'bg-dark')
    cy.percySnapshot('@dark: Button State: default', snapshotConfig)
  })

  it('displays focussed buttons on light background', function () {
    cy
      .get('.btn')
      .invoke('addClass', 'pretend-focus')
    cy.percySnapshot('@light: Button State: focus', snapshotConfig)
  })

  it('displays hovered buttons on light background', function () {
    cy
      .get('.btn')
      .invoke('addClass', 'pretend-hover')
    cy.percySnapshot('@light: Button State: hover', snapshotConfig)
  })

  it('displays default buttons on light background', function () {
    cy.percySnapshot('@light: Button State: default', snapshotConfig)
  })
})
