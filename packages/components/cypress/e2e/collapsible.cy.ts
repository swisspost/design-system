import 'cypress-real-events';
import { navigateToFragment } from '../support/fragment';

const COLLAPSIBLE_ID = '6a91848c-16ec-4a23-bc45-51c797b5b2c3';
const FIXTURE_PATH = './cypress/fixtures/post-collapsible.test.html';

/**
 * Pause the actual animation after Stencil's asynchronous method proxy starts it.
 */
async function pauseToggle(collapsible: HTMLPostCollapsibleElement, shouldExpand: boolean) {
  const started = new Promise<Animation>((resolve, reject) => {
    collapsible.addEventListener(
      'postToggle',
      () => {
        const [animation] = collapsible.getAnimations();
        if (!animation) {
          reject(new Error('Expected toggle to create an animation.'));
          return;
        }
        animation.pause();
        resolve(animation);
      },
      { once: true },
    );
  });
  const finished = collapsible.toggle(shouldExpand);
  const animation = await started;
  await animation.ready;
  expect(animation.playState).to.equal('paused');
  return { animation, finished };
}

describe('collapsible', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponents(COLLAPSIBLE_ID, 'default', 'post-collapsible', 'post-collapsible-trigger');
      cy.get('@collapsible-trigger').find('.btn').as('trigger');
    });

    it('should have a collapsible', () => {
      cy.get('@collapsible').should('exist');
    });

    it('should have a trigger', () => {
      cy.get('@trigger').should('exist');
    });

    it('should show the collapsible', () => {
      cy.get('@collapsible').should('be.visible');
    });

    it('should set the correct ARIA attribute on the trigger', () => {
      cy.get('@collapsible')
        .invoke('attr', 'id')
        .then(collapsibleId => {
          cy.get('@trigger').should('have.attr', 'aria-controls', collapsibleId);
        });

      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should hide the collapsible after clicking on the trigger once', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.hidden');
    });

    it('should update the "aria-expanded" attribute after hiding the collapsible', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should('be.visible');
    });

    it('should update the "aria-expanded" attribute after showing the collapsible', () => {
      cy.get('@trigger').dblclick();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });
  });

  describe('initially collapsed', () => {
    beforeEach(() => {
      cy.getComponents(
        COLLAPSIBLE_ID,
        'initially-collapsed',
        'post-collapsible',
        'post-collapsible-trigger',
      );
      cy.get('@collapsible-trigger').find('.btn').as('trigger');
    });

    it('should hide the collapsible', () => {
      cy.get('@collapsible').should('be.hidden');
    });

    it('should show the collapsible after clicking on the trigger once', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.visible');
    });

    it('should hide the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should('be.hidden');
    });
  });

  describe('wrapped collapsible', () => {
    beforeEach(() => {
      cy.getComponents(
        COLLAPSIBLE_ID,
        'wrapped-collapsible',
        'post-collapsible',
        'post-collapsible-trigger',
      );
      cy.get('@collapsible-trigger').find('.btn').as('trigger');
    });

    it('should have a collapsible', () => {
      cy.get('@collapsible').should('exist');
    });

    it('should show the collapsible', () => {
      cy.get('@collapsible').should('be.visible');
    });

    it('should set aria-controls to an auto-generated id on the trigger', () => {
      cy.get('@collapsible')
        .invoke('attr', 'id')
        .then(collapsibleId => {
          expect(collapsibleId).to.match(/^collapsible-/);
          cy.get('@trigger').should('have.attr', 'aria-controls', collapsibleId);
        });
    });

    it('should set aria-expanded to true when the collapsible is expanded', () => {
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should hide the collapsible after clicking on the trigger once', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.hidden');
    });

    it('should update aria-expanded to false after hiding the collapsible', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should('be.visible');
    });

    it('should update aria-expanded to true after showing the collapsible', () => {
      cy.get('@trigger').dblclick();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });
  });

  describe('trigger wiring ignores buttons inside the collapsible panel', { baseUrl: null }, () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);

      cy.get('#nested-inner-button').as('section');
      cy.get('@section').find('post-collapsible[data-hydrated]').as('collapsible');

      cy.get('[data-testid="real-trigger"]').as('trigger');
    });

    it('wires the button outside the panel, not the one inside it', () => {
      cy.get('@collapsible').should('be.visible');

      cy.get('@trigger').click();

      cy.get('@collapsible').should('be.hidden');
    });

    it('does not toggle when the inner button is clicked', () => {
      cy.get('@collapsible').should('be.visible');

      cy.get('@collapsible').find('button').contains('Button inside the panel').click();

      cy.get('@collapsible').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });
  });

  describe('trigger deduplication', { baseUrl: null }, () => {
    it('updates wrapping and external triggers once each per collapsed change', () => {
      cy.visit(FIXTURE_PATH);
      cy.get<HTMLPostCollapsibleElement>('#nested post-collapsible[data-hydrated]')
        .as('collapsible')
        .should(([collapsible]) => {
          expect(collapsible.id).not.to.equal('');
        })
        .then(([collapsible]) => {
          const wrapper = collapsible.closest('post-collapsible-trigger');
          wrapper.setAttribute('for', collapsible.id);
          const external = collapsible.ownerDocument.createElement('post-collapsible-trigger');
          external.setAttribute('for', collapsible.id);
          external.id = 'external-trigger';
          external.innerHTML = '<button>External trigger</button>';
          wrapper.after(external);
        });

      cy.get('#external-trigger[data-hydrated] button').should(
        'have.attr',
        'aria-expanded',
        'true',
      );
      cy.get<HTMLPostCollapsibleTriggerElement>('#nested post-collapsible-trigger').then(
        ([trigger]) => {
          Object.defineProperty(trigger, 'update', {
            value: cy.spy(trigger.update).as('updateWrapper'),
          });
        },
      );
      cy.get<HTMLPostCollapsibleTriggerElement>('#external-trigger').then(([trigger]) => {
        Object.defineProperty(trigger, 'update', {
          value: cy.spy(trigger.update).as('updateExternal'),
        });
      });

      cy.get('@collapsible').invoke('prop', 'collapsed', true);
      cy.get('#nested button').should('have.attr', 'aria-expanded', 'false');
      cy.get('#external-trigger button').should('have.attr', 'aria-expanded', 'false');
      cy.get('@updateWrapper').should('have.been.calledOnce');
      cy.get('@updateExternal').should('have.been.calledOnce');

      cy.get('@collapsible').invoke('prop', 'collapsed', false);
      cy.get('#nested button').should('have.attr', 'aria-expanded', 'true');
      cy.get('#external-trigger button').should('have.attr', 'aria-expanded', 'true');
      cy.get('@updateWrapper').should('have.been.calledTwice');
      cy.get('@updateExternal').should('have.been.calledTwice');
    });
  });

  describe('hidden and findable content', { baseUrl: null }, () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);
      cy.get<HTMLPostCollapsibleElement>('#findable-collapsible[data-hydrated]').as('collapsible');
      cy.get('#findable post-collapsible-trigger button').as('trigger');
    });

    it('hides ordinary content inside the shadow root despite a displayed host', () => {
      cy.get('@collapsible').invoke('prop', 'findable', false);
      cy.get('@collapsible')
        .shadow()
        .find('div')
        .first()
        .should($content => {
          expect($content[0].getAttribute('hidden')).to.equal('');
        })
        .and('have.css', 'display', 'none');
      cy.get('@collapsible').should('be.hidden');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('uses until-found only when the browser supports it', () => {
      cy.window().then(win => {
        const supportsBeforeMatch = 'onbeforematch' in win.document.documentElement;
        cy.get('@collapsible')
          .shadow()
          .find('div')
          .first()
          .should($content => {
            expect($content[0].getAttribute('hidden')).to.equal(
              supportsBeforeMatch ? 'until-found' : '',
            );
          });
        if (supportsBeforeMatch) {
          cy.get('@collapsible')
            .shadow()
            .find('div')
            .first()
            .should('not.have.css', 'display', 'none');
        }
      });
      cy.get('@collapsible').should('be.hidden');
    });

    it('keeps ordinary hidden controls out of the tab order', () => {
      cy.get('@collapsible').invoke('prop', 'findable', false);
      cy.get('@trigger').focus().realPress('Tab');
      cy.get('#after-hidden-content').should('be.focused');
    });

    it('keeps content unhidden during closing and restores hidden after the animation', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.visible');
      cy.get('@collapsible').shadow().find('div').first().should('not.have.attr', 'hidden');
      cy.get<JQuery<HTMLPostCollapsibleElement>>('@collapsible').then(async ([collapsible]) => {
        const { animation, finished } = await pauseToggle(collapsible, false);
        expect(collapsible.shadowRoot?.querySelector('div')?.hasAttribute('hidden')).to.equal(
          false,
        );
        animation.finish();
        await finished;
      });
      cy.get('@collapsible').should('not.have.attr', 'data-animating');
      cy.get('@collapsible').shadow().find('div').first().should('have.attr', 'hidden');
      cy.get('@collapsible').should('be.hidden');
    });

    for (const shouldExpand of [true, false]) {
      it(`preserves the final ${shouldExpand ? 'open' : 'closed'} state after rapid toggle reversals`, () => {
        cy.get<JQuery<HTMLPostCollapsibleElement>>('@collapsible').then(([collapsible]) =>
          Promise.all([
            collapsible.toggle(true),
            collapsible.toggle(false),
            collapsible.toggle(true),
            ...(shouldExpand ? [] : [collapsible.toggle(false)]),
          ]),
        );
        cy.get('@collapsible')
          .should(shouldExpand ? 'be.visible' : 'be.hidden')
          .and('not.have.attr', 'data-animating');
        cy.get('@collapsible')
          .shadow()
          .find('div')
          .first()
          .should(shouldExpand ? 'not.have.attr' : 'have.attr', 'hidden');
        cy.get('@trigger').should('have.attr', 'aria-expanded', String(shouldExpand));
      });
    }

    it('updates hiding after direct collapsed property changes', () => {
      cy.get('@collapsible').then(([collapsible]) => {
        cy.spy(collapsible, 'animate').as('animate');
        collapsible.addEventListener('postToggle', cy.spy().as('postToggle'));
      });
      cy.get('@collapsible').invoke('prop', 'collapsed', false);
      cy.get('@collapsible').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      cy.get('@collapsible').invoke('prop', 'collapsed', true);
      cy.get('@collapsible').shadow().find('div').first().should('have.attr', 'hidden');
      cy.get('@collapsible').should('be.hidden');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
      cy.get('@animate').should('not.have.been.called');
      cy.get('@postToggle').should('not.have.been.called');
    });

    it('opens on initial fragment navigation', () => {
      cy.visit(`${FIXTURE_PATH}#findable-target`);
      cy.get('#findable-collapsible[data-hydrated]').should('have.prop', 'collapsed', false);
      cy.get('#findable-target').should('be.visible');
    });

    it('opens native fragment matches and synchronizes ARIA and the existing event', () => {
      const toggle = cy.spy().as('toggle');
      const beforeMatch = cy.spy().as('beforeMatch');
      cy.get('@collapsible').then(([collapsible]) => {
        cy.spy(collapsible, 'animate').as('animate');
        collapsible.addEventListener('postToggle', event =>
          toggle((event as CustomEvent<boolean>).detail),
        );
        collapsible.shadowRoot?.querySelector('div')?.addEventListener('beforematch', beforeMatch);
      });
      cy.get('#find-link').click();
      cy.get('#findable-target').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      cy.get('@toggle').should('have.been.calledOnceWith', true);
      cy.window().then(win => {
        if ('onbeforematch' in win.document.documentElement) {
          cy.get('@beforeMatch').should('have.been.calledOnce');
        }
      });
      cy.get('@collapsible').should('not.have.attr', 'data-animating');
      cy.get('@animate').should('not.have.been.called');
    });

    it('opens encoded fragments and ignores missing targets', () => {
      cy.window().then(win => navigateToFragment(win, 'missing-target'));
      cy.get('@collapsible').should('have.prop', 'collapsed', true);
      cy.window().then(win => navigateToFragment(win, 'encoded%20target'));
      cy.get('[id="encoded target"]').should('be.visible');
      cy.get('@collapsible').should('have.prop', 'collapsed', false);
    });

    it('changes state without animation or an event when toggled while detached', () => {
      const postToggle = cy.spy().as('postToggle');
      cy.get('@collapsible').then(async ([collapsible]) => {
        const animate = cy.spy(collapsible, 'animate');
        collapsible.addEventListener('postToggle', postToggle);
        collapsible.remove();

        expect(await collapsible.toggle(true)).to.equal(true);
        expect(collapsible.collapsed).to.equal(false);
        expect(collapsible.dataset.animating).to.equal(undefined);
        expect(animate.callCount).to.equal(0);
        cy.wrap(postToggle).should('not.have.been.called');
      });
    });

    it('does not emit another opening event when navigating within an open panel', () => {
      const toggle = cy.spy().as('toggle');
      cy.get('@collapsible').then(([collapsible]) => {
        collapsible.addEventListener('postToggle', event =>
          toggle((event as CustomEvent<boolean>).detail),
        );
      });
      cy.get('#find-link').click();
      cy.get('@collapsible').should('have.prop', 'collapsed', false);
      cy.window().then(win => navigateToFragment(win, 'encoded%20target'));
      cy.get('[id="encoded target"]').should('be.visible');
      cy.get('@toggle').should('have.been.calledOnceWith', true);
    });

    it('can reveal the same fragment again after navigating away', () => {
      cy.get('#find-link').click();
      cy.get('#findable-target').should('be.visible');
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.hidden');
      cy.window().then(win => navigateToFragment(win, 'missing-target'));
      cy.location('hash').should('equal', '#missing-target');
      cy.window().then(win => navigateToFragment(win, 'findable-target'));
      cy.get('#findable-target').should('be.visible');
    });

    it('does not let the fallback close over a fragment match during animation', () => {
      cy.visit(FIXTURE_PATH, {
        onBeforeLoad(win) {
          Reflect.deleteProperty(win.HTMLElement.prototype, 'onbeforematch');
        },
      });
      cy.get<HTMLPostCollapsibleElement>('#findable-collapsible[data-hydrated]').then(
        async ([collapsible]) => {
          await collapsible.toggle(true);
          const { animation, finished } = await pauseToggle(collapsible, false);
          const win = collapsible.ownerDocument.defaultView;
          if (!win) throw new Error('Expected the fixture window.');
          await navigateToFragment(win, 'findable-target');
          await finished;
          expect(animation.playState).to.equal('idle');
          expect(collapsible.collapsed).to.equal(false);
        },
      );
      cy.get('#findable-collapsible').should('have.prop', 'collapsed', false);
      cy.get('#findable-target').should('be.visible');
      cy.get('#findable-collapsible').should('not.have.attr', 'data-animating');
    });

    it('can disconnect during a toggle and reconnect without a rejected animation', () => {
      cy.get<JQuery<HTMLPostCollapsibleElement>>('@collapsible').then(async ([collapsible]) => {
        const parent = collapsible.parentElement;
        if (!parent) throw new Error('Expected the collapsible fixture parent.');
        const { animation, finished } = await pauseToggle(collapsible, true);
        collapsible.remove();
        await finished;
        expect(animation.playState).to.equal('idle');
        parent.append(collapsible);
      });
      cy.get('@collapsible').should('be.visible').and('not.have.attr', 'data-animating');
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.hidden');
      cy.get('#find-link').click();
      cy.get('#findable-target').should('be.visible');
    });

    it('does not open non-findable content on fragment navigation', () => {
      cy.visit(`${FIXTURE_PATH}#not-findable-target`);
      cy.get('#not-findable[data-hydrated]').should('have.prop', 'collapsed', true);
      cy.get('#not-findable').shadow().find('div').first().should('have.css', 'display', 'none');
      cy.window().then(win => navigateToFragment(win, 'missing-target'));
      cy.window().then(win => navigateToFragment(win, 'not-findable-target'));
      cy.get('#not-findable').should('have.prop', 'collapsed', true);
      cy.get('#not-findable-target').should('not.be.visible');
    });

    it('opens nested findable ancestors through native fragment navigation', () => {
      cy.window().then(win => {
        expect('onbeforematch' in win.document.documentElement).to.equal(true);
      });
      cy.get('#outer-findable[data-hydrated]').should('have.prop', 'collapsed', true);
      cy.get('#inner-findable[data-hydrated]').should('have.prop', 'collapsed', true);
      cy.get('#inner-findable')
        .shadow()
        .find('div')
        .first()
        .then(([content]) => {
          content.addEventListener('beforematch', cy.spy().as('nativeMatch'));
        });
      for (const id of ['outer-findable', 'inner-findable']) {
        cy.get(`#${id}`).then(([collapsible]) => {
          const toggle = cy.spy().as(`${id}-toggle`);
          collapsible.addEventListener('postToggle', event => {
            if (event.target === collapsible) toggle((event as CustomEvent<boolean>).detail);
          });
          cy.spy(collapsible, 'animate').as(`${id}-animate`);
        });
      }
      cy.window().then(win => navigateToFragment(win, 'nested-target'));
      cy.get('#outer-findable[data-hydrated]').should('have.prop', 'collapsed', false);
      cy.get('#inner-findable[data-hydrated]').should('have.prop', 'collapsed', false);
      cy.get('#nested-target').should('be.visible');
      cy.get('@nativeMatch').should('have.been.calledOnce');
      cy.get('@nativeMatch').its('firstCall.args.0.isTrusted').should('equal', true);
      for (const id of ['outer-findable', 'inner-findable']) {
        cy.get(`@${id}-toggle`).should('have.been.calledOnceWith', true);
        cy.get(`@${id}-animate`).should('not.have.been.called');
      }
    });

    it('opens nested findable ancestors through the hash fallback when unsupported', () => {
      cy.visit(FIXTURE_PATH, {
        onBeforeLoad(win) {
          Reflect.deleteProperty(win.HTMLElement.prototype, 'onbeforematch');
        },
      });
      cy.window().then(win => {
        expect('onbeforematch' in win.document.documentElement).to.equal(false);
      });
      cy.get('#outer-findable[data-hydrated]').should('have.prop', 'collapsed', true);
      cy.get('#inner-findable[data-hydrated]').should('have.prop', 'collapsed', true);
      cy.window().then(win => navigateToFragment(win, 'nested-target'));
      cy.get('#outer-findable[data-hydrated]').should('have.prop', 'collapsed', false);
      cy.get('#inner-findable[data-hydrated]').should('have.prop', 'collapsed', false);
      cy.get('#nested-target').should('be.visible');
    });

    it('keeps unsupported browsers toggleable and opens hash links through the fallback', () => {
      cy.visit(FIXTURE_PATH, {
        onBeforeLoad(win) {
          Reflect.deleteProperty(win.HTMLElement.prototype, 'onbeforematch');
        },
      });
      cy.window().then(win => {
        expect('onbeforematch' in win.document.documentElement).to.equal(false);
      });
      cy.get('#findable-collapsible[data-hydrated]')
        .shadow()
        .find('div')
        .first()
        .should($content => {
          expect($content[0].getAttribute('hidden')).to.equal('');
        })
        .and('have.css', 'display', 'none');
      cy.get('#findable post-collapsible-trigger button').click();
      cy.get('#findable-collapsible').should('be.visible');
      cy.get('#findable post-collapsible-trigger button').click();
      cy.get('#findable-collapsible').should('have.prop', 'collapsed', true).and('be.hidden');
      cy.get('#findable-collapsible').should('not.have.attr', 'data-animating');
      cy.get('#find-link').click();
      cy.get('#findable-target').should('be.visible');
    });
  });

  describe('fallback fragment navigation', { baseUrl: null }, () => {
    const visitOptions = {
      onBeforeLoad(win: Window & typeof globalThis) {
        Reflect.deleteProperty(win.HTMLElement.prototype, 'onbeforematch');
      },
    };

    beforeEach(() => {
      cy.visit(FIXTURE_PATH, visitOptions);
      cy.get<HTMLPostCollapsibleElement>('#findable-collapsible[data-hydrated]').as('collapsible');
      cy.window().then(win => {
        expect('onbeforematch' in win.document.documentElement).to.equal(false);
      });
    });

    it('reveals an initial fragment without native until-found support', () => {
      cy.visit(`${FIXTURE_PATH}#findable-target`, visitOptions);
      cy.get('#findable-collapsible[data-hydrated]').should('have.prop', 'collapsed', false);
      cy.get('#findable-target').should('be.visible');
    });

    it('ignores a handled missing fragment and decodes an encoded target', () => {
      cy.window().then(win => navigateToFragment(win, 'missing-target'));
      cy.get('@collapsible').should('have.prop', 'collapsed', true);
      cy.get('#findable-target').should('not.be.visible');
      cy.window().then(win => navigateToFragment(win, 'encoded%20target'));
      cy.get('@collapsible').should('have.prop', 'collapsed', false);
      cy.get('[id="encoded target"]').should('be.visible');
    });

    it('reveals the same fragment again only after navigation away', () => {
      cy.window().then(win => navigateToFragment(win, 'findable-target'));
      cy.get('#findable-target').should('be.visible');
      cy.get('@collapsible').then(([collapsible]) => collapsible.toggle(false));
      cy.get('@collapsible').should('be.hidden');
      cy.window().then(win => navigateToFragment(win, 'missing-target'));
      cy.get('@collapsible').should('have.prop', 'collapsed', true);
      cy.window().then(win => navigateToFragment(win, 'findable-target'));
      cy.get('@collapsible').should('have.prop', 'collapsed', false);
      cy.get('#findable-target').should('be.visible');
    });

    it('does not emit another opening event for a handled hashchange inside an open panel', () => {
      const toggle = cy.spy().as('fallbackToggle');
      cy.get('@collapsible').then(([collapsible]) => {
        collapsible.addEventListener('postToggle', event =>
          toggle((event as CustomEvent<boolean>).detail),
        );
      });
      cy.window().then(win => navigateToFragment(win, 'findable-target'));
      cy.get('#findable-target').should('be.visible');
      cy.window().then(win => navigateToFragment(win, 'encoded%20target'));
      cy.get('[id="encoded target"]').should('be.visible');
      cy.get('@fallbackToggle').should('have.been.calledOnceWith', true);
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('collapsible');
    cy.checkA11y('#root-inner', undefined, violations => {
      expect(violations).to.have.length(0);
    });
  });
});
