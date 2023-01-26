import { prepare } from '../support/prepare-story';

describe('os-flyout', () => {
  beforeEach(() => {
    prepare('Components/Internet Header/Header', 'Default');
  });
  it('should customize the os flyout title', () => {
    const title = 'Test OS Flyout';
    cy.changeArg('os-flyout-overrides', {
      title,
      text: title,
    });

    cy.get('#flyout_os').prev().children('span').should('have.text', title);
  });

  it('should customzie the os flyout links in the first column without overriding existing links', () => {
    cy.changeArg('os-flyout-overrides', {
      flyout: [
        {
          title: 'Title',
          linkList: [
            {
              title: 'Additional Link',
              href: '/link',
            },
          ],
        },
      ],
    });
    cy.wait(100);

    cy.get('#flyout_os h3').should('have.text', 'Title');
    const linklist = cy.get('#flyout_os .flyout-linklist');
    linklist.should('have.length', 1);
    linklist.children().should('have.length', 2);
  });

  it('should add additional columns to os flyout while keeping the first intact', () => {
    cy.changeArg('os-flyout-overrides', {
      flyout: [
        {},
        {
          title: 'Title',
          linkList: [
            {
              title: 'Additional Link',
              href: '/link',
            },
          ],
        },
      ],
    });

    cy.get('#flyout_os .flyout-column').should('have.length', 2);
    cy.get('#flyout_os .flyout-column:first-child() .flyout-linklist li').should('have.length', 1);
    cy.get('#flyout_os .flyout-column:last-child() .flyout-linklist li').should('have.length', 1);
  });

  /**
   * Reproduction of an error reported as COWF-814
   */
  it('should not duplicate entries when overrides get updated', () => {
    cy.changeArg('os-flyout-overrides', {
      flyout: [
        {
          title: 'Title',
          linkList: [
            {
              title: 'Additional Link',
              href: '/link',
            },
            {
              title: 'Additional Link',
              href: '/link',
            },
          ],
        },
        {
          title: 'Title',
          linkList: [
            {
              title: 'Additional Link',
              href: '/link',
            },
          ],
        },
      ],
    });

    // Flush render queue
    cy.wait(10);

    cy.changeArg('custom-config', {
      de: {
        header: {
          navMain: [
            {
              title: 'Custom Link',
              text: 'Custom Link',
              flyout: [
                {
                  title: 'Custom Nav',
                  linkList: [{ url: '/bla', title: 'something' }],
                },
                {
                  title: 'Deeper nav',
                  linkList: [{ url: '/some/levels/deeper', title: 'Deeper nav' }],
                },
              ],
            },
          ],
        },
      },
    });

    cy.wait(10);

    cy.get('#flyout_os .flyout-column').should('have.length', 2);
    cy.get('#flyout_os .flyout-column:first-child() .flyout-linklist li').should('have.length', 3);
    cy.get('#flyout_os .flyout-column:last-child() .flyout-linklist li').should('have.length', 1);

    cy.changeArg('os-flyout-overrides', {
      flyout: [
        {},
        {
          title: 'Title',
          linkList: [
            {
              title: 'Additional Link',
              href: '/link',
            },
          ],
        },
      ],
    });

    cy.get('#flyout_os .flyout-column').should('have.length', 2);
    cy.get('#flyout_os .flyout-column:first-child() .flyout-linklist li').should('have.length', 1);
    cy.get('#flyout_os .flyout-column:last-child() .flyout-linklist li').should('have.length', 1);
  });
});
