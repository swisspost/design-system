import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('header', () => {
  beforeEach(() => {
    prepare(HEADER, 'Default');
    cy.changeArg('language', 'de');
  });

  context('initial state', () => {
    it('renders', () => {
      cy.get('swisspost-internet-header', { timeout: 30000 }).should('have.class', 'hydrated');
    });

    it(`has nav item 'Briefe versenden' selected`, () => {
      cy.changeArg('active-route', 'https://post.ch/de/briefe-versenden');
      cy.get('swisspost-internet-header')
        .shadow()
        .find('post-main-navigation')
        .shadow()
        .find('.main-link.active')
        .should('contain.text', 'Briefe versenden');
    });

    it(`has nav item 'Briefe versenden' selected (works with includeShadowDom: true)`, () => {
      cy.changeArg('active-route', 'https://post.ch/de/briefe-versenden');
      cy.get('.main-link.active').should('contain.text', 'Briefe versenden');
    });

    it('renders in full screen mode', () => {
      cy.viewport(1920, 1080);
      cy.get('body')
        .then(body => body.outerWidth())
        .then(w => {
          cy.get('.main-navigation-container').invoke('outerWidth').should('be.lessThan', w);
          cy.get('.meta-container').invoke('outerWidth').should('be.lessThan', w);

          cy.changeArg('full-width', true);

          cy.get('.main-navigation-container').invoke('outerWidth').should('be.within', 1900, 1920);
          cy.get('.meta-container').invoke('outerWidth').should('be.within', 1900, 1920);
        });
    });
  });

  describe('header security', () => {
    context('malicious input handling', () => {
      it('should prevent malicious project IDs from modifying the config request URL', () => {
        const maliciousProjectIds = [
          'project-id-1?malicious=1&extra=2',
          'project-id-1/../../../malicious', 
          'project-id-1%3Fextra=malicious',
          'project-id-1"><script>alert(1)</script>',
          'project-id-1\';DROP TABLE users;--'
        ];

        maliciousProjectIds.forEach(maliciousProjectId => {
          cy.intercept('GET', '**/api/**', (req) => {
            throw new Error('API call should not be made with invalid project ID');
          }).as('configRequest');
          
          cy.window().then(win => {
            const headerElement = win.document.createElement('swisspost-internet-header');
            headerElement.setAttribute('project', maliciousProjectId);
            headerElement.setAttribute('environment', 'int01');
            
            cy.on('uncaught:exception', (err) => {
              expect(err.message).to.include('Internet Header project key is invalid');
              return false;
            });
            
            win.document.body.appendChild(headerElement);
            
            cy.wait(500).then(() => {
              cy.get('@configRequest.all').should('have.length', 0);
              headerElement.remove();
            });
          });
        });
      });

      it('should prevent malicious environment values from affecting the config request', () => {
        const maliciousEnvironments = [
          'PROD; rm -rf /',
          'INT01?injected=true',
          '<script>alert(1)</script>',
          '../../../etc/passwd'
        ];

        maliciousEnvironments.forEach(maliciousEnv => {
          cy.window().then(win => {
            const headerElement = win.document.createElement('swisspost-internet-header');
            headerElement.setAttribute('project', 'valid-project');
            headerElement.setAttribute('environment', maliciousEnv);
            
            cy.on('uncaught:exception', (err) => {
              expect(err.message).to.include('Internet Header environment');
              expect(err.message).to.include('is not valid');
              return false;
            });
            
            win.document.body.appendChild(headerElement);
            
            cy.wait(500).then(() => {
              headerElement.remove();
            });
          });
        });
      });

      it('should prevent malicious language parameters from being injected', () => {
        const maliciousLanguages = [
          'de?malicious=1',
          'fr"><script>alert(1)</script>',
          'en;DROP TABLE users;--',
          'it%00',
          '../../../etc/passwd'
        ];

        maliciousLanguages.forEach(maliciousLang => {
          cy.changeArg('language', maliciousLang);
          
          cy.get('swisspost-internet-header').then(async el => {
            const currentLang = await el[0].getCurrentLanguage();
            if (currentLang !== maliciousLang) {
              expect(['de', 'fr', 'it', 'en']).to.include(currentLang);
            }
          });
        });
      });

      it('should properly encode custom parameters to prevent injection', () => {
        const maliciousInputs = {
          languageCookieKey: 'cookie"><script>alert(1)</script>',
          languageLocalStorageKey: 'storage?malicious=true'
        };
      
        cy.window().then(win => {
          cy.intercept('GET', '**/api/**/v*/**', req => {
            expect(req.url).not.to.include('<script>');
            expect(req.url).not.to.include('?malicious=true');
            req.reply({
              statusCode: 200,
              body: { header: { navMain: [], navMeta: [], navLang: [] } }
            });
          }).as('configRequest');
      
          const headerElement = win.document.createElement('swisspost-internet-header');
          headerElement.setAttribute('project', 'valid-project');
          headerElement.setAttribute('environment', 'int01');
          headerElement.setAttribute('language-cookie-key', maliciousInputs.languageCookieKey);
          headerElement.setAttribute('language-local-storage-key', maliciousInputs.languageLocalStorageKey);
          
          win.document.body.appendChild(headerElement);
      
          cy.wrap(headerElement)
            .should('have.class', 'hydrated')
            .then(() => headerElement.remove());
        });
      });

      it('should handle malformed JSON payloads safely', () => {
        const malformedJsonPayloads = [
          '{malformed json}',
          '{"malicious": "payload", "extra": ',
          '{"unterminated": "string',
          undefined,
          null,
          []
        ];

        malformedJsonPayloads.forEach(payload => {
          cy.changeArg('customConfig', payload);
          
          cy.get('swisspost-internet-header').should('exist').and('have.class', 'hydrated');
        });
      });

      it('should sanitize the data-version attribute', () => {
        cy.get('swisspost-internet-header').should('have.attr', 'data-version')
          .and('match', /^[a-z0-9.-]+$|^unknown$/);
        
        cy.get('swisspost-internet-header').should($el => {
          const version = $el.attr('data-version');
          expect(version).not.to.include('<script>');
          expect(version).not.to.include('onerror');
          expect(version).not.to.include('../');
        });
      });

      it('should prevent XSS through active route injection', () => {
        const maliciousRoutes = [
          // NOSONAR - This is a security test specifically checking for javascript: protocol
          'javascript:alert(1)',
          'data:text/html,<script>alert(1)</script>',
          '"><img src=x onerror=alert(1)>',
          'https://example.com/\u0000',
          'https://evil.com?redirect=http://legit.com'
        ];

        maliciousRoutes.forEach(route => {
          cy.changeArg('activeRoute', route);
          
          cy.wait(100);
          
          cy.get('swisspost-internet-header')
            .shadow()
            .find('post-main-navigation')
            .shadow()
            .find('a')
            .should('exist')
            .each($link => {
              const href = $link.attr('href');
              if (href) {
                expect(href).not.to.include('<script>');
                // NOSONAR - This is a security test specifically checking for javascript: protocol
                expect(href).not.to.include('javascript:');
                expect(href).not.to.include('data:text/html');
              }
            });
          
          cy.get('swisspost-internet-header')
            .shadow()
            .find('.main-link, .flyout-link')
            .should('exist')
            .each($element => {
              const html = $element.html();
              expect(html).not.to.include('<script>');
              expect(html).not.to.include('onerror');
            });
        });
      });
    });
  });
});
