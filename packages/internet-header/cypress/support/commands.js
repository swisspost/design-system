// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Checks if an element is in the viewport
 * https://github.com/cypress-io/cypress/issues/877#issuecomment-657583222
 */
const isInViewport = (_chai) => {
	function assertIsInViewport() {
		const subject = this._obj

		const windowHeight = Cypress.$(cy.state('window')).height()
		const bottomOfCurrentViewport = windowHeight
		const rect = subject[0].getBoundingClientRect()

		this.assert(
			(rect.top > 0 && rect.top < bottomOfCurrentViewport) ||
				(rect.bottom > 0 && rect.bottom < bottomOfCurrentViewport),
			'expected #{this} to be in viewport',
			'expected #{this} to not be in viewport',
			subject,
		)
	}

	_chai.Assertion.addMethod('inViewport', assertIsInViewport)
}

chai.use(isInViewport)
