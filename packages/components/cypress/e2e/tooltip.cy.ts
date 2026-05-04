import { PLACEMENT_TYPES } from '../../src/types';

describe('post-tooltip', { baseUrl: null, includeShadowDom: true }, () => {
  // prettier-ignore
  const shouldBeOpen = () => cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
  const shouldBeClosed = (alias: string) => cy.get(alias).should('not.be.visible');

  // Suppress ResizeObserver errors that fire during animations in every test.
  // cy.on (not Cypress.on) binds to the window of the current test's page,
  // which is what cy.visit() creates. Cypress.on would run too early.
  beforeEach(() => {
    cy.on('uncaught:exception', err => {
      if (err.message.includes('ResizeObserver loop')) return false;
    });
  });

  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target1').as('target1');
      cy.get('#target2').as('target2');
      cy.get('#tooltip-one').find('post-popovercontainer[popover]').as('tooltip');
      cy.get('post-tooltip-trigger[for="tooltip-one"]').as('trigger');
    });

    it('should contain an HTML element inside the trigger, not just plain text', () => {
      cy.get('@trigger').children().should('have.length.at.least', 1);
    });

    it('should display a tooltip', () => {
      cy.get('@tooltip').should('not.be.visible');
      cy.get('@target2').focus();
      // Checking if a popover is open is a bit tricky, but it either matches the pseudo selector :popover-open
      // or the polyfill sets the class :popover-open (a bit tricky to escape)
      // https://github.com/oddbird/popover-polyfill#caveats
      // prettier-ignore
      cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
      cy.get('@target2').blur();
      cy.get('@tooltip').should('not.be.visible');
    });

    it('tooltip placement right', () => {
      cy.get('#tooltip-one').invoke('attr', 'placement', 'right');
      cy.get('@target2').focus();
      cy.wait(10);
      cy.get('@tooltip')
        .should('have.css', 'left')
        .then((v: unknown) => {
          expect(Number.parseInt(v as string)).to.be.greaterThan(120);
        });
    });

    it('should patch aria after trigger is inserted', () => {
      cy.document().then(doc => {
        const trigger = doc.createElement('post-tooltip-trigger');
        trigger.setAttribute('for', 'tooltip-one');

        const btn = doc.createElement('button');
        btn.id = 'added-later';
        btn.textContent = 'added after the fact';

        trigger.append(btn);
        doc.body.append(trigger);
      });

      cy.get('#added-later').should('exist').and('have.attr', 'aria-describedby', 'tooltip-one');
    });

    describe('trigger behavior', () => {
      it('should initialize trigger with correct attributes', () => {
        cy.get('@trigger')
          .first()
          .within(() => {
            cy.get('button')
              .should('have.attr', 'aria-describedby')
              .then(ariaDescribedBy => {
                expect(ariaDescribedBy).to.include('tooltip-one');
              });
          });
      });

      it('should show tooltip on trigger hover', () => {
        cy.get('@tooltip').should('not.be.visible');
        cy.get('@trigger').first().trigger('pointerenter');
        cy.wait(100);
        cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
      });

      it('should hide tooltip on trigger pointerout', () => {
        cy.get('@trigger').first().trigger('pointerenter');
        cy.wait(100);
        cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
        cy.get('@trigger').first().trigger('pointerleave');
        cy.wait(100);
        cy.get('@tooltip').should('not.be.visible');
      });

      it('should show tooltip on trigger focus', () => {
        cy.get('@tooltip').should('not.be.visible');
        cy.get('@trigger').first().find('button').focus();
        cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
      });

      it('should hide tooltip on trigger blur', () => {
        cy.get('@trigger').first().find('button').focus();
        cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
        cy.get('@trigger').first().find('button').blur();
        cy.get('@tooltip').should('not.be.visible');
      });
    });
  });

  describe('with child element', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target-child-element').as('target');
      cy.get('#target-child-element span').as('target-child');
      cy.get('#tooltip-one').find('post-popovercontainer[popover]').as('tooltip');
    });

    it('should show tooltip on hovered child element', () => {
      cy.get('@tooltip').should('not.be.visible');
      cy.get('@target-child').trigger('pointerenter');
      cy.wait(100);
      cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
    });
  });

  describe('non-focusable element', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#non-focusable-span').as('target');
    });

    it('should add tabindex', () => {
      cy.get('@target').should('have.attr', 'tabindex').and('eq', '0');
    });
  });

  describe('placement prop', () => {
    beforeEach(() => {
      cy.viewport(1400, 900);
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#tooltip-one').find('post-popovercontainer[popover]').as('tooltip');
      cy.get('#target2').as('trigger');
    });

    PLACEMENT_TYPES.forEach(placement => {
      it(`renders without error for placement="${placement}"`, () => {
        cy.get('#tooltip-one').invoke('attr', 'placement', placement);
        cy.get('@trigger').focus();
        shouldBeOpen();
        cy.get('@trigger').blur();
      });
    });

    it('positions the tooltip above the trigger by default (placement=top)', () => {
      cy.get('@trigger').focus();
      cy.get('@trigger').then($trigger => {
        const triggerTop = $trigger[0].getBoundingClientRect().top;
        cy.get('@tooltip').then($tooltip => {
          expect($tooltip[0].getBoundingClientRect().bottom).to.be.lessThan(triggerTop + 5);
        });
      });
      cy.get('@trigger').blur();
    });

    it('positions the tooltip below the trigger for placement=bottom', () => {
      cy.get('#tooltip-one').invoke('attr', 'placement', 'bottom');
      cy.get('@trigger').focus();
      cy.wait(50);
      cy.get('@trigger').then($trigger => {
        const triggerBottom = $trigger[0].getBoundingClientRect().bottom;
        cy.get('@tooltip').then($tooltip => {
          expect($tooltip[0].getBoundingClientRect().top).to.be.greaterThan(triggerBottom - 5);
        });
      });
      cy.get('@trigger').blur();
    });

    it('positions the tooltip to the right for placement=right', () => {
      cy.get('#tooltip-one').invoke('attr', 'placement', 'right');
      cy.get('@trigger').focus();
      cy.wait(50);
      cy.get('@trigger').then($trigger => {
        const triggerRight = $trigger[0].getBoundingClientRect().right;
        cy.get('@tooltip').then($tooltip => {
          expect($tooltip[0].getBoundingClientRect().left).to.be.greaterThan(triggerRight - 5);
        });
      });
      cy.get('@trigger').blur();
    });

    it('positions the tooltip to the left for placement=left', () => {
      // Move the trigger to the horizontal center so floating-ui has room on the left
      cy.get('@trigger').invoke('css', 'position', 'fixed');
      cy.get('@trigger').invoke('css', 'left', '700px');
      cy.get('@trigger').invoke('css', 'top', '450px');
      cy.get('#tooltip-one').invoke('attr', 'placement', 'left');
      cy.get('@trigger').focus();
      cy.wait(50);
      cy.get('@trigger').then($trigger => {
        const triggerLeft = $trigger[0].getBoundingClientRect().left;
        cy.get('@tooltip').then($tooltip => {
          expect($tooltip[0].getBoundingClientRect().right).to.be.lessThan(triggerLeft + 5);
        });
      });
      cy.get('@trigger').blur();
    });
  });

  describe('open prop', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#tooltip-methods').as('tooltip');
    });

    it('reflects open=true when shown programmatically', () => {
      cy.get('#method-trigger').then($el => {
        cy.get('@tooltip').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      cy.get('@tooltip').should('have.attr', 'open');
    });

    it('reflects open=false after hide()', () => {
      cy.get('#method-trigger').then($el => {
        cy.get('@tooltip').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      cy.get('@tooltip').then($tooltip => {
        ($tooltip[0] as HTMLPostTooltipElement).hide();
      });
      cy.get('@tooltip').should('not.have.attr', 'open');
    });

    it('makes the host element visible when open', () => {
      cy.get('#method-trigger').then($el => {
        cy.get('@tooltip').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      cy.get('@tooltip').should('not.have.css', 'display', 'none');
    });
  });

  describe('arrow prop', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
    });

    it('renders without an arrow by default', () => {
      cy.get('#tooltip-one').find('post-popovercontainer').should('not.have.class', 'has-arrow');
    });

    it('renders with an arrow when arrow prop is set', () => {
      cy.get('#arrow-trigger').then($el => {
        cy.get('#tooltip-arrow').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      cy.get('#tooltip-arrow').find('post-popovercontainer').should('have.class', 'has-arrow');
      cy.get('#tooltip-arrow').then($tooltip => {
        ($tooltip[0] as HTMLPostTooltipElement).hide();
      });
    });
  });

  describe('show() method', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#tooltip-methods').find('post-popovercontainer[popover]').as('tooltip');
    });

    it('shows the tooltip programmatically', () => {
      shouldBeClosed('@tooltip');
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      shouldBeOpen();
    });

    it('does nothing if tooltip is already open', () => {
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      shouldBeOpen();
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      shouldBeOpen();
    });
  });

  describe('hide() method', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#tooltip-methods').find('post-popovercontainer[popover]').as('tooltip');
    });

    it('hides the tooltip programmatically', () => {
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      shouldBeOpen();
      cy.get('#tooltip-methods').then($tooltip => {
        ($tooltip[0] as HTMLPostTooltipElement).hide();
      });
      shouldBeClosed('@tooltip');
    });
  });

  describe('toggle() method', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#tooltip-methods').find('post-popovercontainer[popover]').as('tooltip');
    });

    it('opens the tooltip when closed', () => {
      shouldBeClosed('@tooltip');
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).toggle($el[0]);
        });
      });
      shouldBeOpen();
    });

    it('closes the tooltip when open', () => {
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      shouldBeOpen();
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).toggle($el[0]);
        });
      });
      shouldBeClosed('@tooltip');
    });

    it('forces open with force=true', () => {
      shouldBeClosed('@tooltip');
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).toggle($el[0], true);
        });
      });
      shouldBeOpen();
    });

    it('forces closed with force=false', () => {
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      shouldBeOpen();
      cy.get('#method-trigger').then($el => {
        cy.get('#tooltip-methods').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).toggle($el[0], false);
        });
      });
      shouldBeClosed('@tooltip');
    });
  });

  describe('page layout', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#tooltip-layout').find('post-popovercontainer[popover]').as('layoutTooltip');
    });

    const showLayoutTooltip = (triggerId = '#layout-trigger') => {
      cy.get(triggerId).then($el => {
        cy.get('#tooltip-layout').then($tooltip => {
          ($tooltip[0] as HTMLPostTooltipElement).show($el[0]);
        });
      });
      cy.get(String.raw`.\:popover-open, :popover-open`).should('exist');
    };

    const hideLayoutTooltip = () => {
      cy.get('#tooltip-layout').then($tooltip => {
        ($tooltip[0] as HTMLPostTooltipElement).hide();
      });
    };

    const snapRect = (selector: string) =>
      cy.get(selector).then($el => $el[0].getBoundingClientRect());

    // Asserts that an element does not shift position (top + left) when the tooltip is shown.
    // Pass triggerId to use a different trigger than the default #layout-trigger.
    const assertNoLayoutShift = (selector: string, triggerId?: string) => {
      snapRect(selector).then(before => {
        showLayoutTooltip(triggerId);
        cy.get(selector).then($el => {
          const after = $el[0].getBoundingClientRect();
          expect(after.top).to.equal(before.top);
          expect(after.left).to.equal(before.left);
        });
        hideLayoutTooltip();
      });
    };

    it('does not shift the button group above the trigger', () => {
      snapRect('#layout-button-group').then(before => {
        showLayoutTooltip();
        cy.get('#layout-button-group').then($el => {
          const after = $el[0].getBoundingClientRect();
          expect(after.top).to.equal(before.top);
          expect(after.left).to.equal(before.left);
          expect(after.height).to.equal(before.height);
        });
        hideLayoutTooltip();
      });
    });

    it('does not shift the tabs above the trigger', () => {
      snapRect('#layout-tabs').then(before => {
        showLayoutTooltip();
        cy.get('#layout-tabs').then($el => {
          const after = $el[0].getBoundingClientRect();
          expect(after.top).to.equal(before.top);
          expect(after.left).to.equal(before.left);
          expect(after.height).to.equal(before.height);
        });
        hideLayoutTooltip();
      });
    });

    it('does not shift the accordion above the trigger', () => assertNoLayoutShift('#layout-accordion-item'));

    it('does not reflow paragraph text before the trigger', () => {
      snapRect('#paragraph-before').then(before => {
        showLayoutTooltip();
        cy.get('#paragraph-before').then($el => {
          const after = $el[0].getBoundingClientRect();
          expect(after.top).to.equal(before.top);
          expect(after.height).to.equal(before.height);
        });
        hideLayoutTooltip();
      });
    });

    it('does not reflow paragraph text after the trigger', () => {
      snapRect('#paragraph-after').then(before => {
        showLayoutTooltip();
        cy.get('#paragraph-after').then($el => {
          const after = $el[0].getBoundingClientRect();
          expect(after.top).to.equal(before.top);
          expect(after.height).to.equal(before.height);
        });
        hideLayoutTooltip();
      });
    });

    it('does not shift inline text after the trigger', () => assertNoLayoutShift('#text-after-trigger'));

    it('does not shift sibling reference boxes when tooltip is shown', () => assertNoLayoutShift('#reference-box', '#layout-trigger-2'));

    it('does not shift a second sibling reference box when tooltip is shown', () => assertNoLayoutShift('#reference-box-2', '#layout-trigger-2'));

    it('does not shift the rating below the trigger', () => assertNoLayoutShift('#layout-rating'));

    it('does not shift the pagination below the trigger', () => assertNoLayoutShift('#layout-pagination'));

    it('does not shift the form input below the trigger', () => assertNoLayoutShift('#test-input'));

    it('does not change the trigger element dimensions when tooltip is shown', () => {
      snapRect('#layout-trigger').then(before => {
        showLayoutTooltip();
        cy.get('#layout-trigger').then($el => {
          const after = $el[0].getBoundingClientRect();
          expect(after.width).to.equal(before.width);
          expect(after.height).to.equal(before.height);
          expect(after.top).to.equal(before.top);
          expect(after.left).to.equal(before.left);
        });
        hideLayoutTooltip();
      });
    });

    it('tooltip is rendered out of flow and does not push content', () => {
      showLayoutTooltip();
      cy.get('@layoutTooltip').should($el => {
        const position = globalThis.getComputedStyle($el[0]).position;
        expect(['fixed', 'absolute']).to.include(position);
      });
      hideLayoutTooltip();
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-tooltip');
    });
  });
});