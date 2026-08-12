describe('Language switch alternate link overrides', () => {
  const addAlternateLink = (doc: Document, hreflang: string, href: string) => {
    const link = doc.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    doc.head.appendChild(link);
    return link;
  };

  const removeAlternateLinks = (doc: Document) => {
    doc.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  };

  const getLanguageMenuItems = () =>
    cy.get('swisspost-internet-header').find('post-language-menu-item');

  const getLanguageMenuItemByCode = (code: string) =>
    getLanguageMenuItems().filter(`[code="${code}"]`);

  beforeEach(() => {
    cy.visit('/iframe.html?id=snapshots--header');
    cy.get('swisspost-internet-header').should('exist');
  });

  describe('fallback to config', () => {
    it('should use config URLs when no alternate links are present', () => {
      getLanguageMenuItems().should('have.length.greaterThan', 0);
      getLanguageMenuItems().each($item => {
        expect($item).to.have.attr('url').and.not.be.empty;
      });
    });

    it('should fall back to config URL for unsupported hreflang values', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'pt', 'https://example.com/pt/page');
      });

      // Portuguese is not supported — all items should keep their config URLs
      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });
    });
  });

  describe('alternate links present on page load', () => {
    it('should override config URLs with alternate link hrefs', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'de', 'https://example.com/de/custom-page');
        addAlternateLink(doc, 'fr', 'https://example.com/fr/custom-page');
      });

      // Wait for MutationObserver to fire
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/custom-page');
        });
      getLanguageMenuItemByCode('fr')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/fr/custom-page');
        });
    });

    it('should partially override — only languages with alternate links are overridden', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'de', 'https://example.com/de/custom');
        // No alternate link for fr, it, en
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/custom');
        });

      // fr should still use the config URL (not overridden)
      getLanguageMenuItemByCode('fr')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });
    });
  });

  describe('dynamically inserted alternate links', () => {
    it('should update language URLs when alternate links are added after page load', () => {
      // Initially, no alternate links — config URLs are used
      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });

      // Add alternate links dynamically
      cy.document().then(doc => {
        addAlternateLink(doc, 'de', 'https://example.com/de/dynamic');
        addAlternateLink(doc, 'fr', 'https://example.com/fr/dynamic');
      });

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/dynamic');
        });
      getLanguageMenuItemByCode('fr')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/fr/dynamic');
        });
    });
  });

  describe('dynamically updated alternate links', () => {
    it('should reflect href changes on existing alternate links', () => {
      cy.document().then(doc => {
        const link = addAlternateLink(doc, 'de', 'https://example.com/de/v1');

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(100).then(() => {
          link.href = 'https://example.com/de/v2';
        });
      });

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/v2');
        });
    });
  });

  describe('alternate links removed', () => {
    it('should revert to config URLs when alternate links are removed', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'de', 'https://example.com/de/temp');
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/temp');
        });

      // Remove all alternate links
      cy.document().then(doc => {
        removeAlternateLinks(doc);
      });

      // Should revert to config value
      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });
    });
  });

  describe('hreflang mismatches', () => {
    it('should ignore hreflang values that do not match de, fr, it, en', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'pt', 'https://example.com/pt/page');
        addAlternateLink(doc, 'ja', 'https://example.com/ja/page');
        addAlternateLink(doc, 'x-default', 'https://example.com/page');
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);

      // None of the supported languages should be overridden
      getLanguageMenuItems().each($item => {
        expect($item).to.have.attr('url').and.not.contain('example.com');
      });
    });

    it('should handle mixed valid and invalid hreflang values', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'de', 'https://example.com/de/page');
        addAlternateLink(doc, 'pt', 'https://example.com/pt/page');
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/page');
        });

      // fr should still use config URL
      getLanguageMenuItemByCode('fr')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });
    });
  });
});
