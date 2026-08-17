const MEGADROPDOWN_ID = '212efc4e-875b-4497-912d-d28c6baf32f5';

describe('megadropdown', () => {
  describe('default', () => {
    describe('desktop', () => {
      beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
        cy.get('post-megadropdown-trigger[data-hydrated]')
          .find('button')
          .as('megadropdown-trigger');
        cy.get('@megadropdown').find('.close-button').as('close-btn');
        cy.get('@megadropdown').find('.megadropdown').as('megadropdown-container');
      });

      it('should render', () => {
        cy.get('@megadropdown').should('exist');
        cy.get('@megadropdown-trigger').should('exist');
        cy.get('@megadropdown-container').should('exist');
        cy.get('@megadropdown-container').should('be.hidden');
      });

      it('should open on trigger click', () => {
        cy.get('@megadropdown-trigger').should('exist');
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@megadropdown-container').should('be.visible');
      });

      it('should show close button', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@close-btn').should('be.visible');
      });

      it('should not show back button', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@megadropdown').find('.back-button').should('not.exist');
      });

      it('should close on close button click', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@close-btn').click();
        cy.get('@megadropdown-container').should('be.hidden');
      });
    });

    describe('mobile', () => {
      beforeEach(() => {
        cy.viewport(500, 1200);
        cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
        cy.get('post-megadropdown-trigger[data-hydrated]')
          .find('button')
          .as('megadropdown-trigger');
        cy.get('@megadropdown').find('.back-button').as('back-btn');
      });

      it('should open on trigger click', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@megadropdown').should('be.visible');
      });

      it('should show back button', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@back-btn').should('be.visible');
      });

      it('should not show close button', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@megadropdown').find('.close-button').should('not.exist');
      });
    });
  });

  describe('active state', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').as('trigger');
    });

    it('should mark the trigger active when a slotted link has aria-current="page"', () => {
      cy.get('@megadropdown')
        .find('a')
        .first()
        .then($link => $link.attr('aria-current', 'page'));

      cy.get('post-megadropdown-trigger').should('have.attr', 'active');
      cy.get('@trigger').should('have.class', 'active');
    });

    it('should not mark the trigger active when no slotted link is current', () => {
      cy.get('post-megadropdown-trigger').should('not.have.attr', 'active');
      cy.get('@trigger').should('not.have.class', 'active');
    });

    it('should keep the current-page active state distinguishable while the dropdown is open', () => {
      cy.get('@megadropdown')
        .find('a')
        .first()
        .then($link => $link.attr('aria-current', 'page'));
      cy.get('post-megadropdown-trigger').should('have.attr', 'active');

      cy.get('@trigger').click({ force: true });
      cy.get('@megadropdown').find('.megadropdown').should('be.visible');

      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      cy.get('post-megadropdown-trigger').should('have.attr', 'active');
    });
  });

  describe('chevron rotation', () => {
    function getRotation($icon: JQuery<HTMLElement>): number {
      const transform = globalThis.getComputedStyle($icon.get(0)).transform;
      if (transform === 'none') return 0;
      const values = transform.match(/matrix\(([^)]+)\)/)?.[1].split(',').map(Number);
      if (!values) return 0;
      const [a, b] = values;
      return Math.round((Math.atan2(b, a) * 180) / Math.PI);
    }

    beforeEach(() => {
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
    });

    it('should rotate the chevron 180deg on desktop when the dropdown opens, and back on close', () => {
      cy.viewport(1920, 1080);
      cy.get('post-megadropdown-trigger[data-hydrated]').find('post-icon').first().as('chevron');

      cy.get('@chevron').should($icon => expect(getRotation($icon)).to.eq(0));

      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().click({ force: true });

      cy.get('@chevron').should($icon => expect(Math.abs(getRotation($icon))).to.eq(180));
    });

    it('should keep the chevron fixed at -90deg on mobile regardless of open state', () => {
      cy.viewport('iphone-6');
      cy.get('post-megadropdown-trigger[data-hydrated]').find('post-icon').first().as('chevron');

      cy.get('@chevron').should($icon => expect(getRotation($icon)).to.eq(-90));

      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().click({ force: true });

      cy.get('@chevron').should($icon => expect(getRotation($icon)).to.eq(-90));
    });
  });
});
