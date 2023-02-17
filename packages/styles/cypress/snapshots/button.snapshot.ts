describe('Button', () => {
  before(() => {
    cy.visitStorybook();
  });

  it('default', () => {
    cy.loadStory('Components/Button', 'Default');
    cy.percySnapshot('Primary button');

    cy.changeArg('Variant', 'Secondary');
    cy.percySnapshot('Secondary button');

    cy.changeArg('Variant', 'Tertiary');
    cy.percySnapshot('Tertiary button');
  });

  it('inverted', () => {
    cy.loadStory('Components/Button', 'Inverted');
    cy.percySnapshot('Inverted button');
  });
});
