import * as Components from '@swisspost/design-system-components/dist';

const COMPONENT_TAG_NAMES = Object.keys(Components)
  .filter(c => /^Post([A-Z][a-z]+)+$/.test(c))
  .map(c => c.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase());

describe('Components', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().then(win => {
      cy.wrap(cy.spy(win.console, 'error')).as('consoleError');
    });
  });

  it('should not log any error', () => {
    cy.get('@consoleError').should('not.have.been.called');
  });

  COMPONENT_TAG_NAMES.forEach(tagName => {
    it(`should contain <${tagName}>`, () => {
      cy.get(tagName).should('exist');
    });
  });
});
