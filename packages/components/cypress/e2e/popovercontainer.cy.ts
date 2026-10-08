import {
  AnchorPosition,
  getPopoverElement,
  getAnchorElement,
  popoverShouldBeClosed,
  popoverShouldBeOnSide,
  popoverShouldBeOpen,
  popoverShouldFitInViewport,
  popoverShouldScrollInternally,
  positionAnchor,
  preparePopoverContext,
  scrollAnchor,
  scrollAnchorWithin,
} from './helper/popovercontainer';
import { getBoundingRect } from './utils/element';
import { Placement, Side, sides } from '@floating-ui/utils';

describe('popovercontainer', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popovercontainer.html');
      preparePopoverContext('page');
    });

    it('should open and close through interaction', () => {
      cy.get('@anchor').click();
      popoverShouldBeOpen();

      cy.get('@popover').find('post-closebutton').click();
      popoverShouldBeClosed();
    });

    it('should open and close through API calls', () => {
      let anchor: HTMLButtonElement;
      let popover: HTMLPostPopoverElement;

      getAnchorElement().then(element => (anchor = element));
      getPopoverElement().then(element => (popover = element));

      cy.then(() => popover.show(anchor));
      popoverShouldBeOpen();

      cy.wait(10).then(() => popover.hide());
      popoverShouldBeClosed();

      cy.wait(10).then(() => popover.toggle(anchor));
      popoverShouldBeOpen();

      cy.wait(10).then(() => popover.toggle(anchor));
      popoverShouldBeClosed();
    });
  });

  describe('placement', () => {
    beforeEach(() => cy.visit('./cypress/fixtures/post-popovercontainer-placement.html'));

    interface Scenario {
      position: AnchorPosition;
      placement: Placement;
      side: Side;
    }

    function runScenario(id: string, scenario: Scenario) {
      preparePopoverContext(id);
      positionAnchor(scenario.position);

      cy.get('@popover').invoke('attr', 'placement', scenario.placement);
      cy.get('@anchor').click({ scrollBehavior: false });

      popoverShouldBeOpen();
      popoverShouldBeOnSide(scenario.side);
      popoverShouldFitInViewport();
    }

    describe('preferred side', () => {
      const scenarios: Scenario[] = [
        { placement: 'top', position: { y: 'bottom' }, side: 'top' },
        { placement: 'bottom', position: { y: 'top' }, side: 'bottom' },
        { placement: 'left', position: { x: 'right' }, side: 'left' },
        { placement: 'right', position: { x: 'left' }, side: 'right' },
      ];

      scenarios.forEach(scenario => {
        it(`should stay on "${scenario.placement}" when there is enough space`, () =>
          runScenario('placement', scenario));
      });
    });

    describe('opposite side', () => {
      const scenarios: Scenario[] = [
        { placement: 'top', position: { y: 'top' }, side: 'bottom' },
        { placement: 'bottom', position: { y: 'bottom' }, side: 'top' },
        { placement: 'left', position: { x: 'left' }, side: 'right' },
        { placement: 'right', position: { x: 'right' }, side: 'left' },
      ];

      scenarios.forEach(scenario => {
        it(`should flip from "${scenario.placement}" to "${scenario.side}" when there is not enough space on the preferred side`, () =>
          runScenario('placement', scenario));
      });
    });

    describe('adjacent side (x)', () => {
      const scenarios: Scenario[] = [
        { placement: 'top', position: { x: 'left' }, side: 'right' },
        { placement: 'top', position: { x: 'right' }, side: 'left' },
        { placement: 'bottom', position: { x: 'left' }, side: 'right' },
        { placement: 'bottom', position: { x: 'right' }, side: 'left' },
      ];

      scenarios.forEach(scenario => {
        it(`should flip from "${scenario.placement}" to "${scenario.side}" when there is not enough space on either side`, () =>
          runScenario('placement-full-height', scenario));
      });
    });

    describe('adjacent side (y)', () => {
      const scenarios: Scenario[] = [
        { placement: 'left', position: { y: 'top' }, side: 'bottom' },
        { placement: 'left', position: { y: 'bottom' }, side: 'top' },
        { placement: 'right', position: { y: 'top' }, side: 'bottom' },
        { placement: 'right', position: { y: 'bottom' }, side: 'top' },
      ];

      scenarios.forEach(scenario => {
        it(`should flip from "${scenario.placement}" to "${scenario.side}" when there is not enough space on either side`, () =>
          runScenario('placement-full-width', scenario));
      });
    });
  });

  describe('sizing', () => {
    beforeEach(() => cy.visit('./cypress/fixtures/post-popovercontainer-sizing.html'));

    function prepareSizingContext(id: string) {
      preparePopoverContext(id);
      cy.get('@popover').find('.popover-container').as('scrollable');
    }

    describe('with overflowing content', () => {
      beforeEach(() => prepareSizingContext('overflowing'));

      sides.forEach(side => {
        it(`should be limited to the viewport and scroll internally when placed on "${side}"`, () => {
          positionAnchor();

          cy.get('@popover').invoke('attr', 'placement', side);
          cy.get('@anchor').click({ scrollBehavior: false });

          popoverShouldBeOpen();
          popoverShouldFitInViewport();
          popoverShouldScrollInternally('@scrollable');
        });
      });

      it('should keep fitting into the viewport while the anchor moves', () => {
        cy.scrollTo(0, 400);
        positionAnchor({ y: 'top' });

        cy.get('@popover').invoke('attr', 'placement', 'bottom');
        cy.get('@anchor').click({ scrollBehavior: false });

        popoverShouldBeOpen();
        popoverShouldFitInViewport();

        // Scroll up, moving the anchor down and reducing the space available below it.
        cy.scrollTo(0, 200);

        popoverShouldBeOpen();
        // Wait for the popover to follow the anchor before checking its size.
        popoverShouldBeOnSide('bottom');
        popoverShouldFitInViewport();
        popoverShouldScrollInternally('@scrollable');
      });
    });

    describe('with fitting content', () => {
      beforeEach(() => prepareSizingContext('fitting'));

      it('should not be resized when its content fits', () => {
        positionAnchor({ y: 'top' });

        cy.get('@popover').invoke('attr', 'placement', 'bottom');
        cy.get('@anchor').click({ scrollBehavior: false });

        popoverShouldBeOpen();

        cy.get('@scrollable')
          .its(0)
          .should(element => {
            expect(element.scrollHeight, 'scrollHeight').to.equal(element.clientHeight);
          });
      });
    });
  });

  describe('clipping', () => {
    beforeEach(() => cy.visit('./cypress/fixtures/post-popovercontainer-clipping.html'));

    describe('outside the header', () => {
      beforeEach(() => preparePopoverContext('page'));

      it('should stay open while the anchor is partially covered by the header', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        getBoundingRect('post-header').then(rect => scrollAnchor('across', rect.bottom));
        popoverShouldBeOpen();
      });

      it('should close once the anchor is fully covered by the header', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        getBoundingRect('post-header').then(rect => scrollAnchor('above', rect.bottom));
        popoverShouldBeClosed();
      });

      it('should stay open while the anchor is partially outside the viewport', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        cy.window().then(window => scrollAnchor('across', window.innerHeight));
        popoverShouldBeOpen();
      });

      it('should close once the anchor is fully outside the viewport', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        cy.window().then(window => scrollAnchor('below', window.innerHeight));
        popoverShouldBeClosed();
      });
    });

    describe('inside the header', () => {
      beforeEach(() => preparePopoverContext('header'));

      it('should open and close through interaction', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it('should stay open while scrolling, as the header does not affect its own content', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        cy.scrollTo('bottom');
        popoverShouldBeOpen();
      });
    });

    describe('inside a scrollable container', () => {
      beforeEach(() => {
        preparePopoverContext('scrollable');
        cy.get('#page-scrollable').as('scrollable');
      });

      it('should open and close through interaction', () => {
        cy.get('@anchor').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it("should stay open while the anchor is partially outside the container's scrollport", () => {
        cy.get('@anchor').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollAnchorWithin('@scrollable', 'across', rect.bottom),
        );
        popoverShouldBeOpen();
      });

      it("should close once the anchor is fully outside the container's scrollport", () => {
        cy.get('@anchor').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollAnchorWithin('@scrollable', 'above', rect.bottom),
        );
        popoverShouldBeOpen();
      });

      it('should stay open while the anchor and its container are partially outside the viewport', () => {
        cy.get('@anchor').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        cy.window().then(window => scrollAnchor('across', window.innerHeight));
        popoverShouldBeOpen();
      });

      it('should close once the anchor and its container are fully outside the viewport', () => {
        cy.get('@anchor').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        cy.window().then(window => scrollAnchor('below', window.innerHeight));
        popoverShouldBeClosed();
      });
    });

    describe('inside a dialog', () => {
      beforeEach(() => {
        preparePopoverContext('dialog');

        cy.get('dialog')
          .its(0)
          .then(dialog => dialog.showModal());

        cy.get('#dialog-scrollable').as('scrollable');
      });

      it('should open and close through interaction', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it('should stay open when the anchor overlaps the header, as the dialog is on the top layer', () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollAnchorWithin('@scrollable', 'below', rect.top),
        );
        popoverShouldBeOpen();
      });

      it("should stay open while the anchor is partially outside the dialog's scrollport", () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollAnchorWithin('@scrollable', 'across', rect.bottom),
        );
        popoverShouldBeOpen();
      });

      it("should close once the anchor is fully outside the dialog's scrollport", () => {
        cy.get('@anchor').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollAnchorWithin('@scrollable', 'below', rect.bottom),
        );
        popoverShouldBeClosed();
      });
    });
  });
});
