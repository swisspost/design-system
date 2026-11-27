import { navigateToFragment } from '../support/fragment';

const FIXTURE_PATH = './cypress/fixtures/post-collapsible.test.html';

describe('collapsible reveal listener lifecycle', { baseUrl: null }, () => {
  it('removes and restores the same beforematch callback without a hashchange listener', () => {
    cy.visit(FIXTURE_PATH, {
      onBeforeLoad(win) {
        expect('onbeforematch' in win.document.documentElement).to.equal(true);
        cy.spy(win, 'addEventListener').as('addWindowListener');
      },
    });
    cy.get<HTMLPostCollapsibleElement>('#findable-collapsible[data-hydrated]').then(
      ([collapsible]) => {
        const content = collapsible.shadowRoot?.querySelector('div');
        const parent = collapsible.parentElement;
        if (!content || !parent) throw new Error('Expected the hydrated fixture.');

        const add = cy.spy(content, 'addEventListener');
        const remove = cy.spy(content, 'removeEventListener');
        collapsible.remove();
        const removals = remove.getCalls().filter(call => call.args[0] === 'beforematch');
        expect(removals.length).to.equal(1);
        const callback = removals[0].args[1];
        content.dispatchEvent(new Event('beforematch'));
        expect(collapsible.collapsed).to.equal(true);

        parent.append(collapsible);
        expect(
          add.getCalls().some(call => call.args[0] === 'beforematch' && call.args[1] === callback),
        ).to.equal(true);
        content.dispatchEvent(new Event('beforematch'));
        expect(collapsible.collapsed).to.equal(false);
      },
    );
    cy.get('@addWindowListener').should('not.have.been.calledWith', 'hashchange');
    cy.get('#findable-target').should('be.visible');
  });

  it('removes and restores the exact hashchange callback for a single fallback instance', () => {
    cy.visit(FIXTURE_PATH, {
      onBeforeLoad(win) {
        Reflect.deleteProperty(win.HTMLElement.prototype, 'onbeforematch');
      },
    });
    cy.get<HTMLPostCollapsibleElement>('#findable-collapsible[data-hydrated]').then(
      async ([fixture]) => {
        const doc = fixture.ownerDocument;
        const win = doc.defaultView;
        if (!win) throw new Error('Expected the fixture window.');
        expect('onbeforematch' in doc.documentElement).to.equal(false);

        const add = cy.spy(win, 'addEventListener');
        const remove = cy.spy(win, 'removeEventListener');
        const collapsible = doc.createElement('post-collapsible');
        collapsible.id = 'listener-collapsible';
        collapsible.collapsed = true;
        collapsible.findable = true;
        collapsible.innerHTML = '<p id="listener-target">Listener lifecycle content</p>';
        fixture.after(collapsible);
        await collapsible.componentOnReady();
        const content = collapsible.shadowRoot?.querySelector('div');
        const parent = collapsible.parentElement;
        if (!content || !parent) throw new Error('Expected the new collapsible to hydrate.');

        const registrations = add.getCalls().filter(call => call.args[0] === 'hashchange');
        expect(registrations.length).to.equal(1);
        const callback = registrations[0].args[1];
        collapsible.remove();
        expect(
          remove
            .getCalls()
            .some(call => call.args[0] === 'hashchange' && call.args[1] === callback),
        ).to.equal(true);
        await navigateToFragment(win, 'listener-target');
        content.dispatchEvent(new Event('beforematch'));
        expect(collapsible.collapsed).to.equal(true);

        parent.append(collapsible);
        expect(
          add.getCalls().filter(call => call.args[0] === 'hashchange' && call.args[1] === callback)
            .length,
        ).to.equal(2);
        expect(collapsible.collapsed).to.equal(false);
        await collapsible.toggle(false);
        content.dispatchEvent(new Event('beforematch'));
        expect(collapsible.collapsed).to.equal(true);
        await navigateToFragment(win, 'missing-target');
        await navigateToFragment(win, 'listener-target');
        expect(collapsible.collapsed).to.equal(false);
      },
    );
    cy.get('#listener-target').should('be.visible');
  });
});
