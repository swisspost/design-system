// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@percy/cypress';
import 'cypress-storybook/cypress';
import './commands';
import 'cypress-axe';

// https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions
Cypress.on('uncaught:exception', err => {
  // From time to time (mostly random) the 'klp-login-widget' throws an uncaught 'TypeError: Cannot read properties of null (reading 'shadowRoot')' exception
  // Returning false here prevents Cypress from failing the test
  if (err.name.includes('TypeError')) {
    return false;
  }
});
