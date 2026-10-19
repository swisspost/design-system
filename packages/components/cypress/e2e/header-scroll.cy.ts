import { HEADER_ID, scrollAndWait } from './helper/header';

describe('header', () => {
  describe('scroll performance', { viewportHeight: 800, viewportWidth: 1920 }, () => {
    const SCROLL_VAR = '--post-header-scroll-top';

    // counts the writes of the scroll custom property on :root
    function spyOnScrollVarWrites() {
      cy.document().then(doc => {
        cy.spy(doc.documentElement.style, 'setProperty').as('setProperty');
      });
    }

    function scrollVarWrites(spy: sinon.SinonSpy) {
      return spy.getCalls().filter(call => call.args[0] === SCROLL_VAR).length;
    }

    function dispatchScrollEvents(times: number) {
      cy.window().then(win => {
        for (let i = 0; i < times; i++) win.dispatchEvent(new Event('scroll'));
      });
    }

    beforeEach(() => {
      cy.getComponent('header', HEADER_ID);
    });

    describe('scroll position publishing', () => {
      it('should publish the scroll position on :root', () => {
        scrollAndWait(120);
        scrollAndWait(0);
      });

      it('should follow the scroll position up and down', () => {
        scrollAndWait(300);
        scrollAndWait(40);
        scrollAndWait(700);
        scrollAndWait(0);
      });

      it('should not write the custom property again when the scroll position is unchanged', () => {
        scrollAndWait(200);
        spyOnScrollVarWrites();

        dispatchScrollEvents(30);

        cy.get<sinon.SinonSpy>('@setProperty').then(spy => {
          expect(scrollVarWrites(spy)).to.eq(0);
        });
      });

      it('should write the custom property only once per distinct scroll position', () => {
        scrollAndWait(100);
        spyOnScrollVarWrites();

        cy.scrollTo(0, 250);
        cy.document()
          .its('documentElement.style')
          .invoke('getPropertyValue', SCROLL_VAR)
          .should('eq', '250px');
        dispatchScrollEvents(30);

        cy.get<sinon.SinonSpy>('@setProperty').then(spy => {
          expect(scrollVarWrites(spy)).to.eq(1);
        });
      });

      it('should never publish a negative scroll position', () => {
        scrollAndWait(50);
        cy.window().then(win => {
          cy.stub(win, 'scrollY').value(-30);
          win.dispatchEvent(new Event('scroll'));
        });
        cy.document()
          .its('documentElement.style')
          .invoke('getPropertyValue', SCROLL_VAR)
          .should('eq', '0px');
      });
    });

    describe('scroll parent resolution', () => {
      it('should not walk the ancestors of the header while scrolling', () => {
        cy.get('@header').then($header => {
          const header = $header[0];
          const ancestors = new Set<Element>();
          for (let el = header.parentElement; el; el = el.parentElement) ancestors.add(el);

          cy.window().then(win => {
            const original = win.getComputedStyle.bind(win);
            const calls: Element[] = [];
            cy.stub(win, 'getComputedStyle').callsFake((el: Element, pseudo?: string | null) => {
              calls.push(el);
              return original(el, pseudo);
            });

            dispatchScrollEvents(30);
            cy.scrollTo(0, 400);

            cy.wrap(null).then(() => {
              expect(calls.filter(el => ancestors.has(el))).to.have.length(0);
            });
          });
        });
      });

      it('should not query the document for a locked scroll parent while scrolling', () => {
        cy.document().then(doc => {
          cy.spy(doc, 'querySelector').as('querySelector');
        });

        dispatchScrollEvents(30);

        cy.get<sinon.SinonSpy>('@querySelector').then(spy => {
          const lockLookups = spy
            .getCalls()
            .filter(call => String(call.args[0]).includes('data-post-scroll-locked'));
          expect(lockLookups).to.have.length(0);
        });
      });

      it('should keep working after the header is removed and reattached', () => {
        cy.get('@header').then($header => {
          const header = $header[0];
          header.remove();
          cy.document().then(doc => doc.body.prepend(header));
        });

        scrollAndWait(180);
        scrollAndWait(0);
      });

      it('should stop reacting to scroll once the header is removed', () => {
        scrollAndWait(100);
        cy.get('@header').then($header => $header[0].remove());
        spyOnScrollVarWrites();

        cy.scrollTo(0, 300);
        dispatchScrollEvents(5);

        cy.get<sinon.SinonSpy>('@setProperty').then(spy => {
          expect(scrollVarWrites(spy)).to.eq(0);
        });
      });

      it('should follow a scroll container that becomes the scroll parent after a resize', () => {
        cy.get('@header').then($header => {
          const container = $header[0].parentElement as HTMLElement;
          container.dataset.testScrollContainer = '';
          container.style.height = '400px';
          container.style.overflowY = 'auto';
        });

        cy.viewport(1900, 800);

        cy.get('[data-test-scroll-container]').then($container => {
          const container = $container[0];
          // make sure there is something to scroll
          const filler = container.ownerDocument.createElement('div');
          filler.style.height = '3000px';
          container.append(filler);
          container.scrollTop = 150;
        });

        cy.document()
          .its('documentElement.style')
          .invoke('getPropertyValue', SCROLL_VAR)
          .should('eq', '150px');
      });

      it('should go back to following the page once the container no longer scrolls', () => {
        cy.get('@header').then($header => {
          const container = $header[0].parentElement as HTMLElement;
          container.dataset.testScrollContainer = '';
          container.style.height = '400px';
          container.style.overflowY = 'auto';
          const filler = container.ownerDocument.createElement('div');
          filler.style.height = '3000px';
          container.append(filler);
        });

        cy.viewport(1900, 800);
        cy.get('[data-test-scroll-container]').then($c => ($c[0].scrollTop = 90));
        cy.document()
          .its('documentElement.style')
          .invoke('getPropertyValue', SCROLL_VAR)
          .should('eq', '90px');

        // back to the page as scroll container
        cy.get('[data-test-scroll-container]').then($c => {
          $c[0].style.overflowY = 'visible';
          $c[0].style.height = '';
          $c[0].scrollTop = 0;
        });
        cy.viewport(1920, 800);
        scrollAndWait(60);
      });
    });
  });
});
