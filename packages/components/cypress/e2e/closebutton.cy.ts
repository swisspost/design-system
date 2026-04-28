const CLOSE_BTN_ID = 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a';

describe('Extract markup', () => {
  it('should extract markup for consumer apps', () => {
    cy.visit(`/iframe.html?id=${CLOSE_BTN_ID}--default`);
    cy.get('post-closebutton')
      .invoke('prop', 'outerHTML')
      .then(before => {
        cy.writeMarkup('post-closebutton', before);
      });
  });
});

describe('Close button', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('post-closebutton', CLOSE_BTN_ID);
    });

    it('should render with a close button and a11y label', () => {
      cy.get('@closebutton').should('exist');
      cy.get('@closebutton').find('.btn').should('exist');
      cy.get('@closebutton').find('span.visually-hidden').should('exist');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-closebutton');
    cy.checkA11y('#root-inner');
  });
});
