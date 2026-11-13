import { navigateToFragment } from '../support/fragment';

const ACCORDION_ID = '4d1b4185-e04d-494a-ab38-2b56c1778b0b';

describe('accordion', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID);
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('should render', () => {
      cy.get('@accordion').should('exist');
    });

    it('should show three post-collapsible elements', () => {
      cy.get('@collapsibles').should('have.length', 3);
    });

    it('should only show the first element as expanded', () => {
      cy.get('@collapsibles').first().shadow().find('post-collapsible').should('be.visible');
    });

    it('should show the last element as expanded after clicking it', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
    });

    it('should not show the first element as expanded after clicking the last element', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').first().shadow().find('post-collapsible').should('be.hidden');
    });

    it('should propagate "postToggle" event from post-accordion-item on post-accordion', () => {
      const eventHandlerMock = cy.spy();

      cy.get('@accordion').then($el => {
        Cypress.$($el.get(0)).on('postToggle', eventHandlerMock);
      });

      cy.get('@collapsibles')
        .last()
        .click()
        .then(() => {
          cy.wrap(eventHandlerMock).should('have.been.calledTwice');
        });
    });

    describe('icon rotation behavior', () => {
      it('should have icons in all accordion items', () => {
        cy.get('@collapsibles').each($item => {
          cy.wrap($item).shadow().find('post-icon[name="chevronup"]').should('exist');
        });
      });

      it('should show expanded icon (no collapsed class) for the first item initially', () => {
        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('.accordion-button')
          .should('not.have.class', 'collapsed');
      });

      it('should show collapsed icons (collapsed class) for non-expanded items initially', () => {
        cy.get('@collapsibles')
          .not(':first')
          .each($item => {
            cy.wrap($item).shadow().find('.accordion-button').should('have.class', 'collapsed');
          });
      });

      it('should rotate icon when clicking to expand collapsed item', () => {
        cy.get('@collapsibles')
          .last()
          .shadow()
          .find('.accordion-button')
          .should('have.class', 'collapsed');

        cy.get('@collapsibles').last().shadow().find('.accordion-button').click({ force: true });

        cy.get('@collapsibles')
          .last()
          .shadow()
          .find('.accordion-button')
          .should('not.have.class', 'collapsed');
      });

      it('should rotate icon when clicking to collapse expanded item', () => {
        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('.accordion-button')
          .should('not.have.class', 'collapsed');
        cy.get('@collapsibles').first().shadow().find('.accordion-button').click({ force: true });

        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('.accordion-button')
          .should('have.class', 'collapsed');
      });

      it('should have correct icon transform states for collapsed vs expanded', () => {
        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('post-icon')
          .then($expandedIcon => {
            const expandedTransform = $expandedIcon.css('transform');

            cy.get('@collapsibles')
              .last()
              .shadow()
              .find('post-icon')
              .then($collapsedIcon => {
                const collapsedTransform = $collapsedIcon.css('transform');

                expect(expandedTransform).to.not.equal(collapsedTransform);
              });
          });
      });
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID, 'multiple-open-panels');
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('post-accordion-item.toggle(force) expands the item and resolves true', () => {
      cy.get('@collapsibles')
        .last()
        .then($item => {
          const el = $item.get(0) as HTMLPostAccordionItemElement;
          return el.toggle(true).then((result: boolean) => {
            expect(result).to.equal(true);
          });
        })
        .then(() => {
          cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
        });
    });

    it('post-collapsible.toggle(shouldExpand) toggles visibility and returns boolean', () => {
      cy.get('@collapsibles')
        .first()
        .then($item => {
          const itemEl = $item.get(0) as HTMLPostAccordionItemElement;
          return itemEl.toggle(false).then(() => $item);
        })
        .then($item => {
          cy.wrap($item)
            .shadow()
            .find('post-collapsible')
            .then($coll => {
              const collEl = $coll.get(0) as HTMLPostCollapsibleElement;
              return collEl.toggle(true).then((res: boolean) => {
                expect(res).to.equal(true);
              });
            })
            .then(() => {
              cy.get('@collapsibles')
                .first()
                .shadow()
                .find('post-collapsible')
                .should('be.visible');
            });
        });
    });

    it('post-accordion.toggle(id) toggles the given item and emits postToggle', () => {
      cy.get('@collapsibles')
        .last()
        .then($item => {
          const accordionItem = $item.get(0) as HTMLPostAccordionItemElement;
          const itemId = 'accordion-item-toggle-target';
          accordionItem.id = itemId;
          return accordionItem.toggle(false).then(() => itemId);
        })
        .then(itemId => {
          const eventHandlerMock = cy.spy();

          cy.get('@accordion')
            .then($acc => {
              const accordion = $acc.get(0) as HTMLPostAccordionElement;
              Cypress.$(accordion).on('postToggle', eventHandlerMock);
              return accordion.toggle(itemId);
            })
            .then(() => {
              cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
              cy.wrap(eventHandlerMock).should('have.been.called');
            });
        });
    });

    it('post-accordion.expandAll() expands every item', () => {
      cy.get('@accordion')
        .then($acc => {
          const accordion = $acc.get(0) as HTMLPostAccordionElement;
          return accordion.expandAll();
        })
        .then(() => {
          cy.get('@collapsibles').each($item => {
            cy.wrap($item).shadow().find('post-collapsible').should('be.visible');
          });
        });
    });

    it('post-accordion.collapseAll() collapses every item', () => {
      cy.get('@accordion')
        .then($acc => {
          const accordion = $acc.get(0) as HTMLPostAccordionElement;
          return accordion.expandAll().then(() => accordion.collapseAll());
        })
        .then(() => {
          cy.get('@collapsibles').each($item => {
            cy.wrap($item).shadow().find('post-collapsible').should('be.hidden');
          });
        });
    });
  });

  describe('nested', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID, 'nested');
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('should show the first nested element of the first element', () => {
      cy.get('@collapsibles').eq(1).click();
      cy.get('@collapsibles').eq(1).shadow().find('post-collapsible').should('be.visible');
    });

    it('should not show the first nested element as expanded after clicking the last nested element', () => {
      cy.get('@collapsibles').eq(2).click();
      cy.get('@collapsibles').eq(1).shadow().find('post-collapsible').should('be.hidden');
      cy.get('@collapsibles').eq(2).shadow().find('post-collapsible').should('be.visible');
    });

    it('should show the first nested element wrapped in a div in the second parent accordion element', () => {
      cy.get('@collapsibles').eq(4).click();
      cy.get('@collapsibles').eq(5).click();
      cy.get('@collapsibles').eq(4).shadow().find('post-collapsible').should('be.visible');
      cy.get('@collapsibles').eq(5).shadow().find('post-collapsible').should('be.visible');
    });

    it('should not show the first nested element wrapped in a div as expanded after clicking the last nested element', () => {
      cy.get('@collapsibles').eq(4).click();
      cy.get('@collapsibles').eq(7).click();
      cy.get('@collapsibles').eq(5).shadow().find('post-collapsible').should('be.hidden');
      cy.get('@collapsibles').eq(4).shadow().find('post-collapsible').should('be.visible');
      cy.get('@collapsibles').eq(7).shadow().find('post-collapsible').should('be.visible');
    });

    it('should propagate "postToggle" event from nested post-accordion', () => {
      cy.document().then(document => {
        const eventHandlerMock = cy.spy();
        const accordionElement = document.querySelector('post-accordion');
        expect(accordionElement).to.not.equal(null);
        Cypress.$(accordionElement as HTMLPostAccordionElement).on('postToggle', eventHandlerMock);

        cy.get('@collapsibles')
          .eq(3)
          .click()
          .then(() => {
            cy.wrap(eventHandlerMock).should('have.been.called');
          });
      });
    });
  });

  describe('multiple open panels', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID, 'multiple-open-panels');
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('should show the last element as expanded after clicking it', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
    });

    it('should still show the first element as expanded after clicking the last element', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').first().shadow().find('post-collapsible').should('be.visible');
    });
  });

  for (const supportsBeforeMatch of [true, false]) {
    describe(
      `findable panels (${supportsBeforeMatch ? 'native' : 'fallback'})`,
      { baseUrl: null },
      () => {
        const fixture = './cypress/fixtures/post-accordion-item.test.html';
        const visitOptions = {
          onBeforeLoad(win: Window & typeof globalThis) {
            if (!supportsBeforeMatch) {
              Reflect.deleteProperty(win.HTMLElement.prototype, 'onbeforematch');
            }
          },
        };

        beforeEach(() => {
          cy.visit(fixture, visitOptions);
          cy.get<HTMLPostAccordionElement>('#findable-accordion[data-hydrated]').as('accordion');
          cy.get<HTMLPostAccordionItemElement>('#first-findable-item[data-hydrated]').as('first');
          cy.get<HTMLPostAccordionItemElement>('#second-findable-item[data-hydrated]').as('second');
          cy.get('#nested-accordion-item[data-hydrated]').as('nested');
          cy.window().then(win => {
            expect('onbeforematch' in win.document.documentElement).to.equal(supportsBeforeMatch);
          });
        });

        it('forwards findable without overwriting nested accordion configuration', () => {
          cy.get('@first').should('have.prop', 'findable', true);
          cy.get('@first').shadow().find('post-collapsible').should('have.prop', 'findable', true);
          cy.get('#nested-accordion post-accordion-item').should('have.prop', 'findable', false);
          cy.get('@accordion').invoke('prop', 'findable', false);
          cy.get('@first').shadow().find('post-collapsible').should('have.prop', 'findable', false);
          cy.get('@first')
            .shadow()
            .find('post-collapsible')
            .shadow()
            .find('div')
            .first()
            .should('have.css', 'display', 'none');
          cy.get('@accordion').invoke('prop', 'findable', true);
          cy.get('@first').shadow().find('post-collapsible').should('have.prop', 'findable', true);
          cy.get('@nested').should('have.prop', 'findable', false);
          cy.get('#nested-accordion').invoke('prop', 'findable', true);
          cy.get('@nested').should('have.prop', 'findable', true);
          cy.get('@accordion').invoke('prop', 'findable', false);
          cy.get('@first').should('have.prop', 'findable', false);
          cy.get('@nested').should('have.prop', 'findable', true);
        });

        it('does not include nested panels in accordion methods', () => {
          cy.get<HTMLPostAccordionItemElement>(
            '#nested-accordion post-accordion-item[data-hydrated]',
          ).then(async ([nestedItem]) => {
            const outerAccordion = nestedItem
              .closest('post-accordion')
              ?.parentElement?.closest<HTMLPostAccordionElement>('post-accordion');
            if (!outerAccordion) throw new Error('Expected an outer accordion.');

            outerAccordion.multiple = true;
            await outerAccordion.expandAll();
            expect(nestedItem.collapsed).to.equal(true);
            const ownedItems = Array.from(outerAccordion.children).filter(
              (item): item is HTMLPostAccordionItemElement =>
                item.localName === 'post-accordion-item',
            );
            expect(ownedItems.length).to.equal(3);
            ownedItems.forEach(item => expect(item.collapsed).to.equal(false));
            await nestedItem.toggle(true);
            expect(nestedItem.collapsed).to.equal(false);
            await outerAccordion.collapseAll();
            ownedItems.forEach(item => expect(item.collapsed).to.equal(true));
            expect(nestedItem.collapsed).to.equal(false);
            await outerAccordion.toggle('first-findable-item');
            expect(ownedItems[0].collapsed).to.equal(false);
            await outerAccordion.toggle(nestedItem.id).then(
              () => {
                throw new Error('The outer accordion must reject nested item IDs.');
              },
              (error: Error) =>
                expect(error.message).to.equal(
                  `No post-accordion-item found with id #${nestedItem.id}.`,
                ),
            );
            expect(nestedItem.collapsed).to.equal(false);
          });
        });

        it('forwards findable to newly slotted panels', () => {
          cy.get<JQuery<HTMLPostAccordionElement>>('@accordion').then(([accordion]) => {
            const item = accordion.ownerDocument.createElement('post-accordion-item');
            item.id = 'new-findable-item';
            item.collapsed = true;
            item.innerHTML = '<span slot="header">New panel</span><p>New content</p>';
            accordion.append(item);
          });
          cy.get('#new-findable-item[data-hydrated]').should('have.prop', 'findable', true);
          cy.get('#new-findable-item')
            .shadow()
            .find('post-collapsible')
            .should('have.prop', 'findable', true);
        });

        it('opens a panel on initial fragment navigation through its shadow slots', () => {
          cy.visit(`${fixture}#second-accordion-target`, visitOptions);
          cy.get('#second-findable-item[data-hydrated]').should('have.prop', 'collapsed', false);
          cy.get('#second-accordion-target').should('be.visible');
          cy.get('#second-findable-item')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-expanded', 'true')
            .and('not.have.class', 'collapsed');
        });

        it('keeps only the matched panel open in a single-open accordion', () => {
          cy.window().then(win => navigateToFragment(win, 'first-accordion-target'));
          cy.get('@first').should('have.prop', 'collapsed', false);
          cy.window().then(win => navigateToFragment(win, 'second-accordion-target'));
          cy.get('@second').should('have.prop', 'collapsed', false);
          cy.get('@first').should('have.prop', 'collapsed', true);
          cy.get('@first').shadow().find('post-collapsible').should('be.hidden');
          cy.get('#second-accordion-target').should('be.visible');
          cy.get('@second').shadow().find('button').should('have.attr', 'aria-expanded', 'true');
          cy.get('@second')
            .shadow()
            .find('post-collapsible')
            .invoke('attr', 'id')
            .then(id => {
              cy.get('@second').shadow().find('button').should('have.attr', 'aria-controls', id);
            });
        });

        it('preserves open panels when multiple is enabled', () => {
          cy.get('@accordion').invoke('prop', 'multiple', true);
          cy.window().then(win => navigateToFragment(win, 'first-accordion-target'));
          cy.get('@first').should('have.prop', 'collapsed', false);
          cy.window().then(win => navigateToFragment(win, 'second-accordion-target'));
          cy.get('@second').should('have.prop', 'collapsed', false);
          cy.get('@first').should('have.prop', 'collapsed', false);
          cy.get('#first-accordion-target').should('be.visible');
          cy.get('#second-accordion-target').should('be.visible');
        });

        it('leaves panels closed when findable is disabled', () => {
          cy.get('@accordion').invoke('prop', 'findable', false);
          cy.get('@second')
            .shadow()
            .find('post-collapsible')
            .should('have.prop', 'findable', false);
          cy.window().then(win => navigateToFragment(win, 'second-accordion-target'));
          cy.get('@second').should('have.prop', 'collapsed', true);
          cy.get('#second-accordion-target').should('not.be.visible');
        });
      },
    );
  }
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('accordion');
    cy.checkA11y('#root-inner', undefined, violations => {
      expect(violations).to.have.length(0);
    });
  });
});
