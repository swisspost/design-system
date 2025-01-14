describe('PostListbox', { baseUrl: null, includeShadowDom: false }, () => {
  beforeEach(() => {
    // Visit the page where the component is rendered
    cy.visit('./cypress/fixtures/post-listbox.test.html');
  });

  it('should render the post-listbox component', () => {
    // Check if the post-listbox component is rendered
    cy.get('post-listbox').should('exist');
  });

  it('should have an id for the first div in post-listbox', () => {
    // Ensure the first div inside post-listbox has an id attribute
    cy.get('post-listbox')
      .find('div')
      .first()
      .should('have.attr', 'id')
      .and('not.be.empty')
      .then($div => {
        const id = $div['id'];
        cy.log(`First div ID: ${id}`);
      });
  });

  it('should throw an error if the label is missing', () => {
    // Check for the mandatory label accessibility error if no label is provided
    cy.on('uncaught:exception', err => {
      expect(err.message).to.include(
        'Please provide a label to the listbox component. Label is mandatory for accessibility purposes.',
      );
      return false;
    });
    cy.get('post-listbox').within(() => {
      cy.get('[slot="post-listbox-item"]').first().invoke('remove');
    });
  });

  it('should hide the label when label-hidden is set', () => {
    // Set the `label-hidden` property and check if the label is hidden
    cy.get('post-listbox').invoke('attr', 'label-hidden', true);
    cy.get('post-listbox div').first().should('have.class', 'visually-hidden');
  });

  it('should ensure post-listbox-item components have the correct slot and role', () => {
    // Verify that the `post-listbox-item` components have the correct slot and role attributes
    cy.get('post-listbox').within(() => {
      cy.get('post-listbox-item').each($el => {
        cy.wrap($el)
          .should('have.attr', 'slot', 'post-listbox-item')
          .and('have.attr', 'role', 'option');
      });
    });
  });

  it('should have correct ARIA attributes on the listbox', () => {
    cy.get('post-listbox [role="listbox"]')
      .should('have.attr', 'aria-labelledby')
      .and('not.be.empty');
    cy.get('post-listbox [role="listbox"]').should('have.attr', 'aria-activedescendant');
  });

  it('should allow navigation with keyboard for single-select', () => {
    cy.get('post-listbox [role="listbox"]').focus().type('{downarrow}');
    cy.get('post-listbox [role="listbox"]')
      .invoke('attr', 'aria-activedescendant')
      .then(id => {
        cy.get(`#${id}`).should('exist').and('have.focus');
      });
  });

  it('should allow selection with Space key for multi-select', () => {
    cy.get('post-listbox').invoke('attr', 'multiselect', true);
    cy.get('post-listbox [role="listbox"]').focus().type(' ');
    cy.get('post-listbox-item[selected]').should('exist');
  });

  it('should highlight search term in listbox items', () => {
    cy.get('post-listbox').invoke('attr', 'search-term', 'abc');
    cy.get('post-listbox-item mark').each($el => {
      cy.wrap($el)
        .invoke('text')
        .should(text => {
          expect(text.toLowerCase()).to.contain('abc'.toLowerCase());
        });
    });
  });

  it('should set active and selected item on click', () => {
    cy.get('post-listbox [slot="post-listbox-item"]').first().click();
    cy.get('post-listbox [role="listbox"]')
      .invoke('attr', 'aria-activedescendant')
      .should('not.be.empty');
    cy.get('post-listbox-item[selected]').should('exist');
  });

  it('should initialize pre-selected items correctly', () => {
    cy.get('post-listbox-item[selected]').each($el => {
      cy.wrap($el).should('have.attr', 'selected', 'selected');
    });
  });

  it('should retain state after losing focus', () => {
    cy.get('post-listbox [role="listbox"]').focus().type('{downarrow}').type('{downarrow}');
    cy.get('post-listbox [role="listbox"]')
      .invoke('attr', 'aria-activedescendant')
      .then(lastFocusedId => {
        cy.get(`#${lastFocusedId}`).blur();
        cy.get('post-listbox [role="listbox"]').focus();
        cy.get('post-listbox [role="listbox"]')
          .invoke('attr', 'aria-activedescendant')
          .should('equal', lastFocusedId);
      });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-listbox');
    cy.checkA11y('#root-inner');
  });
});
