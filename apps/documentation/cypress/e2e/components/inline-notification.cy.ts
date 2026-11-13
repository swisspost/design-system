describe('Inline Notification', () => {
  describe('Arguments table', () => {
    [
      { width: 1440, fontSize: '16px' },
      { width: 800, fontSize: '16px' },
      { width: 390, fontSize: '14px' },
    ].forEach(({ width, fontSize }) => {
      it(`uses compact sizing at ${width}px`, () => {
        cy.viewport(width, 900);
        cy.visit('/iframe.html?id=eb78afcb-ce92-4990-94b6-6536d5ec6af4--docs&viewMode=docs');

        cy.get('.docblock-argstable-body .inline-notification', { timeout: 30000 })
          .first()
          .should($notification => {
            const notification = $notification[0];
            const paragraph = notification.querySelector('p')!;
            const link = notification.querySelector('a')!;
            const notificationRect = notification.getBoundingClientRect();
            const paragraphRect = paragraph.getBoundingClientRect();
            const paragraphStyle = getComputedStyle(paragraph);
            const iconStyle = getComputedStyle(notification, '::before');
            const iconCenter =
              notificationRect.top + parseFloat(iconStyle.top) + parseFloat(iconStyle.height) / 2;
            const textCenter = paragraphRect.top + parseFloat(paragraphStyle.lineHeight) / 2;

            expect(paragraphStyle.fontSize).to.equal(fontSize);
            expect(getComputedStyle(link).fontSize).to.equal(fontSize);
            expect(iconStyle.width).to.equal('24px');
            expect(iconCenter).to.be.closeTo(textCenter, 2);
          });
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--inline-notification');
      cy.get('.inline-notification', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner', undefined, violations => {
        expect(violations).to.have.length(0);
      });
    });

    it('renders all variants with and without title', () => {
      cy.get('.inline-notification').should('have.length.at.least', 1);
      cy.percySnapshot('Inline Notification - All Variants');
    });
  });
});
