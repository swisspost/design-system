const ACCORDION_ID = '4d1b4185-e04d-494a-ab38-2b56c1778b0b';

describe('accordion toggle API', () => {
  beforeEach(() => {
    cy.getComponent('accordion', ACCORDION_ID);
    cy.get('@accordion').find('post-accordion-item').as('collapsibles');
  });

  it('post-accordion-item.toggle(force) expands the item and resolves true', () => {
    cy.get('@collapsibles')
      .last()
      .then($item => {
        const el = $item.get(0) as any;
        return el.toggle(true).then((result: boolean) => {
          expect(result).to.equal(true);
        });
      })
      .then(() => {
        cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
      });
  });

  it('post-collapsible.toggle(shouldExpand) toggles visibility and returns boolean', () => {
    // Ensure a known state by collapsing the first item, then toggle via the collapsible element
    cy.get('@collapsibles')
      .first()
      .then($item => {
        const itemEl = $item.get(0) as any;
        // collapse first item first
        return itemEl.toggle(false).then(() => $item);
      })
      .then($item => {
        // access the inner post-collapsible element and call its toggle
        cy.wrap($item)
          .shadow()
          .find('post-collapsible')
          .then($coll => {
            const collEl = $coll.get(0) as any;
            return collEl.toggle(true).then((res: boolean) => {
              expect(res).to.equal(true);
            });
          })
          .then(() => {
            cy.get('@collapsibles').first().shadow().find('post-collapsible').should('be.visible');
          });
      });
  });

  it('post-accordion.toggle(id) toggles the given item and emits postToggle', () => {
    // pick an item that is currently collapsed (use last), ensure it's collapsed
    cy.get('@collapsibles')
      .last()
      .then($item => {
        const itemEl = $item.get(0) as any;
        return itemEl.toggle(false).then(() => $item);
      })
      .then($item => {
        const id = $item.attr('id');

        const EventHandlerMock = cy.spy();

        cy.get('@accordion')
          .then($acc => {
            Cypress.$($acc.get(0)).on('postToggle', EventHandlerMock);
            // call accordion.toggle(id)
            return ($acc.get(0) as any).toggle(id);
          })
          .then(() => {
            // after toggling, the target should be visible and event emitted
            cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
            cy.wrap(EventHandlerMock).should('have.been.called');
          });
      });
  });
});
