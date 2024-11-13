describe('Card-Control', () => {
  beforeEach(() => {
    cy.visit('/card-control');

    cy.get('post-card-control[type="checkbox"]').as('checkbox');
    cy.get('@checkbox').find('input.card-control--input').as('checkbox-input');
    cy.get('.form-check input.form-check-input[type="checkbox"]').as('native-checkbox');
    cy.get('post-card-control[type="radio"]').as('radio');
    cy.get('@radio').find('input.card-control--input').as('radio-input');
    cy.get('.form-check input.form-check-input[type="radio"]').as('native-radio');

    cy.get('button[type="reset"]').as('reset');

    cy.get('#validity').as('state');
    cy.get('#output').as('output');
  });

  it('should exist', () => {
    cy.get('@checkbox').should('exist');
    cy.get('@radio').should('exist');
  });

  it('should update the surrounding form value, when checked', () => {
    cy.get('@output').then($output => {
      cy.checkOutputProps($output, {
        checkbox: null,
        radio: null,
      });

      cy.get('@checkbox').click();
      cy.checkOutputProps($output, { checkbox: true });
      cy.get('@checkbox').click();
      cy.checkOutputProps($output, { checkbox: false });
      cy.get('@checkbox-input').type(' ');
      cy.checkOutputProps($output, { checkbox: true });

      cy.get('@radio').each(($control, i) => {
        cy.wrap($control).click();
        cy.checkOutputProps($output, { radio: `option_${i + 1}` });
      });

      cy.get('@radio-input').each(($input, i) => {
        cy.wrap($input).type(' ');
        cy.checkOutputProps($output, { radio: `option_${i + 1}` });
      });
    });
  });

  it('should not update the surrounding form value, when a disabled group member has been checked by keyboard', () => {
    cy.get('@radio').eq(1).invoke('attr', 'disabled', true);
    cy.get('@radio').eq(3).invoke('attr', 'disabled', true);

    cy.wait(0)
      .get('@output')
      .then($output => {
        cy.checkOutputProps($output, { radio: null });

        let option: null | undefined | string = null;

        cy.get('@radio-input')
          .its('length')
          .then(length => {
            cy.get('@radio-input').each(($input, i) => {
              cy.get('@radio-input')
                .eq(i + 1 < length ? i + 1 : 0)
                .then($next => {
                  const isDisabled = $next.attr('aria-disabled') !== undefined;

                  if (!isDisabled) option = $next.val()?.toString();

                  cy.wrap($input).focus().type('{downArrow}');
                  cy.checkOutputProps($output, { radio: option });
                });
            });
          });
      });
  });

  it('should update the surrounding form validity, when checked', () => {
    cy.get('@state').should('contain.text', 'INVALID');

    cy.get('@native-checkbox').check();
    cy.get('@native-radio').eq(2).check();
    cy.get('@radio').eq(2).click();
    cy.get('@radio').eq(2).click();
    cy.get('@state').should('contain.text', 'INVALID');

    cy.get('@checkbox').click();
    cy.get('@state').should('contain.text', 'VALID');
    cy.get('@checkbox').click();
    cy.get('@state').should('contain.text', 'INVALID');

    cy.get('@reset').click();
    cy.get('@native-checkbox').check();
    cy.get('@native-radio').eq(2).check();
    cy.get('@checkbox').click();
    cy.get('@state').should('contain.text', 'INVALID');

    cy.get('@radio').eq(2).click();
    cy.get('@state').should('contain.text', 'VALID');
  });
});
