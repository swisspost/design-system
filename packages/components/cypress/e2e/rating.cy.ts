const RATING_ID = '956e063b-b40c-4fe4-bc27-53b8c4ab1e81';

describe('rating', () => {
  beforeEach(() => {
    cy.getComponent('rating', RATING_ID);
    cy.get('@rating').get('div.rating').as('rating-container');
    cy.get('@rating-container').get('.star-container').as('stars');
  });

  describe('default', () => {
    it('should render', () => {
      cy.get('@rating').should('exist');
    });

    it('should display 5 empty stars', () => {
      cy.get('@stars').then($stars => {
        expect($stars.length).to.equal(5);

        $stars.each((_index, star) => {
          const classes = Cypress.$(star).attr('class').split(' ');
          expect(classes).to.have.length(1);
          expect(classes[0]).to.equal('star-container');
        });
      });
    });

    // Unfortunately the test for the hovered state does not always work.
    //
    // it('should change appearance on hover', () => {
    //   cy.get('@stars')
    //     .its('length')
    //     .then(length => {
    //       cy.get('@stars').each(($star, i) => {
    //         cy.wrap($star).trigger('mouseenter');
    //         cy.get('@stars')
    //           .filter(`:lt(${i + 1})`)
    //           .should('have.class', 'hovered-star');
    //         if (i < length - 1)
    //           cy.get('@stars').filter(`:gt(${i})`).should('not.have.class', 'hovered-star');
    //       });
    //     });
    // });

    it('should set correct rating by clicking on a star', () => {
      cy.get('@stars').should('not.have.class', 'active-star');

      cy.get('@stars')
        .its('length')
        .then(length => {
          cy.get('@stars').each(($star, i) => {
            cy.wrap($star).click();
            cy.get('@stars')
              .filter(`:lt(${i + 1})`)
              .should('have.class', 'active-star');
            if (i < length - 1)
              cy.get('@stars').filter(`:gt(${i})`).should('not.have.class', 'active-star');
          });
        });
    });

    it('should navigate using keyboard arrows', () => {
      cy.get('@rating')
        .find('.rating')
        .focus()
        .type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}', {
          force: true,
        });
      cy.get('@stars').each(($star, index) => {
        if (index < 4) {
          cy.wrap($star).should('have.class', 'active-star');
        } else {
          cy.wrap($star).should('not.have.class', 'active-star');
        }
      });
    });
  });

  describe('attributes', () => {
    it('should check if stars reflect current-rating attribute correctly', () => {
      const setRatingAndVerifyStars = rating => {
        cy.get('@rating').invoke('attr', 'current-rating', `${rating}`);
        cy.get('@stars').each(($star, index) => {
          if (index < rating) {
            cy.wrap($star).should('have.class', 'active-star');
          } else {
            cy.wrap($star).should('not.have.class', 'active-star');
          }
        });
      };

      for (let rating = 1; rating <= 10; rating++) {
        setRatingAndVerifyStars(rating);
      }
    });

    it('should render the correct number of stars based on max attribute', () => {
      cy.get('@rating').invoke('attr', 'max', 7);
      cy.get('@stars').should('have.length', 7);
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
  });

  describe('disabled state', () => {
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
              cy.get('@stars').each(($innerStar, i) => {
                if (i <= index) {
                  cy.wrap($innerStar).should('not.have.class', 'active-star');
                }
              });
            }
          });
      });
    });

    it('should maintain default active stars in disabled state', () => {
      const defaultRating = 3;
      cy.get('@rating').invoke('attr', 'current-rating', defaultRating);
      cy.get('@rating').invoke('attr', 'disabled', true);

      const verifyActiveState = ($star, shouldBeActive) => {
        if (shouldBeActive) {
          cy.wrap($star).should('have.class', 'active-disabled');
          cy.wrap($star).should('not.have.class', 'active-star');
        } else {
          cy.wrap($star).should('have.class', 'default-disabled');
          cy.wrap($star).should('not.have.class', 'active-disabled');
        }
      };

      cy.get('@stars').each(($star, index) => {
        const isActive = index < defaultRating;
        verifyActiveState($star, isActive);

        cy.wrap($star)
          .click()
          .then(() => {
            verifyActiveState($star, isActive);
          });
      });
    });
  });

  describe('readonly state', () => {
    it('should disable interaction when readonly', () => {
      cy.get('@rating').invoke('attr', 'readonly', true);
      cy.get('@stars').each(($star, index) => {
        const classes = Cypress.$($star).attr('class').split(' ');
        expect(classes).to.have.length(1);
        expect(classes[0]).to.equal('star-container');

        cy.wrap($star)
          .click()
          .then(() => {
            if (index === 0) {
              cy.wrap($star).should('not.have.class', 'active-star');
            } else {
              cy.get('@stars').each(($innerStar, i) => {
                if (i <= index) {
                  cy.wrap($innerStar).should('not.have.class', 'active-star');
                }
              });
            }
          });
      });
    });

    it('should maintain default active stars in readonly state', () => {
      const defaultRating = 3;
      cy.get('@rating').invoke('attr', 'current-rating', defaultRating);
      cy.get('@rating').invoke('attr', 'readonly', true);

      const verifyActiveState = ($star, shouldBeActive) => {
        if (shouldBeActive) {
          cy.wrap($star).should('have.class', 'active-star');
        } else {
          cy.wrap($star).should('not.have.class', 'active-star');
        }
      };

      cy.get('@stars').each(($star, index) => {
        const isActive = index < defaultRating;
        verifyActiveState($star, isActive);

        cy.wrap($star)
          .click()
          .then(() => {
            verifyActiveState($star, isActive);
          });
      });
    });
  });

  describe('events', () => {
    it('should emit input event when rating changes', () => {
      cy.get('@rating').then($rating => {
        const listener = cy.stub();
        $rating[0].addEventListener('input', listener);

        const newRating = 5;
        cy.get('@stars')
          .eq(newRating - 1)
          .click()
          .then(() => {
            cy.wrap(listener).should('be.calledWithMatch', { detail: newRating });
          });
      });
    });
    it('should emit ratingChange event when rating is commited', () => {
      cy.get('@rating').then($rating => {
        const listener = cy.stub();
        $rating[0].addEventListener('ratingChange', listener);

        const newRating = 5;
        cy.get('@stars')
          .eq(newRating - 1)
          .click()
          .then(() => {
            cy.get('@rating-container').focus().type('{enter}', {
              force: true,
            });
            cy.wrap(listener).should('be.calledWithMatch', { detail: newRating });
          });
      });
    });
  });
});
