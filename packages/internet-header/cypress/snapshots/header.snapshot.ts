import { prepare } from '../support/prepare-story';

describe('header', () => {
  it('default', () => {
    prepare('Components/Internet Header/Header', 'Default');
    cy.percySnapshot();
  });
});
