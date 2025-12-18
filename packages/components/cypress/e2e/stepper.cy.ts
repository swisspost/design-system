describe('stepper', { baseUrl: null }, () => {
  beforeEach(() => {
    cy.visit('./cypress/fixtures/post-stepper.test.html');
  });

  afterEach(() => {
    cy.reload();
  });

  it('should render the post-stepper component', () => {
    cy.get('post-stepper').should('exist');
  });

  // Errors

  it('should log an error if the current label is missing', () => {
    cy.window().then(win => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('post-stepper').invoke('attr', 'text-current-step', null);
    cy.get('@consoleError').should('be.called');
  });

  it('should log an error if the completed label is missing', () => {
    cy.window().then(win => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('post-stepper').invoke('attr', 'completed-label', null);
    cy.get('@consoleError').should('be.called');
  });

  it('should log an error if the mobile step label does not contain #index', () => {
    cy.window().then(win => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('post-stepper').invoke('attr', 'text-step-number', 'Step:');
    cy.get('@consoleError').should('be.called');
  });

  it('should log an error if the mobile step label is missing', () => {
    cy.window().then(win => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('post-stepper').invoke('attr', 'text-step-number', null);
    cy.get('@consoleError').should('be.called');
  });

  // Dynamic classes

  it('should set all inactive classes when current-index is negative', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', -1)
      .wait(100)
      .find('post-stepper-item')
      .then($items => {
        expect($items.filter('.stepper-item-inactive').length).to.equal(5);
      });
  });

  it('should set first step as active when current-index is 0', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 0)
      .wait(100)
      .find('post-stepper-item')
      .then($items => {
        expect($items[0]).to.have.class('stepper-item-current');
        expect($items.filter('.stepper-item-inactive').length).to.equal(4);
      });
  });

  it('should set third step as active when current-index is 2', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 2)
      .wait(100)
      .find('post-stepper-item')
      .then($items => {
        expect($items[2]).to.have.class('stepper-item-current');
        expect($items.filter('.stepper-item-completed').length).to.equal(2);
        expect($items.filter('.stepper-item-inactive').length).to.equal(2);
      });
  });

  it('should set all steps as complete but the last when current-index is last element', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 4)
      .wait(100)
      .find('post-stepper-item')
      .then($items => {
        expect($items[4]).to.have.class('stepper-item-current');
        expect($items.filter('.stepper-item-completed').length).to.equal(4);
        expect($items.filter('.stepper-item-inactive').length).to.equal(0);
      });
  });

  it('should set all steps as complete when current-index is bigger than the steps length', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 5)
      .wait(100)
      .find('post-stepper-item')
      .then($items => {
        expect($items.filter('.stepper-item-current').length).to.equal(0);
        expect($items.filter('.stepper-item-completed').length).to.equal(5);
        expect($items.filter('.stepper-item-inactive').length).to.equal(0);
      });
  });

  // Accessibility and labels

  it('should set aria-current="step" on the current step', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 1)
      .wait(100)
      .find('post-stepper-item')
      .eq(1)
      .should('have.attr', 'aria-current', 'step');
  });

  it('should set aria-live="polite" on the current step', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 1)
      .wait(100)
      .find('post-stepper-item')
      .eq(1)
      .should('have.attr', 'aria-live', 'polite');
  });

  it('should not have aria-live="polite" on future step', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 1)
      .wait(100)
      .find('post-stepper-item')
      .eq(2)
      .should('not.have.attr', 'aria-live');
  });

  it('should set current label on the current step', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 1)
      .wait(100)
      .find('post-stepper-item')
      .eq(1)
      .find('.step-hidden-label')
      .should('have.text', 'Current step:');
  });

  it('should set completed label on completed step', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 1)
      .wait(100)
      .find('post-stepper-item')
      .eq(0)
      .find('.step-hidden-label')
      .should('have.text', 'Completed step:');
  });

  it('should set correct mobile label on stepper', () => {
    cy.get('post-stepper')
      .invoke('attr', 'current-index', 1)
      .wait(100)
      .find('.active-step')
      .should('have.text', 'Step 2 : Step 2');
  });

  // Dynamically added/removed steps

  it('should add correct class when a new step is added dynamically', () => {
    cy.get('post-stepper').find('post-stepper-item').should('have.length', 5);
    cy.get('post-stepper').then($stepper => {
      $stepper[0].appendChild(document.createElement('post-stepper-item'));
      cy.get('post-stepper')
        .wait(100)
        .find('post-stepper-item')
        .should('have.length', 6)
        .last()
        .should('have.class', 'stepper-item-inactive');
    });
  });

  it('should throw an error if there is only one step', () => {
    cy.window().then(win => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('post-stepper').find('post-stepper-item').should('have.length', 5);

    cy.get('post-stepper').then($stepper => {
      const stepper = $stepper[0];
      const allButFirstStep = stepper.querySelectorAll('post-stepper-item:not(:first-child)');
      allButFirstStep.forEach(step => step.remove());
    });

    cy.get('post-stepper').find('post-stepper-item').should('have.length', 1);
    cy.get('@consoleError').should('be.called');
  });
});
