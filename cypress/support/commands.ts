/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

declare global {
	// biome-ignore lint/style/noNamespace: <explanation>
	namespace Cypress {
		interface Chainable {
			getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>
			fillStepOneFields(): Chainable<void>
			fillStepTwoFields(): Chainable<void>
			fillStepThreeFields(): Chainable<void>
			fillStepFourFields(): Chainable<void>
		}
	}
}

Cypress.Commands.add('getByDataCy', (testId: string) => {
	return cy.get(`[data-cy="${testId}"]`)
})

Cypress.Commands.add('fillStepOneFields', () => {
	cy.getByDataCy('name').type('John Doe')
	cy.getByDataCy('email').type('email@email.com');
	cy.getByDataCy('phone').type('1234567890');

	cy.getByDataCy('step-1-submit').click();
})

Cypress.Commands.add('fillStepTwoFields', () => {
	cy.getByDataCy('plan-advanced').click();
	cy.getByDataCy('recurrency-switch').click();	

	cy.getByDataCy('step-2-submit').click();
})

Cypress.Commands.add('fillStepThreeFields', () => {
	cy.getByDataCy('addon-ONLINE_SERVICE').click();
	cy.getByDataCy('addon-CUSTOMIZABLE_PROFILE').click();
	

	cy.getByDataCy('step-3-submit').click();
})

Cypress.Commands.add('fillStepFourFields', () => {
	cy.getByDataCy('step-4-submit').click();
})

export {}