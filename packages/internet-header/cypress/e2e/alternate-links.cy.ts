import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

const language = 'de';

const LANGUAGES = ['de', 'fr', 'it', 'en'];

describe('Language switch alternate link overrides', () => {
  // Removes any existing link with the same hreflang first, then adds the
  // new one, so a language's alternate link is always overridden cleanly.
  const addAlternateLink = (doc: Document, code: string, href: string) => {
    doc
      .querySelectorAll(`link[rel="alternate"][hreflang="${code}" i]`)
      .forEach(el => el.remove());

    const link = doc.createElement('link');
    link.rel = 'alternate';
    link.hreflang = code;
    link.href = href;
    doc.head.appendChild(link);
    return link;
  };

  // Baseline links mirroring what a real host page renders by default.
  const addDefaultAlternateLinks = (doc: Document) => {
    LANGUAGES.forEach(code => {
      addAlternateLink(doc, code, `/?lang=${code}`);
    });
  };

  const removeAlternateLinks = (doc: Document) => {
    doc.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  };

  beforeEach(() => {
    prepare(HEADER, 'Default');
    cy.changeArg('language', language);
    cy.get('post-language-menu-item').should('have.length.greaterThan', 0);

    cy.document().then(doc => addDefaultAlternateLinks(doc));
  });

  afterEach(() => {
    cy.document().then(doc => removeAlternateLinks(doc));
  });

  it('should use config URLs when no alternate links are present', () => {
    // Override the beforeEach defaults for this test only, so we can verify
    // the true fallback-to-config behavior.
    cy.document().then(doc => removeAlternateLinks(doc));

    cy.get('post-language-menu-item[code^="de"]').find('a').should('have.attr', 'href');
    cy.get('post-language-menu-item[code^="fr"]').find('a').should('have.attr', 'href');
  });

  it('should override language URL when a matching alternate link is added', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', 'https://example.com/de/page');
    });

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .should('eq', 'https://example.com/de/page');
  });

  it('should override multiple language URLs at once', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', 'https://example.com/de/page');
      addAlternateLink(doc, 'fr', 'https://example.com/fr/page');
    });

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .should('eq', 'https://example.com/de/page');
    cy.get('post-language-menu-item[code^="fr"]')
      .find('a')
      .invoke('attr', 'href')
      .should('eq', 'https://example.com/fr/page');
  });

  it('should only override languages that have an alternate link', () => {
    cy.get('post-language-menu-item[code^="fr"]')
      .find('a')
      .invoke('attr', 'href')
      .then(originalFrHref => {
        cy.document().then(doc => {
          addAlternateLink(doc, 'de', 'https://example.com/de/override');
        });

        cy.get('post-language-menu-item[code^="de"]')
          .find('a')
          .invoke('attr', 'href')
          .should('eq', 'https://example.com/de/override');
        cy.get('post-language-menu-item[code^="fr"]')
          .find('a')
          .invoke('attr', 'href')
          .should('eq', originalFrHref);
      });
  });

  it('should revert to config URL when an alternate link is removed', () => {
    cy.document().then(doc => removeAlternateLinks(doc));

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .then(originalDeHref => {
        let tempLink: HTMLLinkElement;

        cy.document().then(doc => {
          tempLink = addAlternateLink(doc, 'de', 'https://example.com/de/temp');
        });

        cy.get('post-language-menu-item[code^="de"]')
          .find('a')
          .invoke('attr', 'href')
          .should('eq', 'https://example.com/de/temp');

        cy.then(() => {
          tempLink.remove();
        });

        cy.get('post-language-menu-item[code^="de"]')
          .find('a')
          .invoke('attr', 'href')
          .should('eq', originalDeHref);
      });
  });

  it('should update when the href attribute on an existing alternate link changes', () => {
    let link: HTMLLinkElement;

    cy.document().then(doc => {
      link = addAlternateLink(doc, 'de', 'https://example.com/de/first');
    });

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .should('eq', 'https://example.com/de/first');

    cy.then(() => {
      link.href = 'https://example.com/de/second';
    });

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .should('eq', 'https://example.com/de/second');
  });

  it('should ignore alternate links whose hreflang does not match a configured language code', () => {
    cy.document().then(doc => removeAlternateLinks(doc));

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .then(originalDeHref => {
        cy.document().then(doc => {
          addAlternateLink(doc, 'ja', 'https://example.com/ja/page');
          addAlternateLink(doc, 'x-custom', 'https://example.com/custom');
        });

        // existing items keep their current URLs
        cy.get('post-language-menu-item[code^="de"]')
          .find('a')
          .invoke('attr', 'href')
          .should('eq', originalDeHref);
      });
  });

  it('should ignore alternate links with an empty href', () => {
    cy.document().then(doc => removeAlternateLinks(doc));

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .then(originalDeHref => {
        cy.document().then(doc => {
          addAlternateLink(doc, 'de', '');
        });

        cy.get('post-language-menu-item[code^="de"]')
          .find('a')
          .invoke('attr', 'href')
          .should('eq', originalDeHref);
      });
  });

  it('should resolve relative hrefs against the document base URI', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', '/de/relative-page');
    });

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .should('match', /\/de\/relative-page$/);
  });

  it('should use the first alternate link when duplicates exist for the same hreflang', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', 'https://example.com/de/first');
      // Append a real duplicate directly, bypassing addAlternateLink's dedup.
      const link = doc.createElement('link');
      link.rel = 'alternate';
      link.hreflang = 'de';
      link.href = 'https://example.com/de/second';
      doc.head.appendChild(link);
    });

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .should('eq', 'https://example.com/de/first');
  });

  it('should handle all four supported languages', () => {
    const overrides = {
      de: 'https://example.com/de/all',
      fr: 'https://example.com/fr/all',
      it: 'https://example.com/it/all',
      en: 'https://example.com/en/all',
    };

    cy.document().then(doc => {
      for (const [lang, url] of Object.entries(overrides)) {
        addAlternateLink(doc, lang, url);
      }
    });

    for (const [lang, url] of Object.entries(overrides)) {
      cy.get(`post-language-menu-item[code^="${lang}"]`)
        .find('a')
        .invoke('attr', 'href')
        .should('eq', url);
    }
  });

  it('should match hreflang case-insensitively against the configured language code', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'DE', 'https://example.com/de/case-insensitive');
    });

    cy.get('post-language-menu-item[code^="de"]')
      .find('a')
      .invoke('attr', 'href')
      .should('eq', 'https://example.com/de/case-insensitive');
  });
});
