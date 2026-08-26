import {
  getHeaderBoundingRect,
  getPopoverElement,
  getTriggerElement,
  popoverShouldBeClosed,
  popoverShouldBeOpen,
  preparePopoverContext,
  scrollTrigger,
} from './helper/popovercontainer';

describe('popovercontainer', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => preparePopoverContext('page'));

    it('should show up on click', () => {
      popoverShouldBeClosed();
      cy.get('@trigger').click();
      popoverShouldBeOpen();
      cy.get('@popover').find('post-closebutton').click();
      popoverShouldBeClosed();
    });

    it('should listen to API calls', () => {
      let trigger: HTMLButtonElement;
      let popover: HTMLPostPopoverElement;

      getTriggerElement().then(element => (trigger = element));
      getPopoverElement().then(element => (popover = element));

      popoverShouldBeClosed();
      cy.then(() => popover.show(trigger));
      popoverShouldBeOpen();
      cy.then(() => popover.hide());
      popoverShouldBeClosed();
      cy.then(() => popover.toggle(trigger));
      popoverShouldBeOpen();
      cy.then(() => popover.toggle(trigger));
      popoverShouldBeClosed();
    });
  });

  describe('clipping', () => {
    describe('outside the header', () => {
      beforeEach(() => preparePopoverContext('page'));

      it('should stay open while the trigger is only partially covered by the header', () => {
        cy.get('@trigger').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        getHeaderBoundingRect().then(rect => scrollTrigger('across', rect.bottom));
        popoverShouldBeOpen();
      });

      it('should close once the trigger is entirely covered by the header', () => {
        cy.get('@trigger').click({ scrollBehavior: 'center' });
        popoverShouldBeOpen();

        getHeaderBoundingRect().then(rect => scrollTrigger('above', rect.bottom));
        popoverShouldBeClosed();
      });
    });

    describe('inside the header', () => {
      beforeEach(() => preparePopoverContext('header'));

      it('should not be clipped by the header it lives in', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        cy.scrollTo('bottom');
        popoverShouldBeOpen();
      });
    });
  });
});
