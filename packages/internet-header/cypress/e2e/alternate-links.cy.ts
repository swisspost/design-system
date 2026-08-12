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
        const url = $item.attr('url');
        expect(url).to.not.equal('');
      });
    });

    it('should fall back to config URL for unsupported hreflang values', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'pt', 'https://example.com/pt/page');
      });

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
      });

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/custom');
        });

      getLanguageMenuItemByCode('fr')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });
    });
  });

  describe('dynamically inserted alternate links', () => {
    it('should update language URLs when alternate links are added after page load', () => {
      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });

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
        addAlternateLink(doc, 'de', 'https://example.com/de/v1');
      });

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url', 'https://example.com/de/v1');

      cy.document().then(doc => {
        const link = doc.querySelector<HTMLLinkElement>('link[hreflang="de"]');
        link.href = 'https://example.com/de/v2';
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

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url', 'https://example.com/de/temp');

      cy.document().then(doc => {
        removeAlternateLinks(doc);
      });

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

      getLanguageMenuItems().each($item => {
        const url = $item.attr('url');
        expect(url).to.not.contain('example.com');
      });
    });

    it('should handle mixed valid and invalid hreflang values', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, 'de', 'https://example.com/de/page');
        addAlternateLink(doc, 'pt', 'https://example.com/pt/page');
      });

      getLanguageMenuItemByCode('de')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.equal('https://example.com/de/page');
        });

      getLanguageMenuItemByCode('fr')
        .should('have.attr', 'url')
        .then(url => {
          expect(url).to.not.contain('example.com');
        });
    });
  });
});
