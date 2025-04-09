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

    it('should combine current domain with relative "base" property', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/prop')
        .should('have.attr', 'base', '/base/prop');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/prop/1000.svg")`,
      );
    });

    it('should use component "base" property over meta settings', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/prop')
        .should('have.attr', 'base', '/base/prop');
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/path')
        .should('have.attr', 'data-post-icon-base', '/meta/path');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/prop/1000.svg")`,
      );
    });

    it('should combine current domain with meta settings path when no component base is set', () => {
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
      cy.get('head').invoke('append', '<base href="https://base.tag.ch" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://base.tag.ch');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://base.tag.ch/post-icons/1000.svg")',
      );
    });

    it('should combine current domain with relative base[href]', () => {
      cy.get('head').invoke('append', '<base href="/base/path" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/base/path');
      cy.get('@meta')
        .invoke('removeAttr', 'data-post-icon-base')
        .should('not.have.attr', 'data-post-icon-base');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/path/1000.svg")`,
      );
    });

    it('should combine base[href] with meta path when both are relative', () => {
      cy.get('head').invoke('append', '<base href="/base/path" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/base/path');
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/path')
        .should('have.attr', 'data-post-icon-base', '/meta/path');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/path/meta/path/1000.svg")`,
      );
    });

    it('should use absolute component base over base[href]', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://comp.base.ch')
        .should('have.attr', 'base', 'https://comp.base.ch');
      cy.get('head').invoke('append', '<base href="https://base.tag.ch" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://base.tag.ch');
      cy.get('@inner').should('have.css', 'mask-image', 'url("https://comp.base.ch/1000.svg")');
    });

    it('should combine absolute base[href] with relative component base', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/comp/path')
        .should('have.attr', 'base', '/comp/path');
      cy.get('head').invoke('append', '<base href="https://base.tag.ch" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://base.tag.ch');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://base.tag.ch/comp/path/1000.svg")',
      );
    });

    it('should combine relative base[href] with relative component base', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/comp/path')
        .should('have.attr', 'base', '/comp/path');
      cy.get('head').invoke('append', '<base href="/base/path" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/base/path');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/path/comp/path/1000.svg")`,
      );
    });

    it('should prioritize absolute meta path over relative base[href]', () => {
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', 'https://meta.path.ch')
        .should('have.attr', 'data-post-icon-base', 'https://meta.path.ch');
      cy.get('head').invoke('append', '<base href="/base/path" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/base/path');
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

    it('should use CDN fallback if no paths are specified', () => {
      cy.get('@meta')
        .invoke('removeAttr', 'data-post-icon-base')
        .should('not.have.attr', 'data-post-icon-base');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://unpkg.com/@swisspost/design-system-icons/public/post-icons/1000.svg")',
      );
    });

    it('should handle path normalization correctly (removing double slashes)', () => {
      cy.get('head').invoke('append', '<base href="/base/path/" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', '/base/path/');
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/path/')
        .should('have.attr', 'data-post-icon-base', '/meta/path/');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/path/meta/path/1000.svg")`,
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
