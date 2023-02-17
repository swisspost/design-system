describe('Button', () => {
  before(() => {
    cy.visitStorybook();
  });

  it('default', () => {
    cy.loadStory('Components/Button', 'Default');
    cy.percySnapshot();

    cy.changeArg('Variant', 'Secondary');
    cy.percySnapshot();

    cy.changeArg('Variant', 'Tertiary');
    cy.percySnapshot();
  });

  it('inverted', () => {
    cy.loadStory('Components/Button', 'Inverted');
    cy.percySnapshot();
  });
});
