const INTERACTIVE_ELEMENT_SELECTORS = [
  'a',
  'audio[controls]',
  'button',
  'details',
  'embed',
  'iframe',
  'img[usemap]',
  'input:not([type="hidden"])',
  'keygen',
  'label',
  'menu[type="toolbar"]',
  'object[usemap]',
  'select',
  'textarea',
  'video[controls]',
];

describe('card-control', () => {
  describe.skip('structure & props', () => {
    beforeEach(() => {
      cy.getComponent('card-control', { group: 'forms' });
      cy.window().then(win => {
        cy.wrap(cy.spy(win.console, 'error')).as('consoleError');
      });

      cy.get('@card-control').find('.card-control').as('wrapper');

      cy.get('@card-control').find('input.header--input').as('input');

      cy.get('@card-control').find('label.header--label').as('label');

      cy.get('@card-control').find('.header--icon').as('icon');
      cy.get('@card-control').find('.header--icon slot[name="icon"]').as('slotIcon');

      cy.get('@card-control').find('.card-control--content').as('content');
      cy.get('@card-control').find('.card-control--content slot').as('slotContent');
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

      cy.get('@content').should('exist');
      cy.get('@slotContent').should('exist');
    });

    it('should have mandatory attributes', () => {
      cy.get('@card-control').should('have.attr', 'data-version');
      cy.get('@card-control').should('have.attr', 'label').and('eq', 'Label');
      cy.get('@card-control').should('have.attr', 'type').and('eq', 'checkbox');

      cy.get('@input').then($input => {
        const controlId = $input.attr('id');
        const contentId = `${controlId}_Content`;

        cy.get('@input')
          .should('have.attr', 'id')
          .and('contain', 'PostCardControl_')
          .and('eq', controlId);
        cy.get('@input').should('have.attr', 'type').and('eq', 'checkbox');
        cy.get('@input').should('have.attr', 'value').and('eq', 'on');
        cy.get('@input').should('have.attr', 'aria-controls').and('eq', contentId);
        cy.get('@input').should('have.attr', 'aria-expanded').and('eq', 'false');

        cy.get('@label').should('have.attr', 'for').and('eq', controlId);

        cy.get('@content').should('have.attr', 'id').and('eq', contentId);
      });
    });

    it('should have mandatory content', () => {
      cy.get('@label').should('have.text', 'Label');
      cy.get('@content').should('not.be.visible');
    });

    it('should set label text according to "label" prop', () => {
      cy.get('@card-control').invoke('attr', 'label', 'Lorem ipsum');
      cy.get('@label').should('have.text', 'Lorem ipsum');
    });

    it('should render label also with empty string', () => {
      cy.get('@card-control').invoke('attr', 'label', '');
      cy.get('@label').should('exist').and('have.text', '');
    });

    it('should set description text according to "description" prop', () => {
      cy.get('@card-control').find('.header--description').should('not.exist');
      cy.get('@card-control')
        .invoke('attr', 'description', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
        .find('.header--description')
        .should('exist')
        .and('have.text', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.');
    });

    it('should only render description, when "description" prop is not an empty string', () => {
      cy.get('@card-control')
        .invoke('attr', 'description', '')
        .find('.header--description')
        .should('not.exist');

      cy.get('@card-control')
        .invoke('removeAttr', 'description')
        .should('not.have.attr', 'description');
    });

    it('should set input "type" attr according to "type" prop', () => {
      cy.get('@card-control').invoke('attr', 'type', 'radio');
      cy.get('@control').should('have.attr', 'type').and('eq', 'radio');
      cy.get('@card-control').invoke('attr', 'type', 'checkbox');
      cy.get('@control').should('have.attr', 'type').and('eq', 'checkbox');
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

    it('should set validation state according to "state" prop', () => {
      cy.get('@wrapper').should('not.have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'state', '');
      cy.get('@wrapper').should('have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'state', 'state');
      cy.get('@wrapper').should('have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'state', true);
      cy.get('@wrapper').should('have.class', 'is-valid').and('not.have.class', 'is-invalid');
      cy.get('@card-control').invoke('attr', 'state', false);
      cy.get('@wrapper').should('not.have.class', 'is-valid').and('have.class', 'is-invalid');
      cy.get('@card-control').invoke('removeAttr', 'state');
      cy.get('@wrapper').should('not.have.class', 'is-valid').and('not.have.class', 'is-invalid');
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
      cy.getComponent('card-control', { group: 'forms', story: 'content' });
      cy.get('@card-control').invoke('removeAttr', 'checked');

      cy.get('@card-control').find('.card-control').as('wrapper');

      cy.get('@card-control').find('input.header--input').as('input');

      cy.get('@card-control').find('.card-control--content').as('content');
      cy.get('@card-control').find('.card-control--content slot').as('slotContent');
    });

    it.skip('should toggle class "is-focused" when focused/blured', () => {
      cy.get('@input')
        .first()
        .focus()
        .then($input => {
          cy.get('@wrapper').should('have.class', 'is-focused');
          $input[0].blur();
          cy.wrap($input).should('not.have.class', 'is-focused');
        });
    });

    it.skip('should toggle content when clicked', () => {
      cy.get('@content').should('not.be.visible');
      cy.get('@input').should('have.attr', 'aria-expanded').and('eq', 'false');
      cy.get('@card-control').click({ force: true });
      cy.get('@content').should('be.visible');
      cy.get('@input').should('have.attr', 'aria-expanded').and('eq', 'true');
      cy.get('@card-control').click({ force: true });
      cy.get('@content').should('not.be.visible');
      cy.get('@input').should('have.attr', 'aria-expanded').and('eq', 'false');
    });

    it.skip('should not toggle content when clicking on interactive element in content', () => {
      cy.get('@card-control').click();
      cy.get('@input').should('have.attr', 'aria-expanded').and('eq', 'true');
      cy.get('@content').should('be.visible');

      cy.get('@card-control')
        .find('> *')
        .not('[slot]')
        .find(INTERACTIVE_ELEMENT_SELECTORS.join(', '))
        .not('input[type="hidden"]')
        .each($el => {
          if ($el.is('select')) {
            cy.wrap($el).select(0);
          } else {
            cy.wrap($el).click({ force: true });
          }
          cy.get('@input').should('have.attr', 'aria-expanded').and('eq', 'true');
          cy.get('@content').should('be.visible');
        });
    });

    it.skip('should toogle content when used with keyboard', () => {
      // TODO when https://github.com/cypress-io/cypress/issues/311 is ready
    });

    // TODO: test change events
  });

  // TODO: test form association
});
