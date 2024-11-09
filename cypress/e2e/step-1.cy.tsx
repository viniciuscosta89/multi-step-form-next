context('Multi-step form', () => {
	beforeEach(() => {
		cy.visit('/')			
	})

	context('GIVEN on Step 1 page', () => {		
		it('SHOULD display the Personal Info page', () => {
			cy.getByDataCy('personal-info-title').should('exist')
			cy.getByDataCy('form').should('exist')
		})

		it('SHOULD display the sidebar with the current step highlighted', () => {
			cy.getByDataCy('step-1').find('span.w-8.h-8.flex').should('have.class', 'bg-pastelBlue text-primary border-pastelBlue')
		})

		describe('WHEN the user fills the form', () => {
			beforeEach(() => {
				cy.fillStepOneFields();
			})

			it('SHOULD redirect to the Step 2 page', () => {
				cy.url().should('include', '/step-2')
				cy.getByDataCy('select-plan-title').should('exist')
			})
		})

		describe('WHEN the user NOT fill all the required fields', () => {
			beforeEach(() => {
				cy.getByDataCy('name').type('John Doe');
				cy.getByDataCy('email').type('email@email.com');
			})

			it('SHOULD display an error message', () => {
				cy.getByDataCy('step-1-submit').click();
				cy.getByDataCy('phone-error').should('exist')
			})
		})
	})
})