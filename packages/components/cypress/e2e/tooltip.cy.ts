describe('tooltips', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target1').as('target1');
      cy.get('#target2').as('target2');
      cy.get('#tooltip-one').find('post-popovercontainer[popover]').as('tooltip');
    });

    it('should display a tooltip', () => {
      cy.get('@tooltip').should('not.be.visible');
      cy.get('@target2').focus();
      // Checking if a popover is open is a bit tricky, but it either matches the pseudo selector :popover-open
      // or the polyfill sets the class :popover-open (a bit tricky to escape)
      // https://github.com/oddbird/popover-polyfill#caveats
      // prettier-ignore
      cy.get('.\\:popover-open, :popover-open').should('exist');
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
          expect(parseInt(v as string)).to.be.greaterThan(120);
        });
    });

    it('should append aria-describedby without deleting existing values', () => {
      cy.get('@target1')
        .should('have.attr', 'aria-describedby')
        .then((describedBy) => {
          expect(describedBy).to.include('existing-value');
          expect(describedBy).to.include('tooltip-one');
        });
    });

    it('should patch aria and tabindex on the trigger element', () => {
      // Create the tooltip trigger and tooltip elements
      const trigger = document.createElement('post-tooltip-trigger');
      trigger.setAttribute('for', 'tooltip-one');
    
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-secondary', 'btn-large');
      button.innerHTML = 'Button';
    
      // Append the button as the trigger's child
      trigger.appendChild(button);
    
      // Append the trigger to the document body
      document.body.appendChild(trigger);
    
      // Create the tooltip element
      const tooltip = document.createElement('post-tooltip');
      tooltip.setAttribute('id', 'tooltip-one');
      tooltip.setAttribute('placement', 'top');
      tooltip.setAttribute('animation', 'pop-in');
      tooltip.innerHTML = 'Hi there 👋';
    
      // Append the tooltip to the document body
      document.body.appendChild(tooltip);
    
      // Debugging: Log the button's outerHTML to verify its state
      cy.wrap(button).then(($button) => {
        console.log('Button HTML:', $button[0].outerHTML);
      });
    
      // Wait for the component to initialize and apply attributes
      cy.wrap(button)
        .should('have.attr', 'aria-describedby', 'tooltip-one')
        .and('have.attr', 'tabindex', '0');
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
      cy.get('@target-child').trigger('pointerover');
      cy.get('.\\:popover-open, :popover-open').should('exist');
    });
  });

  describe('non-focusable element', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#non-focusable-span').as('target');
    });

    it('should add tabindex', () => {
      cy.get('@target')
        .should('have.attr', 'tabindex')
        .and('eq', '0');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target1').as('target1');

      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-tooltip');
    });
  });
});