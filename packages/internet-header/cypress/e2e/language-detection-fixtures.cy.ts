import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import mockAuth from '../fixtures/internet-header/auth.json';

describe('language detection with fixture pages', { baseUrl: null }, () => {
  beforeEach(() => {
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
    cy.intercept('**/api/headerjs/Json?serviceid=*', testConfiguration).as('getConfig');
  });

  it('should prioritize the prop language set on the custom element', () => {
    cy.visit('./cypress/fixtures/pages/language-mismatch.html?lang=fr');
    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('it');
    });
  });

  it('should detect language from query string', () => {
    cy.visit('./cypress/fixtures/pages/no-language-set.html?lang=fr');
    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('fr');
    });
  });

  it('should detect language from URL segment', () => {
    cy.visit('./cypress/fixtures/pages/it/no-language-set.html');
    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('it');
    });
  });

  it('should get language from local storage using the default key', () => {
    cy.visit('./cypress/fixtures/pages/no-language-set.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('swisspost-internet-header-language', 'fr');
      },
    });

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('fr');
    });
  });

  it('should get language from local storage using a custom key', () => {
    cy.visit('./cypress/fixtures/pages/custom-local-storage.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('custom-local-storage-key', 'fr');
      },
    });

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('fr');
    });
  });

  it('should get language from cookie using language key', () => {
    cy.setCookie('language', 'it');
    cy.visit('./cypress/fixtures/pages/no-language-set.html');

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('it');
    });
  });

  it('should get language from cookie using lang key', () => {
    cy.setCookie('lang', 'it');
    cy.visit('./cypress/fixtures/pages/no-language-set.html');

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('it');
    });
  });

  it('should get language from cookie using custom key', () => {
    cy.setCookie('monster', 'it');
    cy.visit('./cypress/fixtures/pages/cookie-monster.html');

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('it');
    });
  });

  it('should get language from html tag', () => {
    cy.visit('./cypress/fixtures/pages/language-set-on-html-tag.html');

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('fr');
    });
  });

  it('should get language from user preferences', () => {
    cy.visit('./cypress/fixtures/pages/no-language-set.html', {
      onBeforeLoad(win) {
        // Set default browser language explicitly to English
        Object.defineProperty(win.navigator, 'language', {
          value: 'it',
        });
      },
    });

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('it');
    });
  });

  it('should get prop language even if everything else is set to something else', () => {
    cy.setCookie('language', 'en');
    cy.setCookie('lang', 'en');
    cy.setCookie('take-en', 'en');
    cy.visit('./cypress/fixtures/pages/en/every-language-set.html?lang=en', {
      onBeforeLoad(win) {
        // Set default browser language explicitly to English
        Object.defineProperty(win.navigator, 'language', {
          value: 'en',
        });
        win.localStorage.setItem('take-en', 'en');
        win.localStorage.setItem('swissspost-internet-header-language', 'en');
      },
    });

    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('it');
    });
  });

  it('should persist language as cookie option', () => {
    cy.setCookie('monster', 'fr');
    cy.visit('./cypress/fixtures/pages/cookie-monster.html');
    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('fr');

      el[0].language = 'it';

      const lang2 = await el[0].getCurrentLanguage();
      expect(lang2).to.equal('it');

      cy.reload();

      cy.get('swisspost-internet-header').then(async el2 => {
        const lang3 = await el2[0].getCurrentLanguage();
        expect(lang3).to.equal('it');
      });
    });
  });

  it('should persist language as default local-storage option', () => {
    cy.visit('./cypress/fixtures/pages/no-language-set.html');
    cy.get('swisspost-internet-header').then(async el => {
      el[0].language = 'it';

      const lang2 = await el[0].getCurrentLanguage();
      expect(lang2).to.equal('it');

      cy.reload();

      expect(localStorage.getItem('swisspost-internet-header-language')).equal('it');

      cy.get('swisspost-internet-header').then(async el2 => {
        const lang3 = await el2[0].getCurrentLanguage();
        expect(lang3).to.equal('it');
      });
    });
  });

  it('should persist language as custom local-storage option', () => {
    cy.visit('./cypress/fixtures/pages/custom-local-storage.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('custom-local-storage-key', 'fr');
      },
    });
    cy.get('swisspost-internet-header').then(async el => {
      const lang = await el[0].getCurrentLanguage();
      expect(lang).to.equal('fr');

      el[0].language = 'it';

      const lang2 = await el[0].getCurrentLanguage();
      expect(lang2).to.equal('it');

      cy.reload();

      expect(localStorage.getItem('custom-local-storage-key')).equal('it');

      cy.get('swisspost-internet-header').then(async el2 => {
        const lang3 = await el2[0].getCurrentLanguage();
        expect(lang3).to.equal('it');
      });
    });
  });
});
