import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';
import testConfiguration from '../fixtures/internet-header/test-configuration.json';

const language = 'de';

describe('Language switch alternate link overrides', () => {
  const languagesConfig = testConfiguration.header.globalHeader.languages;
  const [firstLang, secondLang] = languagesConfig;

  // Creates a fully-qualified <link rel="alternate" hreflang="..." href="...">
  // and appends it to <head>. Removes any existing link with the same
  // hreflang first so a language's override is always applied cleanly.
  const addAlternateLink = (doc: Document, code: string, href: string): HTMLLinkElement => {
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

  const removeAlternateLinks = (doc: Document) => {
    doc.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());
  };

  const getHref = (code: string) =>
    cy.get(`post-language-menu-item[code="${code}"]`).find('a').invoke('attr', 'href');

  beforeEach(() => {
    prepare(HEADER, 'Default');
    cy.changeArg('language', language);
    cy.get('post-language-menu-item').should('have.length.greaterThan', 0);
  });

  afterEach(() => {
    // Clean up anything injected during a test, plus any stray <meta> tags,
    // so nothing leaks into the next test.
    cy.document().then(doc => {
      removeAlternateLinks(doc);
      doc.querySelectorAll('meta[data-test-injected]').forEach(el => el.remove());
    });
  });

  describe('getAlternateLinks — reading <head> on load', () => {
    it('uses the config url for every language when no alternate links exist', () => {
      languagesConfig.forEach(lang => {
        getHref(lang.code).should('eq', lang.url);
      });
    });

    it('overrides the language url when a matching alternate link is added', () => {
      const overrideUrl = 'https://example.com/de/override';

      cy.document().then(doc => addAlternateLink(doc, firstLang.code, overrideUrl));

      getHref(firstLang.code).should('eq', overrideUrl);
    });

    it('overrides multiple languages independently', () => {
      cy.document().then(doc => {
        languagesConfig.forEach(lang => {
          addAlternateLink(doc, lang.code, `https://example.com/${lang.code}/all`);
        });
      });

      languagesConfig.forEach(lang => {
        getHref(lang.code).should('eq', `https://example.com/${lang.code}/all`);
      });
    });

    it('leaves languages without a matching alternate link on the config url', () => {
      const overrideUrl = 'https://example.com/de/override';

      cy.document().then(doc => addAlternateLink(doc, firstLang.code, overrideUrl));

      // Wait for the override to land first, so we know the read has happened
      // before asserting the untouched language stayed put.
      getHref(firstLang.code).should('eq', overrideUrl);
      getHref(secondLang.code).should('eq', secondLang.url);
    });

    it('matches hreflang case-insensitively', () => {
      const overrideUrl = 'https://example.com/de/case-insensitive';

      cy.document().then(doc => {
        addAlternateLink(doc, firstLang.code.toUpperCase(), overrideUrl);
      });

      getHref(firstLang.code).should('eq', overrideUrl);
    });

    it('uses the first matching link when duplicate hreflang values exist', () => {
      cy.document().then(doc => {
        addAlternateLink(doc, firstLang.code, 'https://example.com/de/first');

        // Append a genuine duplicate directly, bypassing addAlternateLink's
        // own dedup-by-removal step.
        const duplicate = doc.createElement('link');
        duplicate.rel = 'alternate';
        duplicate.hreflang = firstLang.code;
        duplicate.href = 'https://example.com/de/second';
        doc.head.appendChild(duplicate);
      });

      getHref(firstLang.code).should('eq', 'https://example.com/de/first');
    });

    it('resolves a relative href against the document base URI', () => {
      cy.document().then(doc => addAlternateLink(doc, firstLang.code, '/de/relative-page'));

      getHref(firstLang.code).should('match', /\/de\/relative-page$/);
    });

    it('ignores a link with no href attribute at all', () => {
      cy.document().then(doc => {
        const link = doc.createElement('link');
        link.rel = 'alternate';
        link.hreflang = firstLang.code;
        // No href attribute set at all.
        doc.head.appendChild(link);
      });

      getHref(firstLang.code).should('eq', firstLang.url);
    });

    it('ignores a link with an empty href attribute', () => {
      cy.document().then(doc => addAlternateLink(doc, firstLang.code, ''));

      getHref(firstLang.code).should('eq', firstLang.url);
    });

    it('ignores a link with no hreflang attribute', () => {
      cy.document().then(doc => {
        const link = doc.createElement('link');
        link.rel = 'alternate';
        link.href = 'https://example.com/should-be-ignored';
        // No hreflang attribute set at all.
        doc.head.appendChild(link);
      });

      getHref(firstLang.code).should('eq', firstLang.url);
    });

    it('ignores a link whose rel is not "alternate"', () => {
      cy.document().then(doc => {
        const link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.hreflang = firstLang.code;
        link.href = 'https://example.com/should-be-ignored';
        doc.head.appendChild(link);
      });

      getHref(firstLang.code).should('eq', firstLang.url);
    });

    it('ignores a link whose href cannot be parsed as a URL', () => {
      cy.document().then(doc => {
        // A malformed IPv6 host literal, new URL() throws even when
        // resolved against a valid base, so this entry gets dropped and
        // the language falls back to the config url.
        addAlternateLink(doc, firstLang.code, 'http://[invalid');
      });

      getHref(firstLang.code).should('eq', firstLang.url);
    });
  });

  describe('observeAlternateLinks — reacting to <head> mutations', () => {
    it('picks up a link added after the header has already rendered', () => {
      const overrideUrl = 'https://example.com/de/added-later';

      cy.document().then(doc => addAlternateLink(doc, firstLang.code, overrideUrl));

      getHref(firstLang.code).should('eq', overrideUrl);
    });

    it('falls back to the config url when the alternate link is removed', () => {
      const overrideUrl = 'https://example.com/de/temp';
      let link!: HTMLLinkElement;

      cy.document().then(doc => {
        link = addAlternateLink(doc, firstLang.code, overrideUrl);
      });

      getHref(firstLang.code).should('eq', overrideUrl);

      cy.then(() => link.remove());

      getHref(firstLang.code).should('eq', firstLang.url);
    });

    it('updates the url when the href attribute of an existing alternate link changes', () => {
      const firstUrl = 'https://example.com/de/first';
      const secondUrl = 'https://example.com/de/second';
      let link!: HTMLLinkElement;

      cy.document().then(doc => {
        link = addAlternateLink(doc, firstLang.code, firstUrl);
      });

      getHref(firstLang.code).should('eq', firstUrl);

      cy.then(() => {
        link.href = secondUrl;
      });

      getHref(firstLang.code).should('eq', secondUrl);
    });

    it('moves the override when the hreflang attribute of an existing link changes', () => {
      const overrideUrl = 'https://example.com/de/moved';
      let link!: HTMLLinkElement;

      cy.document().then(doc => {
        link = addAlternateLink(doc, firstLang.code, overrideUrl);
      });

      getHref(firstLang.code).should('eq', overrideUrl);

      cy.then(() => {
        link.hreflang = secondLang.code;
      });

      // The override follows the link to its new language...
      getHref(secondLang.code).should('eq', overrideUrl);
      // ...and the original language reverts to its config url.
      getHref(firstLang.code).should('eq', firstLang.url);
    });

    it('starts applying an override once rel is changed to "alternate"', () => {
      const overrideUrl = 'https://example.com/de/rel-flipped';
      let link!: HTMLLinkElement;

      cy.document().then(doc => {
        link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.hreflang = firstLang.code;
        link.href = overrideUrl;
        doc.head.appendChild(link);
      });

      // Not applied yet — rel isn't "alternate".
      getHref(firstLang.code).should('eq', firstLang.url);

      cy.then(() => {
        link.rel = 'alternate';
      });

      getHref(firstLang.code).should('eq', overrideUrl);
    });

    it('does not clear an override when rel is changed away from "alternate"', () => {
      // This documents current behavior: the observer's rel-attribute check
      // only re-reads <head> when the *new* rel value is "alternate", so
      // switching an already-applied override's rel to something else does
      // not trigger a re-read and the stale override is left in place.
      const overrideUrl = 'https://example.com/de/stale-after-rel-change';
      let link!: HTMLLinkElement;

      cy.document().then(doc => {
        link = addAlternateLink(doc, firstLang.code, overrideUrl);
      });

      getHref(firstLang.code).should('eq', overrideUrl);

      cy.then(() => {
        link.rel = 'stylesheet';
      });

      getHref(firstLang.code).should('eq', overrideUrl);
    });

    it('ignores an added link that is missing href, hreflang, or rel="alternate"', () => {
      cy.document().then(doc => {
        const missingHref = doc.createElement('link');
        missingHref.rel = 'alternate';
        missingHref.hreflang = firstLang.code;
        doc.head.appendChild(missingHref);

        const missingHreflang = doc.createElement('link');
        missingHreflang.rel = 'alternate';
        missingHreflang.href = 'https://example.com/should-be-ignored';
        doc.head.appendChild(missingHreflang);

        const wrongRel = doc.createElement('link');
        wrongRel.rel = 'stylesheet';
        wrongRel.hreflang = firstLang.code;
        wrongRel.href = 'https://example.com/should-be-ignored';
        doc.head.appendChild(wrongRel);
      });

      getHref(firstLang.code).should('eq', firstLang.url);
    });

    it('ignores unrelated <head> mutations, like adding a <meta> tag', () => {
      cy.document().then(doc => {
        const meta = doc.createElement('meta');
        meta.name = 'description';
        meta.content = 'unrelated change';
        meta.setAttribute('data-test-injected', 'true');
        doc.head.appendChild(meta);
      });

      getHref(firstLang.code).should('eq', firstLang.url);
    });
  });
});