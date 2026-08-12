import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

const language = 'de';

describe('Language switch alternate link overrides', () => {
  // The component renders each item's own hreflang (e.g. "de-ch", not just
  // "de") and matches document <link rel="alternate"> tags against that
  // exact value. We capture the real per-language hreflang from the DOM
  // once per test, then use it whenever we build alternate links below.
  let hreflangByLang: Record<string, string> = {};

  const captureHreflangs = () => {
    hreflangByLang = {};
    return cy.get('post-language-menu-item').each($item => {
      const code = ($item.attr('code') || '').toLowerCase();
      const short = code.split('-')[0];
      const hreflang = $item.find('a[hreflang]').attr('hreflang');
      if (short && hreflang) {
        hreflangByLang[short] = hreflang;
      }
    });
  };

  // Adds an alternate link, replacing any existing link with the same hreflang
  // so that a later `addAlternateLink` call always overrides cleanly (instead
  // of creating a duplicate alongside the default links added in beforeEach).
  // `lang` may be a short code we know about ('de', 'fr', 'it', 'en'), which
  // gets translated to the real hreflang the component renders; anything not
  // in the map (e.g. 'ja', 'x-custom') is used as-is.
  const addAlternateLink = (doc: Document, lang: string, href: string) => {
    const hreflang = hreflangByLang[lang] ?? lang;

    doc
      .querySelectorAll(`link[rel="alternate"][hreflang="${hreflang}"]`)
      .forEach(el => el.remove());

    const link = doc.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    doc.head.appendChild(link);
    return link;
  };

  // Baseline alternate links present on the page by default, mirroring what a
  // real host page would render for every supported language.
  const addDefaultAlternateLinks = (doc: Document) => {
    Object.keys(hreflangByLang).forEach(lang => {
      addAlternateLink(doc, lang, `/?lang=${lang}`);
    });
  };

  const removeAlternateLinks = (doc: Document) => {
    doc.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  };

  const getLanguageItemHref = (code: string) => {
    return cy
      .get(`post-language-menu-item[code^="${code}"]`)
      .find('a[hreflang]')
      .invoke('attr', 'href');
  };

  beforeEach(() => {
    prepare(HEADER, 'Default');
    cy.changeArg('language', language);
    cy.get('post-language-menu-item').should('have.length.greaterThan', 0);

    captureHreflangs().then(() => {
      cy.document().then(doc => addDefaultAlternateLinks(doc));
    });
  });

  afterEach(() => {
    cy.document().then(doc => removeAlternateLinks(doc));
  });

  it('should use config URLs when no alternate links are present', () => {
    // Override the beforeEach defaults for this test only, so we can verify
    // the true fallback-to-config behavior.
    cy.document().then(doc => removeAlternateLinks(doc));

    cy.get('post-language-menu-item[code^="de"]').find('a[hreflang]').should('have.attr', 'href');
    cy.get('post-language-menu-item[code^="fr"]').find('a[hreflang]').should('have.attr', 'href');
  });

  it('should override language URL when a matching alternate link is added', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', 'https://example.com/de/page');
    });

    getLanguageItemHref('de').should('eq', 'https://example.com/de/page');
  });

  it('should override multiple language URLs at once', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', 'https://example.com/de/page');
      addAlternateLink(doc, 'fr', 'https://example.com/fr/page');
    });

    getLanguageItemHref('de').should('eq', 'https://example.com/de/page');
    getLanguageItemHref('fr').should('eq', 'https://example.com/fr/page');
  });

  it('should only override languages that have an alternate link', () => {
    cy.get('post-language-menu-item[code^="fr"]')
      .find('a')
      .invoke('attr', 'href')
      .then(originalFrHref => {
        cy.document().then(doc => {
          addAlternateLink(doc, 'de', 'https://example.com/de/override');
        });

        getLanguageItemHref('de').should('eq', 'https://example.com/de/override');
        getLanguageItemHref('fr').should('eq', originalFrHref);
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

        getLanguageItemHref('de').should('eq', 'https://example.com/de/temp');

        cy.then(() => {
          tempLink.remove();
        });

        getLanguageItemHref('de').should('eq', originalDeHref);
      });
  });

  it('should update when the href attribute on an existing alternate link changes', () => {
    let link: HTMLLinkElement;

    cy.document().then(doc => {
      link = addAlternateLink(doc, 'de', 'https://example.com/de/first');
    });

    getLanguageItemHref('de').should('eq', 'https://example.com/de/first');

    cy.then(() => {
      link.href = 'https://example.com/de/second';
    });

    getLanguageItemHref('de').should('eq', 'https://example.com/de/second');
  });

  it('should ignore alternate links with unsupported hreflang values', () => {
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
        getLanguageItemHref('de').should('eq', originalDeHref);
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

        getLanguageItemHref('de').should('eq', originalDeHref);
      });
  });

  it('should resolve relative hrefs against the document base URI', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', '/de/relative-page');
    });

    getLanguageItemHref('de').should('match', /\/de\/relative-page$/);
  });

  it('should use the first alternate link when duplicates exist for the same hreflang', () => {
    cy.document().then(doc => {
      addAlternateLink(doc, 'de', 'https://example.com/de/first');
      // Append a genuine duplicate directly, bypassing the dedup in
      // addAlternateLink, to actually exercise the "first wins" behavior.
      const link = doc.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflangByLang['de'];
      link.href = 'https://example.com/de/second';
      doc.head.appendChild(link);
    });

    getLanguageItemHref('de').should('eq', 'https://example.com/de/first');
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
      getLanguageItemHref(lang).should('eq', url);
    }
  });
});