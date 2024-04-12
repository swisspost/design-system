describe('Button', () => {
  it('default', () => {
    cy.snapshot({
      url: { story: 'button' },
      page: { selector: 'button post-icon' },
      snapshot: { name: 'Buttons' },
    });
  });
});
