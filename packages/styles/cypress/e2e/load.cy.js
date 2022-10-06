import snapshotConfig from '../percy/snapshot-configs/lg.json'


describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.percySnapshot('Home Page', snapshotConfig)
  })
})
