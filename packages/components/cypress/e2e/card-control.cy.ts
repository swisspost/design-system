describe('card-control', () => {
  describe('structure & props', () => {
    beforeEach(() => {
      cy.getComponent('card-control', { group: 'forms' });
      cy.window().then(win => {
        cy.wrap(cy.spy(win.console, 'error')).as('consoleError');
      });

      cy.get('@card-control').find('.card-control').as('wrapper');
      cy.get('@card-control').find('input.card-control--input').as('input');
      cy.get('@card-control').find('label.card-control--label').as('label');
      cy.get('@card-control').find('.card-control--icon').as('icon');
      cy.get('@card-control').find('.card-control--icon slot[name="icon"]').as('slotIcon');
    });

    it('should have no console errors', () => {
      cy.get('@consoleError').should('not.be.called');
    });

    it('should render mandatory elements', () => {
      cy.get('@card-control').should('exist');

      cy.get('@input').should('exist');

      cy.get('@label').should('exist');

      cy.get('@icon').should('exist');
      cy.get('@slotIcon').should('exist');
    });

    it('should have mandatory attributes', () => {
      cy.get('@card-control').should('have.attr', 'data-version');
      cy.get('@card-control').should('have.attr', 'label').and('eq', 'Label');
      cy.get('@card-control').should('have.attr', 'type').and('eq', 'checkbox');

      cy.get('@input').then($input => {
        const controlId = $input.attr('id');

        cy.get('@input')
          .should('have.attr', 'id')
          .and('contain', 'PostCardControl_')
          .and('eq', controlId);
        cy.get('@input').should('have.attr', 'type').and('eq', 'checkbox');

        cy.get('@label').should('have.attr', 'for').and('eq', controlId);
      });
    });

    it('should set label text according to "label" prop', () => {
      cy.get('@label').should('have.text', 'Label');
      cy.get('@card-control').invoke('attr', 'label', 'Lorem ipsum');
      cy.get('@label').should('have.text', 'Lorem ipsum');
    });

    it('should render label also with empty string, but log an error', () => {
      cy.get('@card-control').invoke('attr', 'label', '');
      cy.get('@label').should('exist').and('have.text', '');
      cy.get('@consoleError')
        .invoke('getCalls')
        .then(calls => {
          expect(calls[0].args[0].message).to.eq(
            'The "post-card-control" element requires its "label" property to be set.',
          );
        });
    });

    it('should set description text according to "description" prop', () => {
      cy.get('@card-control').find('.card-control--description').should('not.exist');
      cy.get('@card-control')
        .invoke('attr', 'description', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
        .find('.card-control--description')
        .should('exist')
        .and('have.text', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.');
    });

    it('should only render description, when "description" prop is not an empty string', () => {
      cy.get('@card-control')
        .invoke('attr', 'description', '')
        .find('.card-control--description')
        .should('not.exist');
    });

    it('should set input "type" attr according to "type" prop', () => {
      cy.get('@card-control').invoke('attr', 'type', 'radio');
      cy.get('@input').should('have.attr', 'type').and('eq', 'radio');
      cy.get('@card-control').invoke('attr', 'type', 'checkbox');
      cy.get('@input').should('have.attr', 'type').and('eq', 'checkbox');
    });

    it('should log an error when "type" prop is not defined', () => {
      cy.get('@card-control').invoke('attr', 'type', '');
      cy.get('@consoleError')
        .invoke('getCalls')
        .then(calls => {
          expect(calls[0].args[0].message).to.eq(
            'The "post-card-control" element requires its "type" prop to be one of either "checkbox" or "radio".',
          );
        });
    });

    it('should set input "name" attr according to "name" prop', () => {
      cy.get('@input').should('not.have.attr', 'name');
      cy.get('@card-control').invoke('attr', 'name', 'custom-name');
      cy.get('@input').should('have.attr', 'name').and('eq', 'custom-name');
      cy.get('@card-control').invoke('removeAttr', 'name');
      cy.get('@input').should('not.have.attr', 'name');
    });

    it('should set input "value" attr according to "value" prop', () => {
      cy.get('@input').should('not.have.attr', 'value');
      cy.get('@card-control').invoke('attr', 'value', 'custom-value');
      cy.get('@input').should('have.attr', 'value').and('eq', 'custom-value');
      cy.get('@card-control').invoke('removeAttr', 'value');
      cy.get('@input').should('not.have.attr', 'value');
    });

    it('should set input "checked" prop according to "checked" prop', () => {
      cy.get('@wrapper').should('not.have.class', 'is-checked');
      cy.get('@input').should('have.prop', 'checked').and('eq', false);
      cy.get('@card-control').invoke('attr', 'checked', true);
      cy.get('@wrapper').should('have.class', 'is-checked');
      cy.get('@input').should('have.prop', 'checked').and('eq', true);
      cy.get('@card-control').invoke('removeAttr', 'checked');
      cy.get('@wrapper').should('not.have.class', 'is-checked');
      cy.get('@input').should('have.prop', 'checked').and('eq', false);
    });

    it('should set input "disabled" attr according to "disbled" prop', () => {
      cy.get('@wrapper').should('not.have.class', 'is-disabled');
      cy.get('@input').should('not.have.attr', 'aria-disabled');
      cy.get('@card-control').invoke('attr', 'disabled', true);
      cy.get('@wrapper').should('have.class', 'is-disabled');
      cy.get('@input').should('have.attr', 'aria-disabled');
      cy.get('@card-control').invoke('removeAttr', 'disabled');
      cy.get('@wrapper').should('not.have.class', 'is-disabled');
      cy.get('@input').should('not.have.attr', 'aria-disabled');
    });

    it('should set validation state according to "validity" prop', () => {
      cy.get('@wrapper').should('not.have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'validity', '');
      cy.get('@wrapper').should('have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'validity', 'anything-but-false');
      cy.get('@wrapper').should('have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'validity', true);
      cy.get('@wrapper').should('have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'validity', false);
      cy.get('@wrapper').should('not.have.class', 'is-valid').and('have.class', 'is-invalid');
    });

    it('should set icon "name" attr according to "icon" prop', () => {
      cy.get('@slotIcon').find('post-icon').should('not.exist');
      cy.get('@card-control').invoke('attr', 'icon', '1000');
      cy.get('@slotIcon')
        .find('post-icon')
        .should('exist')
        .find('[style*="/1000.svg"]')
        .should('exist');
      cy.get('@card-control').invoke('removeAttr', 'icon');
      cy.get('@slotIcon').find('post-icon').should('not.exist');
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.getComponent('card-control', { group: 'forms' });

      cy.get('@card-control').find('.card-control').as('wrapper');
      cy.get('@card-control').find('input.card-control--input').as('input');
    });

    it('should toggle when clicked or by typing {space}', () => {
      cy.get('@input').should('not.be.checked');
      cy.get('@wrapper').should('not.have.class', 'is-checked').click();
      cy.get('@input').should('be.checked');
      cy.get('@wrapper').should('have.class', 'is-checked').click();
      cy.get('@input').should('not.be.checked');
      cy.get('@wrapper').should('not.have.class', 'is-checked');

      cy.get('@input').type(' ').should('be.checked');
      cy.get('@wrapper').should('have.class', 'is-checked');
      cy.get('@input').focus().type(' ').should('not.be.checked');
      cy.get('@wrapper').should('not.have.class', 'is-checked');
    });

    it('should not toggle when disabled', () => {
      cy.get('@card-control').invoke('attr', 'disabled', true);

      cy.get('@input').should('not.be.checked');
      cy.get('@wrapper').should('not.have.class', 'is-checked').click();
      cy.get('@input').should('not.be.checked');
      cy.get('@wrapper').should('not.have.class', 'is-checked');

      cy.get('@input').type(' ').should('not.be.checked');
      cy.get('@wrapper').should('not.have.class', 'is-checked');
    });

    it('should toggle class "is-focused" when focused/blured', () => {
      cy.get('@wrapper').should('not.have.class', 'is-focused');
      cy.get('@input').should('not.have.focus').focus();

      cy.get('@wrapper').should('have.class', 'is-focused');
      cy.get('@input').should('have.focus').blur({ force: true });

      cy.get('@wrapper').should('not.have.class', 'is-focused');
      cy.get('@input').should('not.have.focus');
    });

    it('should emit input and change events when toggled', () => {
      let inputEventCallCount = 0;
      let changeEventCallCount = 0;

      cy.get('@card-control').then($cardControl => {
        $cardControl.get(0).addEventListener('input', () => inputEventCallCount++);
        $cardControl.get(0).addEventListener('change', () => changeEventCallCount++);
      });

      cy.get('@wrapper')
        .click()
        .then(() => {
          expect(inputEventCallCount).to.eq(1);
          expect(changeEventCallCount).to.eq(1);
        })
        .click()
        .then(() => {
          expect(inputEventCallCount).to.eq(2);
          expect(changeEventCallCount).to.eq(2);
        });

      cy.get('@input')
        .type(' ')
        .then(() => {
          expect(inputEventCallCount).to.eq(3);
          expect(changeEventCallCount).to.eq(3);
        })
        .focus()
        .type(' ')
        .then(() => {
          expect(inputEventCallCount).to.eq(4);
          expect(changeEventCallCount).to.eq(4);
        });
    });

    it('should not emit input and change events when disabled', () => {
      cy.get('@card-control').invoke('attr', 'disabled', true);

      let inputEventCallCount = 0;
      let changeEventCallCount = 0;

      cy.get('@card-control').then($cardControl => {
        $cardControl.get(0).addEventListener('input', () => inputEventCallCount++);
        $cardControl.get(0).addEventListener('change', () => changeEventCallCount++);
      });

      cy.get('@wrapper')
        .click()
        .then(() => {
          expect(inputEventCallCount).to.eq(0);
          expect(changeEventCallCount).to.eq(0);
        });

      cy.get('@input')
        .type(' ')
        .then(() => {
          expect(inputEventCallCount).to.eq(0);
          expect(changeEventCallCount).to.eq(0);
        });
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      cy.getComponent('card-control', { group: 'forms' });

      cy.get('@card-control').find('.card-control').as('wrapper');
      cy.get('@card-control').find('input.card-control--input').as('input');
    });

    it('should reset the checked and validity state to its initial values, when calling public "reset" method', () => {
      cy.get('@card-control').invoke('attr', 'checked', true).invoke('attr', 'validity', true);
      cy.get('@wrapper')
        .should('have.class', 'is-checked')
        .and('have.class', 'is-valid')
        .and('not.have.class', 'is-invalid');
      cy.get('@card-control').then($cardControl => {
        ($cardControl.get(0) as HTMLPostCardControlElement).reset();
        cy.get('@wrapper')
          .should('not.have.class', 'is-checked')
          .and('not.have.class', 'is-valid')
          .and('not.have.class', 'is-invalid');
      });
    });
  });

  describe('form association', { baseUrl: null, includeShadowDom: true }, () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-card-control.test.html');

      cy.get('form#AssociatedForm').as('form');
      cy.get('@form').find('fieldset').as('fieldset');
      cy.get('@form').find('button[type="reset"]').as('reset');
      cy.get('@form').find('button[type="submit"]').as('submit');
      cy.get('@form').find('post-card-control').as('card-control');
      cy.get('@card-control').find('.card-control').as('wrapper');
      cy.get('@card-control').find('input.card-control--input').as('input');
      cy.get('@card-control').find('label.card-control--label').as('label');
      cy.get('@card-control').find('.card-control--icon').as('icon');
      cy.get('@card-control').find('.card-control--icon slot[name="icon"]').as('slotIcon');
    });

    it('should update surrounding formdata when control is toggled', () => {
      cy.get('@form').then($form => {
        cy.get('@wrapper').click();
        cy.checkFormDataPropValue($form, 'CardControl', 'on');
        cy.get('@wrapper').click();
        cy.checkFormDataPropValue($form, 'CardControl', null);

        cy.get('@input').type(' ');
        cy.checkFormDataPropValue($form, 'CardControl', 'on');
        cy.get('@input').focus().type(' ');
        cy.checkFormDataPropValue($form, 'CardControl', null);
      });
    });

    it('should reset surrounding formdata and control itself when form is resetted', () => {
      cy.get('@form').then($form => {
        cy.get('@wrapper').click();
        cy.checkFormDataPropValue($form, 'CardControl', 'on');

        cy.get('@reset').click();
        cy.get('@wrapper').should('not.have.class', 'is-checked');
        cy.get('@input').should('not.be.checked');
        cy.checkFormDataPropValue($form, 'CardControl', null);
      });
    });

    it('should not update surrounding formdata when control is disabled', () => {
      cy.get('@form').then($form => {
        cy.get('@card-control').invoke('attr', 'checked', true).invoke('attr', 'disabled', true);

        cy.get('@wrapper').should('have.class', 'is-checked').and('have.class', 'is-disabled');
        cy.get('@input').should('be.checked').and('have.attr', 'aria-disabled');
        cy.checkFormDataPropValue($form, 'CardControl', null);
      });
    });

    it('should disable control when surrounding fieldset element is disabled', () => {
      cy.get('@form').then($form => {
        cy.get('@fieldset').invoke('attr', 'disabled', true).should('have.attr', 'disabled');
        cy.get('@card-control').invoke('attr', 'checked', true);

        cy.get('@wrapper').should('have.class', 'is-checked').and('have.class', 'is-disabled');
        cy.get('@input').should('be.checked').and('have.attr', 'aria-disabled');
        cy.checkFormDataPropValue($form, 'CardControl', null);
      });
    });

    it('should not update surrounding formdata when control name is not set', () => {
      cy.get('@form').then($form => {
        cy.get('@card-control')
          .invoke('attr', 'checked', true)
          .invoke('removeAttr', 'name')
          .should('not.have.attr', 'name');

        cy.get('@wrapper').should('have.class', 'is-checked');
        cy.get('@input').should('be.checked');
        cy.checkFormDataPropValue($form, 'CardControl', null);
      });
    });
  });
});
