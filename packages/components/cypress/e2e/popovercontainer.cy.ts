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

    it('should show up on click', () => {
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

      it('should stay open while the trigger is only partially covered by the header', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('post-header').then(rect => scrollTrigger('across', rect.bottom));
        popoverShouldBeOpen();
      });

      it('should close once the trigger is entirely covered by the header', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('post-header').then(rect => scrollTrigger('above', rect.bottom));
        popoverShouldBeClosed();
      });
    });

    describe('inside the header', () => {
      beforeEach(() => preparePopoverContext('header'));

      it('should not be affected by the header it lives in', () => {
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

      it('should show up on click', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it('should stay open while the trigger is only partially scrolled out of the container', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollTriggerWithin('@scrollable', 'across', rect.top),
        );
        popoverShouldBeOpen();
      });

      it('should close once the scrollable container itself is covered by the header', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('post-header').then(rect => scrollTrigger('above', rect.bottom));
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

      it('should show up on click', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        cy.get('@popover').find('post-closebutton').click();
        popoverShouldBeClosed();
      });

      it('should not be affected by the header the dialog sits above', () => {
        cy.get('@trigger').click();
        popoverShouldBeOpen();

        getBoundingRect('@scrollable').then(rect =>
          scrollTriggerWithin('@scrollable', 'below', rect.top),
        );
        popoverShouldBeOpen();
      });

      it('should close once the trigger is entirely scrolled out of the dialog', () => {
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
