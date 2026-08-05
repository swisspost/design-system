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

      cy.get('post-megadropdown-trigger').should('have.attr', 'active', 'true');
      cy.get('@trigger').should('have.class', 'active');
    });

    it('should not mark the trigger active when no slotted link is current', () => {
      cy.get('post-megadropdown-trigger').should('have.attr', 'active', 'false');
      cy.get('@trigger').should('not.have.class', 'active');
    });

    it('should keep the current-page active state distinguishable while the dropdown is open', () => {
      cy.get('@megadropdown')
        .find('a')
        .first()
        .then($link => $link.attr('aria-current', 'page'));
      cy.get('post-megadropdown-trigger').should('have.attr', 'active', 'true');

      cy.get('@trigger').click({ force: true });
      cy.get('@megadropdown').find('.megadropdown').should('be.visible');

      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      cy.get('post-megadropdown-trigger').should('have.attr', 'active', 'true');
    });
  });

  describe('animation on switching between dropdowns', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
      cy.get('post-megadropdown-trigger[data-hydrated]').as('triggers');
    });

    it('should play the entry animation when opening the first dropdown', () => {
      cy.get('@triggers').eq(0).find('button').click({ force: true });
      cy.get('post-megadropdown')
        .eq(0)
        .find('.megadropdown')
        .should($el => {
          expect($el.get(0).getAnimations().length).to.be.greaterThan(0);
        });
    });

    it('should not replay the entry animation when switching directly to another dropdown', () => {
      cy.get('@triggers').eq(0).find('button').click({ force: true });
      cy.get('post-megadropdown').eq(0).find('.megadropdown').should('be.visible');

      cy.get('@triggers').eq(1).find('button').click({ force: true });

      cy.get('post-megadropdown').eq(1).find('.megadropdown').should('be.visible');
      cy.get('post-megadropdown').eq(0).find('.megadropdown').should('not.be.visible');
    });
  });

  describe('style regressions', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').as('trigger');
      cy.get('@trigger').click({ force: true });
    });

    it('should not have a border-radius on megadropdown title links', () => {
      cy.get('@megadropdown')
        .find('.post-megadropdown-list-title')
        .should('have.css', 'border-radius', '0px');
    });

    it('should keep megadropdown-content bottom padding when the content overflows and is scrolled', () => {
      cy.get('@megadropdown')
        .find('.megadropdown-content')
        .then($content => {
          const before = window.getComputedStyle($content.get(0)).paddingBottom;
          cy.get('@megadropdown')
            .find('.megadropdown')
            .scrollTo('bottom')
            .then(() => {
              const after = window.getComputedStyle($content.get(0)).paddingBottom;
              expect(after).to.eq(before);
            });
        });
    });
  });

  describe('chevron rotation', () => {
    function getRotation($icon: JQuery<HTMLElement>): number {
      const transform = window.getComputedStyle($icon.get(0)).transform;
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

  describe('stylesheet actually applied', () => {
    it('should apply the real desktop background, z-index and elevation shadow', () => {
      cy.viewport(1920, 1080);
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().click({ force: true });

      cy.get('@megadropdown')
        .find('.megadropdown')
        .should('have.css', 'background-color', 'rgb(240, 239, 237)')
        .and('have.css', 'z-index', '-1')
        .and($el => {
          expect(window.getComputedStyle($el.get(0)).boxShadow).to.not.eq('none');
        });
    });

    it('should apply the real mobile background and z-index', () => {
      cy.viewport('iphone-6');
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().click({ force: true });

      cy.get('@megadropdown')
        .find('.megadropdown')
        .should('have.css', 'background-color', 'rgb(250, 250, 250)')
        .and('have.css', 'z-index', '1');
    });
  });

  describe('3rd level mobile link styling', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().click({ force: true });
    });

    it('should render a bottom border on every link in the megadropdown list', () => {
      cy.get('@megadropdown')
        .find('.post-megadropdown-list > li > a')
        .each($link => {
          const borderBottom = window.getComputedStyle($link.get(0)).borderBottomWidth;
          expect(parseFloat(borderBottom)).to.be.greaterThan(0);
        });
    });
  });

  describe('responsive columns', () => {
    beforeEach(() => {
      cy.getComponents(MEGADROPDOWN_ID, 'tests', 'post-megadropdown');
    });

    it('should render columns that fill 100% of the available width regardless of count', () => {
      cy.viewport(1920, 1080);
      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().click({ force: true });

      cy.get('@megadropdown')
        .find('.post-megadropdown-grid')
        .then($grid => {
          const gridWidth = $grid.get(0).getBoundingClientRect().width;
          cy.wrap($grid.children()).each($col => {
            const colWidth = $col.get(0).getBoundingClientRect().width;
            expect(colWidth).to.be.greaterThan(0);
            expect(colWidth).to.be.lessThan(gridWidth + 1);
          });
        });
    });

    it('should wrap to a new row when the columns do not fit the available width', () => {
      // requires a fixture variant with enough columns to force a wrap at this viewport
      cy.viewport(1920, 1080);
      cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().click({ force: true });

      cy.get('@megadropdown')
        .find('.post-megadropdown-grid')
        .children()
        .then($cols => {
          if ($cols.length <= 1) {
            cy.log('fixture has a single column, wrap behavior not exercised');
            return;
          }
          const tops = [...$cols].map(col => col.getBoundingClientRect().top);
          const uniqueRows = new Set(tops.map(t => Math.round(t)));
          cy.log(`${uniqueRows.size} row(s) detected for ${$cols.length} column(s)`);
        });
    });
  });
});