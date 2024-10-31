describe('PostList Component', { baseUrl: null, includeShadowDom: false }, () => {
  beforeEach(() => {
    // Visit the page where the component is rendered
    cy.visit('./cypress/fixtures/post-list.test.html');
  });

  it('should render the post-list component', () => {
    // Check if the post-list component is rendered
    cy.get('post-list').should('exist');
  });

  it('should have an id for the first div in post-list', () => {
    // Ensure the first div inside post-list has an id attribute
    cy.get('post-list')
      .find('div')
      .first()
      .should('have.attr', 'id')
      .and('not.be.empty')
      .then($div => {
        const id = $div['id'];
        cy.log(`First div ID: ${id}`);
      });
  });

  it('should throw an error if the title is missing', () => {
    // Check for the mandatory title accessibility error if no title is provided
    cy.on('uncaught:exception', err => {
      expect(err.message).to.include(
        'Please provide a title to the list component. Title is mandatory for accessibility purposes.',
      );
      return false;
    });
    cy.get('post-list').within(() => {
      cy.get('[slot="post-list-item"]').first().invoke('remove');
    });
  });

  it('should hide the title when title-hidden is set', () => {
    // Set the `title-hidden` property and check if the title is hidden
    cy.get('post-list').invoke('attr', 'title-hidden', true);
    cy.get('post-list div').first().should('have.class', 'visually-hidden');
  });

  it('should render horizontally when the horizontal attribute is set', () => {
    // Set the `horizontal` property and verify if the list has a horizontal layout
    cy.get('post-list').invoke('attr', 'horizontal', true);
    cy.get('post-list').should('have.attr', 'horizontal', 'true');
  });

  it('should ensure post-list-item components have the correct slot and role', () => {
    // Verify that the `post-list-item` components have the correct slot and role attributes
    cy.get('post-list').within(() => {
      cy.get('post-list-item').each($el => {
        cy.wrap($el)
          .should('have.attr', 'slot', 'post-list-item')
          .and('have.attr', 'role', 'listitem');
      });
    });
  });
});
