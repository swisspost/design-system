import {
  popoverShouldBeClosed,
  popoverShouldBeOpen,
  preparePopoverContext,
  withPopoverContext,
} from './helper/popovercontainer';

describe('popovercontainer', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => preparePopoverContext('page-top'));

    it('should show up on click', () => {
      popoverShouldBeClosed();
      cy.get('@trigger').click();
      popoverShouldBeOpen();
      cy.get('@popover').find('post-closebutton').click();
      popoverShouldBeClosed();
    });

    it('should listen to API calls', () => {
      popoverShouldBeClosed();
      withPopoverContext(({ popover, trigger }) => popover.show(trigger));
      popoverShouldBeOpen();
      withPopoverContext(({ popover }) => popover.hide());
      popoverShouldBeClosed();
      withPopoverContext(({ popover, trigger }) => popover.toggle(trigger));
      popoverShouldBeOpen();
      withPopoverContext(({ popover, trigger }) => popover.toggle(trigger));
      popoverShouldBeClosed();
    });
  });
});
