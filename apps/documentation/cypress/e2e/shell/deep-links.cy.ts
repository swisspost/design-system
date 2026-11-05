import { BUTTON_DOCS_ID, BUTTON_STORY_ID, getPreviewBody, stubAnalytics } from './preview';

describe('shell deep links', () => {
  beforeEach(() => {
    stubAnalytics();
    cy.clearLocalStorage();
  });

  it('applies the args of a deep link to its story', () => {
    cy.visit(`/components/button?story=default&args=text:Deep+link#story--${BUTTON_STORY_ID}`);
    getPreviewBody('Button')
      .find(`#story--${BUTTON_STORY_ID} button`)
      .should('contain.text', 'Deep link');
  });

  it('accepts the old "Copy deep link" URLs', () => {
    cy.visit(`/?path=/docs/${BUTTON_DOCS_ID}&story=Default&args=text:Old+link#${BUTTON_STORY_ID}`);
    cy.location('pathname').should('equal', '/components/button');
    cy.location('hash').should('equal', `#story--${BUTTON_STORY_ID}`);
    getPreviewBody('Button')
      .find(`#story--${BUTTON_STORY_ID} button`)
      .should('contain.text', 'Old link');
  });

  it('forwards the page params to the preview', () => {
    cy.visit('/foundations/icons?spds-iconset=uilight');
    cy.get<HTMLIFrameElement>('#storybook-preview-iframe')
      .its('0.contentWindow.location.search')
      .should('contain', 'spds-iconset=uilight');
  });

  it('opens the full screen demo with the current globals and args', () => {
    cy.visit('/components/button?scheme=dark');
    getPreviewBody('Button').then(body => {
      cy.stub(body[0].ownerDocument.defaultView as Window, 'open').as('open');
    });
    getPreviewBody('Button').find('button').contains('View full screen').click();
    cy.get('@open').should(
      'have.been.calledWithMatch',
      new RegExp(`/iframe\\.html\\?id=${BUTTON_STORY_ID}&viewMode=story&globals=scheme:dark$`),
    );
  });

  it('copies a deep link with the current args and globals', () => {
    cy.visit('/components/button?theme=cargo&scheme=dark');
    getPreviewBody('Button').then(body => {
      const win = body[0].ownerDocument.defaultView as Window;
      cy.stub(win.navigator.clipboard, 'writeText').as('copy').resolves();
    });
    getPreviewBody('Button').find('textarea, input[type="text"]').first().clear().type('Copied');
    getPreviewBody('Button').find('button').contains('Copy deep link').click();
    cy.get('@copy').should(
      'have.been.calledWith',
      `http://localhost:9000/components/button?story=default&args=text:Copied&theme=cargo&scheme=dark#story--${BUTTON_STORY_ID}`,
    );
  });
});
