context('Multi-step form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('GIVEN on Step 4 page', () => {
    beforeEach(() => {
      cy.fillStepOneFields()
      cy.fillStepTwoFields()
      cy.fillStepThreeFields()
      
    })

    it('SHOULD display the Finishing up page', () => {
      cy.getByDataCy('finishing-up-title').should('exist')
      cy.getByDataCy('form').should('exist')
    })

    it('SHOULD display the sidebar with the current step highlighted', () => {
      cy.getByDataCy('step-4')
        .find('span.w-8.h-8.flex')
        .should('have.class', 'bg-pastelBlue text-primary border-pastelBlue')
    })

    describe('WHEN the user click to go back', () => {
      beforeEach(() => {
        cy.getByDataCy('step-4-back').click()
      })

      it('SHOULD redirect to the Step 3 page', () => {
        cy.url().should('include', '/step-3')
        cy.getByDataCy('pick-addons-title').should('exist')
      })
    })

    describe('WHEN the user clicks to Change the plan', () => {
      beforeEach(() => {
        cy.getByDataCy('change-plan').click();
      })

      it('SHOULD redirect to the Select you plan page', () => {				
        cy.url().should('include', '/step-2')
        cy.getByDataCy('select-plan-title').should('exist')
      })
    })

    describe('WHEN the user submit the form', () => {
      beforeEach(() => {
        cy.getByDataCy('step-4-submit').click();
      })

      it('SHOULD show the Thank you message', () => {
        cy.getByDataCy('thank-you-title').should('exist')
      }) 
    })
  })
})
