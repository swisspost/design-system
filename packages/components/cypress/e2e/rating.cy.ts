const RATING_ID = '956e063b-b40c-4fe4-bc27-53b8c4ab1e81';

describe('Rating', () => {
  beforeEach(() => {
    cy.getComponent('rating', RATING_ID);
    cy.get('@rating').get('.rating').as('wrapper');
    cy.get('@wrapper').get('.star').as('stars');
  });

  describe('Structure & Props', () => {
    it('should render', () => {
      cy.get('@rating').should('exist');
      cy.get('@wrapper').should('exist');
      cy.get('@stars').should('exist');
    });

    it('should set stars length according to the "stars" prop', () => {
      cy.get('@rating').should('not.have.attr', 'stars');
      cy.get('@stars')
        .its('length')
        .then(length => {
          expect(length).to.equal(5);
        });

      cy.wrap([3, 4, 5, 6, 7, 8, 9, 10]).each((amount: number) => {
        cy.get('@rating')
          .invoke('attr', 'stars', amount)
          .wait(500)
          .find('.star')
          .should('not.have.class', 'active')
          .its('length')
          .then(length => {
            expect(length).to.equal(amount);
          });
      });
    });

    it('should set current rating according to the "current-rating" prop', () => {
      cy.get('@rating').should('not.have.attr', 'current-rating');
      cy.get('@stars').should('not.have.class', 'active');

      cy.wrap([0, 1, 2, 3, 4, 5]).each((currentRating: number) => {
        cy.get('@rating')
          .invoke('attr', 'current-rating', currentRating)
          .wait(100)
          .find('.star')
          .then($stars => {
            expect($stars.filter('.active').length).to.equal(currentRating);
          });
      });
    });

    it('should set readonly state according to the "readonly" prop', () => {
      cy.get('@rating').should('not.have.attr', 'readonly');
      cy.get('@wrapper').should('have.attr', 'aria-readonly', 'false');

      cy.get('@rating').invoke('attr', 'readonly', true);
      cy.get('@wrapper').should('have.attr', 'aria-readonly', 'true');
    });
  });

  describe('Events', () => {
    it('should set rating by clicking on a star', () => {
      cy.get('@stars')
        .should('not.have.class', 'active')
        .each(($star, index) => {
          const activeCount = index + 1;

          cy.wrap($star).click();

          if (activeCount > 0) {
            cy.get('@stars')
              .filter(`:lt(${activeCount})`)
              .each($star => {
                cy.wrap($star).should('have.class', 'active');
              });
          }

          if (activeCount < 5) {
            cy.get('@stars')
              .filter(`:eq(${activeCount}), :gt(${activeCount})`)
              .each($star => {
                cy.wrap($star).should('not.have.class', 'active');
              });
          }
        });
    });

    it('should reset a rating by clicking on the same star twice', () => {
      cy.get('@stars').eq(2).click();
      cy.get('@stars')
        .filter(':lt(3)')
        .each($star => {
          cy.wrap($star).should('have.class', 'active');
        });
      cy.get('@stars')
        .filter(':gt(2)')
        .each($star => {
          cy.wrap($star).should('not.have.class', 'active');
        });

      cy.get('@stars').eq(2).click();
      cy.get('@stars').each($star => {
        cy.wrap($star).should('not.have.class', 'active');
      });
    });

    it('should not be actionable if "readonly" prop is set to "true"', () => {
      cy.get('@stars').eq(2).click();
      cy.get('@stars').then($stars => {
        expect($stars.filter('.active').length).to.equal(3);
      });

      cy.get('@stars').eq(2).click();

      cy.get('@rating').invoke('attr', 'readonly', true);
      cy.get('@stars').eq(2).click();
      cy.get('@stars').then($stars => {
        expect($stars.filter('.active').length).to.equal(0);
      });
    });

    it('should set rating by selecting a star by keyboard', () => {
      function setRatingByKeyboard(type: string, count: number, rating: number) {
        const typeCommand = Array.from({ length: count })
          .map(() => type)
          .join('');

        cy.get('@wrapper').focus().type(typeCommand, {
          force: true,
        });

        if (rating > 0) {
          cy.get('@stars')
            .filter(`:lt(${rating})`)
            .each($star => {
              cy.wrap($star).should('have.class', 'active');
            });
        }

        if (rating < 5) {
          cy.get('@stars')
            .filter(`:eq(${rating}), :gt(${rating})`)
            .each($star => {
              cy.wrap($star).should('not.have.class', 'active');
            });
        }
      }

      setRatingByKeyboard('{rightarrow}', 4, 4);
      setRatingByKeyboard('{leftarrow}', 2, 2);
      setRatingByKeyboard('{uparrow}', 3, 5);
      setRatingByKeyboard('{downarrow}', 5, 0);
    });

    it('should emit "input" and "change" events, when rating changed by mouse', () => {
      cy.get('@rating').then($rating => {
        const inputListener = cy.stub();
        const changeListener = cy.stub();

        $rating[0].addEventListener('input', inputListener);
        $rating[0].addEventListener('input', changeListener);

        cy.get('@stars').each(($star, index) => {
          const value = index + 1;
          cy.wrap($star).click();
          cy.wrap(inputListener).should('be.calledWithMatch', { detail: { value } });
          cy.wrap(changeListener).should('be.calledWithMatch', { detail: { value } });
        });
      });
    });

    it('should emit "input" and "change" events, when rating changed by keyboard', () => {
      cy.get('@rating').then($rating => {
        const inputListener = cy.stub();
        const changeListener = cy.stub();

        $rating[0].addEventListener('input', inputListener);
        $rating[0].addEventListener('change', changeListener);

        cy.wrap([1, 2, 3, 4, 5]).each((value: number) => {
          cy.get('@wrapper').focus().type('{rightarrow}', { force: true });
          cy.wrap(inputListener).should('be.calledWithMatch', { detail: { value } });
          cy.get('@wrapper').blur({ force: true });
          cy.wrap(changeListener).should('be.calledWithMatch', { detail: { value } });
        });

        cy.wrap([4, 3, 2, 1, 0]).each((value: number) => {
          cy.get('@wrapper').focus().type('{leftarrow}', { force: true });
          cy.wrap(inputListener).should('be.calledWithMatch', { detail: { value } });
          cy.get('@wrapper').blur({ force: true });
          cy.wrap(changeListener).should('be.calledWithMatch', { detail: { value } });
        });
      });
    });
  });
  //   it('should emit input and event when rating changes', () => {
  //     cy.get('@rating').then($rating => {
  //       const listener = cy.stub();
  //       $rating[0].addEventListener('input', listener);

  //       const newRating = 5;
  //       cy.get('@stars')
  //         .eq(newRating - 1)
  //         .click()
  //         .then(() => {
  //           cy.wrap(listener).should('be.calledWithMatch', { detail: newRating });
  //         });
  //     });
  //   });

  //   it('should emit ratingChange event when rating is commited', () => {
  //     cy.get('@rating').then($rating => {
  //       const listener = cy.stub();
  //       $rating[0].addEventListener('change', listener);

  //       const newRating = 5;
  //       cy.get('@stars')
  //         .eq(newRating - 1)
  //         .click()
  //         .then(() => {
  //           cy.get('@rating-container').focus().type('{enter}', {
  //             force: true,
  //           });
  //           cy.wrap(listener).should('be.calledWithMatch', { detail: newRating });
  //         });
  //     });
  //   });
  // });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('rating');
    cy.checkA11y('#root-inner');
  });
});
