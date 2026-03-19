const FOOTER_ID = 'd97528b3-a9ef-4201-bf28-9caf6e8997dc';

describe('Footer', () => {
  describe('Structure & Basic Functionality', () => {
    beforeEach(() => {
      cy.getComponent('footer', FOOTER_ID);
      cy.get('@footer').find('> footer h2.visually-hidden').as('textFooter');
    });

    it('should render', () => {
      cy.get('@footer').should('exist');
    });

    it('should set textFooter text according to "textFooter" prop', () => {
      cy.get('@textFooter').should('have.text', 'Footer');
    });

    it('should have all required grid sections with proper structure', () => {
      // Should have 4 grid sections with title-content pairs
      cy.get('@footer').find('[slot^="grid-"]').should('have.length', 8); // 4 titles + 4 lists
      cy.get('@footer').find('ul[slot^="grid-"]').should('have.length', 4);

      // Each grid should have title-content pairs
      for (let i = 1; i <= 4; i++) {
        cy.get('@footer').find(`[slot="grid-${i}-title"]`).should('exist');
        cy.get('@footer').find(`ul[slot="grid-${i}"]`).should('exist');
      }
    });

    it('should have all required sections', () => {
      const requiredSections = ['socialmedia', 'app', 'businesssectors', 'meta'];

      requiredSections.forEach(section => {
        cy.get('@footer').find(`div[slot="${section}"]`).should('exist');

        // Meta should have an aria-label as it has no visible title
        if (section === 'meta') {
          cy.get('@footer')
            .find(`div[slot="${section}"] ul`)
            .should('have.attr', 'aria-label', 'Meta');
        } else {
          cy.get('@footer').find(`div[slot="${section}"] h3`).should('exist');
        }
      });

      cy.get('@footer').find('span[slot="copyright"]').should('have.length.at.least', 1);
    });

    it('should have working links throughout footer', () => {
      cy.get('@footer')
        .find('a')
        .each($link => {
          cy.wrap($link).should('have.attr', 'href').and('not.be.empty');
        });
    });

    it('should have interactive elements', () => {
      // Cookie settings button
      cy.get('@footer')
        .find('div[slot="meta"] button')
        .should('exist')
        .should('be.visible')
        .click(); // Test it's clickable

      // Social media links with proper styling
      cy.get('@footer')
        .find('div[slot="socialmedia"] a')
        .each($link => {
          cy.wrap($link)
            .should('have.class', 'btn')
            .should('have.class', 'btn-primary')
            .should('have.class', 'btn-icon');
        });
    });
  });

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      cy.getComponent('footer', FOOTER_ID);
    });

    it('should display grid layout on desktop', () => {
      cy.viewport(1200, 800);
      cy.get('@footer').find('ul[slot^="grid-"]').should('be.visible');
      cy.get('@footer').find('post-accordion').should('not.exist');
    });

    it('should transform to accordion on mobile', () => {
      cy.viewport('iphone-3');
      it('should render the post-accordion on mobile', () => {
        cy.viewport('iphone-3');
        cy.get('@footer').find('post-accordion').as('accordion');

        cy.get('@accordion').should('exist');
      });

      it('should have accordion-items with slotted elements on mobile', () => {
        cy.viewport('iphone-3');
        cy.get('@footer').find('post-accordion').as('accordion');
        cy.get('@accordion').find('post-accordion-item').as('accordionItems');

        cy.get('@footer').find('post-accordion').should('exist');
        cy.get('@footer').find('post-accordion-item').should('have.length', 4);

        // Verify each accordion item has proper structure for slotted content
        cy.get('@footer')
          .find('post-accordion-item')
          .each($item => {
            cy.wrap($item).find('slot[name="header"]').should('exist');
            cy.wrap($item).find('slot:not([name])').should('exist');
          });
      });

      it('should work across different mobile viewports', () => {
        const mobileViewports = [
          { width: 375, height: 667 },
          { width: 414, height: 896 },
        ];

        mobileViewports.forEach(viewport => {
          cy.viewport(viewport.width, viewport.height);
          cy.get('@footer').find('post-accordion').should('exist');
          cy.get('@footer').find('post-accordion-item').should('have.length', 4);
        });
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.getComponent('footer', FOOTER_ID);
    });

    it('should have proper heading hierarchy', () => {
      cy.get('@footer').find('h2.visually-hidden').should('exist');
      cy.get('@footer').find('h3').should('have.length.at.least', 4);
    });

    it('should have accessibility features', () => {
      // Visually hidden content for screen readers
      cy.get('@footer').find('.visually-hidden').should('have.length.at.least', 1);

      // Social media icons marked as decorative
      cy.get('@footer')
        .find('div[slot="socialmedia"] post-icon')
        .each($icon => {
          cy.wrap($icon).should('have.attr', 'aria-hidden', 'true');
        });

      // Links have proper accessibility
      cy.get('@footer')
        .find('a')
        .each($link => {
          cy.wrap($link).then($el => {
            const hasText = $el.text().trim().length > 0;
            const hasAriaLabel = $el.attr('aria-label');
            const hasVisuallyHidden = $el.find('.visually-hidden').length > 0;

            cy.wrap(hasText || hasAriaLabel || hasVisuallyHidden).should('be.true');
          });
        });
    });

    it('Has no detectable a11y violations', () => {
      cy.getSnapshots('footer');
      cy.checkA11y('#root-inner');
    });

    it('Has no detectable a11y violations on mobile', () => {
      cy.viewport('iphone-3');
      cy.checkA11y('#root-inner');
    });
  });
});
