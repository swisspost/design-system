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

    // Check that the <meta> tag is present and contains the correct value

    it('should have "meta[design-system-settings]" tag in head that contains an attribute "data-post-icon-base" with value "/post-icons"', () => {
      cy.get('@meta').should('exist').should('have.attr', 'data-post-icon-base', '/post-icons');
    });

    // Check that the "name" of the icon is correctly set
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

    // Check that if "@base" prop is absolute, it is used as is
    it('should use absolute "base" property as is', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://base.prop.ch')
        .should('have.attr', 'base', 'https://base.prop.ch');
      cy.get('@inner').should('have.css', 'mask-image', 'url("https://base.prop.ch/1000.svg")');
    });

    // Check that if "@base" prop is relative and no base href is set, it is combined with current domain
    it('should combine base href (or current domain) with relative "base" property', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/path')
        .should('have.attr', 'base', '/base/path');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/path/1000.svg")`,
      );
    });

    // Check that "@base" prop is prioritized over meta icon path
    it('should use component "base" property over meta settings', () => {
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

    // Check that when no "@base" prop is set and the meta icon path is absolute, it is used as is
    it('should use absolute "meta" property as is, when no base prop is set', () => {
      cy.get('@icon').invoke('attr', 'base', null);
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', 'https://meta.path.ch/')
        .should('have.attr', 'data-post-icon-base', 'https://meta.path.ch/');
      cy.get('@inner').should('have.css', 'mask-image', 'url("https://meta.path.ch/1000.svg")');
    });

    // Check that when no "@base" prop is set, the meta icon path is relative and no base href is set, it is combined with current domain
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

    // If "basehref" is absolute then it is used as is, without prepending the current domain
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

    // If "basehref" is relative then it should be appended to the current domain

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

    // If all "@base" prop, meta icon path and base href are present and absolute, then the @base prop should be prioritized first
    it('should use absolute component base over base[href]', () => {
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

    // Check that if "@base" prop is set as relative, it is combined with an absolute base href

    it('should combine absolute base[href] with relative component base', () => {
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

    // Check that if both "@base" prop and base href are present and relative, they are combined with the curent domain

    it('should combine relative base[href] with relative component base', () => {
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

    // Check that if there is no "@base" prop, an absolute meta icon path and a relative base href are set, then the meta path should be prioiritized
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

    // Handle multiple levels
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

    // When not @base prop or meta icon path are specified, cdn fallback should be used
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

    // CHekc that it handles path normalization correctly
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
