const POSTICON_ID = '0dcfe3c0-bfc0-4107-b43b-7e9d825b805f';

describe('Icon', () => {
  describe('Structure & Props', () => {
    beforeEach(() => {
      cy.getComponent('icon', POSTICON_ID);

      // cy.get('head').as('head');
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

    it('should use "base" property for "domain"', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://base.prop.ch')
        .should('have.attr', 'base', 'https://base.prop.ch');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://base.prop.ch/post-icons/1000.svg")',
      );
    });

    it('should use "base" property for "slug"', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/prop')
        .should('have.attr', 'base', '/base/prop');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/prop/1000.svg")`,
      );
    });

    it('should use "base" property for "domain" and "slug"', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://base.prop.ch/base/prop')
        .should('have.attr', 'base', 'https://base.prop.ch/base/prop');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://base.prop.ch/base/prop/1000.svg")',
      );
    });

    it('should use "meta[name="design-system-settings"]" tag for "slug"', () => {
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/tag')
        .should('have.attr', 'data-post-icon-base', '/meta/tag');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/meta/tag/1000.svg")`,
      );
    });

    it('should use "base" property for "slug", before "meta[name="design-system-settings"]" tag', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/prop')
        .should('have.attr', 'base', '/base/prop');
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/tag')
        .should('have.attr', 'data-post-icon-base', '/meta/tag');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/prop/1000.svg")`,
      );
    });

    it('should use "base[href]" tag for "domain"', () => {
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

    it('should use "base[href]" tag for "slug"', () => {
      cy.get('head').invoke('append', '<base href="/base/tag" />');
      cy.get('head base[href]').as('base').should('exist').should('have.attr', 'href', '/base/tag');
      cy.get('@meta')
        .invoke('removeAttr', 'data-post-icon-base')
        .should('not.have.attr', 'data-post-icon-base');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/tag/1000.svg")`,
      );
    });

    it('should use "base[href]" tag for "domain" and "slug"', () => {
      cy.get('head').invoke('append', '<base href="https://base.tag.ch/base/tag" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://base.tag.ch/base/tag');
      cy.get('@meta')
        .invoke('removeAttr', 'data-post-icon-base')
        .should('not.have.attr', 'data-post-icon-base');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://base.tag.ch/base/tag/1000.svg")',
      );
    });

    it('should use "base" property for "domain", before "base[href]" tag', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://base.prop.ch')
        .should('have.attr', 'base', 'https://base.prop.ch');
      cy.get('head').invoke('append', '<base href="https://base.tag.ch" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://base.tag.ch');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://base.prop.ch/post-icons/1000.svg")',
      );
    });

    it('should use "base" property for "slug", before "base[href]" tag', () => {
      cy.get('@icon')
        .invoke('attr', 'base', '/base/prop')
        .should('have.attr', 'base', '/base/prop');
      cy.get('head').invoke('append', '<base href="/base/tag" />');
      cy.get('head base[href]').as('base').should('exist').should('have.attr', 'href', '/base/tag');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/base/prop/1000.svg")`,
      );
    });

    it('should use "base" property for "domain" and "slug", before "base[href]" tag', () => {
      cy.get('@icon')
        .invoke('attr', 'base', 'https://base.prop.ch/base/prop')
        .should('have.attr', 'base', 'https://base.prop.ch/base/prop');
      cy.get('head').invoke('append', '<base href="https://base.tag.ch/base/tag" />');
      cy.get('head base[href]')
        .as('base')
        .should('exist')
        .should('have.attr', 'href', 'https://base.tag.ch/base/tag');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://base.prop.ch/base/prop/1000.svg")',
      );
    });

    it('should use "meta[name="design-system-settings"]" tag for "slug", before "base[href]" tag', () => {
      cy.get('@meta')
        .invoke('attr', 'data-post-icon-base', '/meta/tag')
        .should('have.attr', 'data-post-icon-base', '/meta/tag');
      cy.get('head').invoke('append', '<base href="/base/tag" />');
      cy.get('head base[href]').as('base').should('exist').should('have.attr', 'href', '/base/tag');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        `url("${window.location.origin}/meta/tag/1000.svg")`,
      );
    });

    it('should use "cdn" fallback url if no "slug" is available', () => {
      cy.get('@meta')
        .invoke('removeAttr', 'data-post-icon-base')
        .should('not.have.attr', 'data-post-icon-base');
      cy.get('@inner').should(
        'have.css',
        'mask-image',
        'url("https://unpkg.com/@swisspost/design-system-icons/public/post-icons/1000.svg")',
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
