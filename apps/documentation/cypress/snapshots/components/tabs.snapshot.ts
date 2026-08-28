describe('Tabs', () => {
  const stories = [
    { name: 'content tabs', storyId: 'snapshots--content-tabs' },
    { name: 'page tabs', storyId: 'snapshots--page-tabs' },
    { name: 'page tabs with sidenav', storyId: 'snapshots--page-tabs-with-sidenav' },
  ];

  stories.forEach(({ name, storyId }) => {
    it(name, () => {
      cy.visit(`/iframe.html?id=${storyId}`);
      cy.get('post-tab-item[data-hydrated]', { timeout: 30000 }).should('be.visible');
      cy.percySnapshot('Tabs', { widths: [320, 600, 1440] });
    });
  });
});
