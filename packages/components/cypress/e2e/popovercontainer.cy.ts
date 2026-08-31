import { getBoundingRect } from './utils/element';
import {
  getPopoverElement,
  getTriggerElement,
  popoverShouldBeClosed,
  popoverShouldBeOpen,
  preparePopoverContext,
  scrollTrigger,
  scrollTriggerWithin,
} from './helper/popovercontainer';

describe('popovercontainer', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => preparePopoverContext('page'));

    it('should open and close through interaction', () => {
      cy.get('@trigger').click();
      popoverShouldBeOpen();

      cy.get('@popover').find('post-closebutton').click();
      popoverShouldBeClosed();
    });

    it('should open and close through API calls', () => {
      let trigger: HTMLButtonElement;
      let popover: HTMLPostPopoverElement;

      getTriggerElement().then(element => (trigger = element));
      getPopoverElement().then(element => (popover = element));

      cy.then(() => popover.show(trigger));
      popoverShouldBeOpen();

      cy.wait(10).then(() => popover.hide());
      popoverShouldBeClosed();

      cy.wait(10).then(() => popover.toggle(trigger));
      popoverShouldBeOpen();

      cy.wait(10).then(() => popover.toggle(trigger));
      popoverShouldBeClosed();
    });
  });

  describe('clipping', () => {
    describe('outside the header', () => {
      beforeEach(() => preparePopoverContext('page'));

      it('should stay open while the trigger is partially covered by the header', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('post-header').then(rect => scrollTrigger('across', rect.bottom));
        popoverShouldBeOpen();
      });

      it('should close once the trigger is fully covered by the header', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('post-header').then(rect => scrollTrigger('above', rect.bottom));
        popoverShouldBeClosed();
      });

      it('should stay open while the trigger is partially outside the viewport', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        cy.window().then(window => scrollTrigger('across', window.innerHeight));
        popoverShouldBeOpen();
      });

      it('should close once the trigger is fully outside the viewport', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        cy.window().then(window => scrollTrigger('below', window.innerHeight));
        popoverShouldBeClosed();
      });
    });

    describe('inside the header', () => {
      beforeEach(() => preparePopoverContext('header'));

      it('should open and close through interaction', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it('should stay open while scrolling, as the header does not affect its own content', () => {
        cy.get('@trigger').click();
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
        cy.get('@trigger').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it("should stay open while the trigger is partially outside the container's scrollport", () => {
        cy.get('@trigger').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollTriggerWithin('@scrollable', 'across', rect.bottom),
        );
        popoverShouldBeOpen();
      });

      it("should close once the trigger is fully outside the container's scrollport", () => {
        cy.get('@trigger').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollTriggerWithin('@scrollable', 'above', rect.bottom),
        );
        popoverShouldBeOpen();
      });

      it('should stay open while the trigger and its container are partially outside the viewport', () => {
        cy.get('@trigger').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        cy.window().then(window => scrollTrigger('across', window.innerHeight));
        popoverShouldBeOpen();
      });

      it('should close once the trigger and its container are fully outside the viewport', () => {
        cy.get('@trigger').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        cy.window().then(window => scrollTrigger('below', window.innerHeight));
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
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it('should stay open when the trigger overlaps the header, as the dialog is on the top layer', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollTriggerWithin('@scrollable', 'below', rect.top),
        );
        popoverShouldBeOpen();
      });

      it("should stay open while the trigger is partially outside the dialog's scrollport", () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollTriggerWithin('@scrollable', 'across', rect.bottom),
        );
        popoverShouldBeOpen();
      });

      it("should close once the trigger is fully outside the dialog's scrollport", () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollTriggerWithin('@scrollable', 'below', rect.bottom),
        );
        popoverShouldBeClosed();
      });
    });
  });
});
