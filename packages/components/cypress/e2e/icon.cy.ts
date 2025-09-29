const POSTICON_ID = '0dcfe3c0-bfc0-4107-b43b-7e9d825b805f';

describe('Icon', () => {
  describe('Structure & Props', () => {
    beforeEach(() => {
      cy.getComponent('icon', POSTICON_ID);

      cy.get('head meta[name="design-system-settings"]').as('meta');

      cy.get('@icon').find('span[style]').as('inner');

      cy.get('@icon').invoke('attr', 'name', '1000');
    });

    it('should render', () => {
      cy.get('@icon').should('exist');
    });

    it('should have "meta[design-system-settings]" tag in head that contains an attribute "data-post-icon-base" with value "/post-icons"', () => {
      cy.get('@meta').should('exist').should('have.attr', 'data-post-icon-base', '/post-icons');
    });

    it('should set the icon name according to the "name" property', () => {
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/post-icons/1000.svg")`,
      );
      cy.get('@icon').invoke('attr', 'name', 'accessibility');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/post-icons/accessibility.svg")`,
      );
    });

    it('should use absolute "base" property as is', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://base.prop.ch')
        .should('have.attr', 'base', 'https://base.prop.ch');
      cy.get('@inner').should('have.css', 'mask-image', 'url("https://base.prop.ch/1000.svg")');
    });

    it('should combine relative "base" property with current domain, when no base[href] is set', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/path')
        .should('have.attr', 'base', '/base/path');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/path/1000.svg")`,
      );
    });

    it('should use component "base" property over meta icon path', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/path')
        .should('have.attr', 'base', '/base/path');
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/path')
        .should('have.attr', 'data-post-icon-base', '/meta/path');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/path/1000.svg")`,
      );
    });

    it('should use absolute "meta" property as is, when no base prop is set', () => {
      cy.get('@icon').invoke('attr', 'base', null);
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', 'https://meta.path.ch/')
        .should('have.attr', 'data-post-icon-base', 'https://meta.path.ch/');
      cy.get('@inner').should('have.css', 'mask-image', 'url("https://meta.path.ch/1000.svg")');
    });

    it('should combine base href (or current domain) with relative "meta", when no base prop is set', () => {
      cy.get('@icon').invoke('attr', 'base', null);
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/path')
        .should('have.attr', 'data-post-icon-base', '/meta/path');

      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/meta/path/1000.svg")`,
      );
    });

    it('should use absolute base[href] instead of current domain', () => {
      cy.get('@icon').invoke('attr', 'base', '/post-icons');
      cy.get('head').invoke('append', '<base href="https://href.base.ch" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://href.base.ch');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://href.base.ch/post-icons/1000.svg")',
      );
    });

    it('should combine current domain with relative base[href]', () => {
      cy.get('head').invoke('append', '<base href="/base" />');
      cy.get('head base[href]').as('base').should('exist').should('have.attr', 'href', '/base');

      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta')
        .should('have.attr', 'data-post-icon-base', '/meta');

      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/meta/1000.svg")`,
      );
    });

    it('should use absolute component base over absolute meta path and base[href]', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://comp.base.ch')
        .should('have.attr', 'base', 'https://comp.base.ch');

      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', 'https://meta.path.ch')
        .should('have.attr', 'data-post-icon-base', 'https://meta.path.ch');

      cy.get('head').invoke('append', '<base href="https://href.base.ch" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://href.base.ch');

      cy.get('@inner').should('have.css', 'mask-image', 'url("https://comp.base.ch/1000.svg")');
    });

    it('should combine relative component base with absolute base[href]', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/path')
        .should('have.attr', 'base', '/base/path');

      cy.get('head').invoke('append', '<base href="https://href.base.ch" />');

      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://href.base.ch');

      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://href.base.ch/base/path/1000.svg")',
      );
    });

    it('should combine relative component base with relative base[href] and current domain', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/path')
        .should('have.attr', 'base', '/base/path');
      cy.get('head').invoke('append', '<base href="/basehref/path" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/basehref/path');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/basehref/path/base/path/1000.svg")`,
      );
    });

    it('should prioritize absolute meta path over relative base[href]', () => {
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', 'https://meta.path.ch')
        .should('have.attr', 'data-post-icon-base', 'https://meta.path.ch');
      cy.get('head').invoke('append', '<base href="/basehref/path" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/basehref/path');
      cy.get('@inner').should('have.css', 'mask-image', 'url("https://meta.path.ch/1000.svg")');
    });

    it('should handle multiple levels of paths correctly', () => {
      cy.get('head').invoke('append', '<base href="/level1/level2" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/level1/level2');
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/level3/level4')
        .should('have.attr', 'data-post-icon-base', '/level3/level4');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/level1/level2/level3/level4/1000.svg")`,
      );
    });

    it('should use CDN fallback if no @base prop or meta icon path are specified', () => {
      cy.get('@inner').invoke('removeAttr', 'base').should('not.have.attr', 'base');
      cy.get('@meta')
        .invoke('removeAttr', 'data-post-icon-base')
        .should('not.have.attr', 'data-post-icon-base');

      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("https://unpkg.com/@swisspost/design-system-icons@${Cypress.env(
          'PACKAGE_VERSION',
        )}/public/post-icons/1000.svg")`,
      );
    });

    it('should handle path normalization correctly (removing double slashes)', () => {
      cy.get('head').invoke('append', '<base href="/basehref/path/" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/basehref/path/');
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/path/')
        .should('have.attr', 'data-post-icon-base', '/meta/path/');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/basehref/path/meta/path/1000.svg")`,
      );
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('icon');
      cy.checkA11y('#root-inner');
    });
  });
});
