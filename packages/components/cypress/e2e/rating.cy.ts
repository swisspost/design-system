describe('rating', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('post-rating');
      cy.get('@rating').get('div.rating').as('rating-container');
      cy.get('@rating-container').get('svg').as('stars');
    });

    it('should render', () => {
      cy.get('@rating').should('exist');
    });

    it('should display 10 empty stars', () => {
      cy.get('@stars').then($stars => {
        expect($stars.length).to.equal(10);

        $stars.each((_index, star) => {
          const classes = Cypress.$(star).attr('class').split(' ');
          expect(classes).to.have.length(1);
          expect(classes[0]).to.equal('star');
        });
      });
    });

    it('should set correct rating by clicking on a star', () => {
      for (let i = 0; i < 10; i++) {
        cy.get('@stars').eq(i).click();
        cy.get('@stars').each(($star, index) => {
          if (index <= i) {
            cy.wrap($star).should('have.class', 'active-star');
          } else {
            cy.wrap($star).should('not.have.class', 'active-star');
          }
        });
      }
    });

    // The hover test does not yet work, need to find a way to make assertions while hovering

    // it('should change appearance on hover', () => {
    //   cy.get('@stars').eq(3).trigger('mouseover');
    //   cy.get('@stars').each(($star, index) => {
    //     if (index <= 3) {
    //       cy.wrap($star).should('have.class', 'hovered-star');
    //     } else {
    //       cy.wrap($star).should('not.have.class', 'hovered-star');
    //     }
    //   });
    // });

    it('should check if stars reflect current-rating attribute correctly', () => {
      for (let rating = 1; rating <= 10; rating++) {
        cy.get('@rating').invoke('attr', 'current-rating', `${rating}`);

        cy.get('@stars').each(($star, index) => {
          if (index < rating) {
            cy.wrap($star).should('have.class', 'active-star');
          } else {
            cy.wrap($star).should('not.have.class', 'active-star');
          }
        });
      }
    });

    it('should render the correct number of stars based on max attribute', () => {
      cy.get('@rating').invoke('attr', 'max', 7);
      cy.get('@stars').should('have.length', 7);
    });

    // The keyboard test does not yet work because of the focus

    // it('should navigate using keyboard arrows and confirm selection with Enter', () => {
    //   cy.get('@rating-container')
    //     .focus()
    //     .type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}{enter}');
    //   cy.get('@stars').each(($star, index) => {
    //     if (index < 4) {
    //       cy.wrap($star).should('have.class', 'active-star');
    //     } else {
    //       cy.wrap($star).should('not.have.class', 'active-star');
    //     }
    //   });
    // });

    it('should disable interaction when disabled', () => {
      cy.get('@rating').invoke('attr', 'disabled', true);
      cy.get('@stars').each(($star, index) => {
        cy.wrap($star).should('have.class', 'default-disabled');

        cy.wrap($star)
          .click()
          .then(() => {
            if (index === 0) {
              cy.wrap($star).should('not.have.class', 'active-star');
            } else {
              for (let i = 0; i <= index; i++) {
                cy.get('@stars').eq(i).should('not.have.class', 'active-star');
              }
            }
          });
      });
    });

    it('should maintain default active stars in disabled state', () => {
      const defaultRating = 3;
      cy.get('@rating').invoke('attr', 'current-rating', defaultRating);

      cy.get('@rating').invoke('attr', 'disabled', true);

      cy.get('@stars').each(($star, index) => {
        if (index < defaultRating) {
          cy.wrap($star).should('have.class', 'active-disabled');
        } else {
          cy.wrap($star).should('have.class', 'default-disabled');
          cy.wrap($star).should('not.have.class', 'active-disabled');
        }

        cy.wrap($star)
          .click()
          .then(() => {
            if (index < defaultRating) {
              cy.wrap($star).should('have.class', 'active-disabled');
              cy.wrap($star).should('not.have.class', 'active-star');
            } else {
              cy.wrap($star).should('have.class', 'default-disabled');
              cy.wrap($star).should('not.have.class', 'active-disabled');
            }
          });
      });
    });

    it('should disable interaction when readonly', () => {
      cy.get('@rating').invoke('attr', 'readonly', true);
      cy.get('@stars').each(($star, index) => {
        const classes = Cypress.$($star).attr('class').split(' ');
        expect(classes).to.have.length(1);
        expect(classes[0]).to.equal('star');

        cy.wrap($star)
          .click()
          .then(() => {
            if (index === 0) {
              cy.wrap($star).should('not.have.class', 'active-star');
            } else {
              for (let i = 0; i <= index; i++) {
                cy.get('@stars').eq(i).should('not.have.class', 'active-star');
              }
            }
          });
      });
    });

    it('should maintain default active stars in readonly state', () => {
      const defaultRating = 3;
      cy.get('@rating').invoke('attr', 'current-rating', defaultRating);

      cy.get('@rating').invoke('attr', 'readonly', true);

      cy.get('@stars').each(($star, index) => {
        if (index < defaultRating) {
          cy.wrap($star).should('have.class', 'active-star');
        } else {
          cy.wrap($star).should('not.have.class', 'active-star');
        }

        cy.wrap($star)
          .click()
          .then(() => {
            if (index < defaultRating) {
              cy.wrap($star).should('have.class', 'active-star');
            } else {
              cy.wrap($star).should('not.have.class', 'active-star');
            }
          });
      });
    });

    it('should have correct ARIA attributes', () => {
      const defaultRating = 3;
      const max = 8;

      cy.get('@rating').invoke('attr', 'current-rating', defaultRating);

      cy.get('@rating').invoke('attr', 'disabled', true);

      cy.get('@rating').invoke('attr', 'max', max);

      // Check ARIA attributes
      cy.get('@rating-container').should('have.attr', 'role', 'slider');
      cy.get('@rating-container').should('have.attr', 'aria-valuemin', '0');
      cy.get('@rating-container').should('have.attr', 'aria-valuemax', `${max}`);
      cy.get('@rating-container').should('have.attr', 'aria-valuenow', `${defaultRating}`);
      cy.get('@rating-container').should(
        'have.attr',
        'aria-valuetext',
        `${defaultRating} out of ${max}`,
      );
      cy.get('@rating-container').should('have.attr', 'aria-readonly', 'false');
      cy.get('@rating-container').should('have.attr', 'aria-disabled', 'true');
    });

    it('should emit ratingChanged event when rating changes', () => {
      cy.get('@rating').then($rating => {
        const listener = cy.stub();
        $rating[0].addEventListener('ratingChanged', listener);

        const newRating = 5;
        cy.get('@stars')
          .eq(newRating - 1)
          .click()
          .then(() => {
            cy.wrap(listener).should('be.calledWithMatch', { detail: newRating });
          });
      });
    });
  });
});
