const NUMBER_INPUT_ID = 'd5f43fa8-42ba-4cb9-98c7-9386d4c939bb';

describe('number-input', () => {
  beforeEach(() => {
    cy.getComponent('number-input', NUMBER_INPUT_ID);
    cy.get('@number-input').find('input').as('input');
    cy.get('@number-input').find('.step-button').as('step-buttons');
  });

  it('toggles step buttons disabled state when the input is disabled/enabled', () => {
    cy.get('@step-buttons').should('not.have.class', 'disabled');

    cy.get('@input').invoke('attr', 'disabled', '');

    cy.get('@step-buttons').should('have.class', 'disabled');

    cy.get('@input').invoke('removeAttr', 'disabled');

    cy.get('@step-buttons').should('not.have.class', 'disabled');
  });

  it('disables step buttons when min/max range is invalid', () => {
    cy.get('@step-buttons').should('not.have.class', 'disabled');

    cy.get('@input').invoke('attr', 'min', '10').invoke('attr', 'max', '-10');

    cy.get('@step-buttons').should('have.class', 'disabled');
  });

  describe('increment', () => {
    const val = 0;
    const max = 5;

    beforeEach(() => {
      cy.get('@input').invoke('attr', 'max', String(max)).clear().type(String(val));
      cy.get('@step-buttons').filter(':has(> [name="plus"])').as('plus-button');
    });

    it('should increment the value by the step attribute when clicking "plus"', () => {
      const step = 2;
      cy.get('@input').invoke('attr', 'step', String(step));

      cy.get('@plus-button').click();

      cy.get('@input')
        .invoke('val')
        .should('eq', String(val + step));
    });

    it('disables the plus button after incrementing up to the max', () => {
      cy.get('@plus-button').should('not.have.class', 'disabled');

      for (let expected = val + 1; expected <= max; expected++) {
        cy.get('@plus-button').click();
        cy.get('@input').invoke('val').should('eq', String(expected));
      }

      cy.get('@plus-button').should('have.class', 'disabled');
    });

    it('disables the plus button when value is increased to max via keyboard arrows', () => {
      cy.get('@plus-button').should('not.have.class', 'disabled');

      for (let expected = val + 1; expected <= max; expected++) {
        cy.get('@input').type('{uparrow}');
        cy.get('@input').invoke('val').should('eq', String(expected));
      }

      cy.get('@plus-button').should('have.class', 'disabled');
    });

    it('disables the plus button when value is typed at the max', () => {
      cy.get('@plus-button').should('not.have.class', 'disabled');

      cy.get('@input').clear().type(String(max));

      cy.get('@plus-button').should('have.class', 'disabled');
    });

    it('disables the plus button when value is at max (set via attribute)', () => {
      cy.get('@plus-button').should('not.have.class', 'disabled');

      cy.get('@input').invoke('attr', 'max', String(val));

      cy.get('@plus-button').should('have.class', 'disabled');
    });

    it('resets the value to the minimum when the input is below min', () => {
      const min = 0;
      const invalidValue = min - 5;

      cy.get('@input').invoke('attr', 'min', String(min)).clear().type(String(invalidValue));

      cy.get('@plus-button').click();

      cy.get('@input').invoke('val').should('eq', String(min));
    });

    it('changes the plus icon for a chevron', () => {
      const chevronIcon = 'chevronright';
      cy.get('@number-input').invoke('attr', 'increment-icon', chevronIcon);

      cy.get('@number-input')
        .find('.step-button:last-of-type > post-icon')
        .invoke('attr', 'name')
        .should('eq', chevronIcon);
    });
  });

  describe('decrement', () => {
    const val = 4;
    const min = 0;

    beforeEach(() => {
      cy.get('@input').invoke('attr', 'min', String(min)).clear().type(String(val));
      cy.get('@step-buttons').filter(':has(> [name="minus"])').as('minus-button');
    });

    it('should decrement the value by the step attribute when clicking "minus"', () => {
      const step = 2;
      cy.get('@input').invoke('attr', 'step', String(step));

      cy.get('@minus-button').click();

      cy.get('@input')
        .invoke('val')
        .should('eq', String(val - step));
    });

    it('disables the minus button after decrementing down to the min', () => {
      cy.get('@minus-button').should('not.have.class', 'disabled');

      for (let expected = val - 1; expected >= min; expected--) {
        cy.get('@minus-button').click();
        cy.get('@input').invoke('val').should('eq', String(expected));
      }

      cy.get('@minus-button').should('have.class', 'disabled');
    });

    it('disables the minus button when value is decreased to min via keyboard arrows', () => {
      cy.get('@minus-button').should('not.have.class', 'disabled');

      for (let expected = val - 1; expected >= min; expected--) {
        cy.get('@input').type('{downarrow}');
        cy.get('@input').invoke('val').should('eq', String(expected));
      }

      cy.get('@minus-button').should('have.class', 'disabled');
    });

    it('disables the minus button when value is typed at the min', () => {
      cy.get('@minus-button').should('not.have.class', 'disabled');

      cy.get('@input').clear().type(String(min));

      cy.get('@minus-button').should('have.class', 'disabled');
    });

    it('disables the minus button when value is at min (set via attribute)', () => {
      cy.get('@minus-button').should('not.have.class', 'disabled');

      cy.get('@input').invoke('attr', 'min', String(val));

      cy.get('@minus-button').should('have.class', 'disabled');
    });

    it('resets the value to the maximum when the input is below max', () => {
      const max = 10;
      const invalidValue = max + 5;

      cy.get('@input').invoke('attr', 'max', String(max)).clear().type(String(invalidValue));

      cy.get('@minus-button').click();

      cy.get('@input').invoke('val').should('eq', String(max));
    });

    it('changes the minus icon for a chevron', () => {
      const chevronIcon = 'chevronleft';
      cy.get('@number-input').invoke('attr', 'decrement-icon', chevronIcon);

      cy.get('@number-input')
        .find('.step-button:first-of-type > post-icon')
        .invoke('attr', 'name')
        .should('eq', chevronIcon);
    });
  });
});
