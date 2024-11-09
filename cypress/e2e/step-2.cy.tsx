context('Multi-step form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('GIVEN on Step 2 page', () => {
    beforeEach(() => {
      cy.fillStepOneFields()
      cy.wait(500)
    })

    it('SHOULD display the Select you plan page', () => {
      cy.getByDataCy('select-plan-title').should('exist')
      cy.getByDataCy('form').should('exist')
    })

    it('SHOULD display the sidebar with the current step highlighted', () => {
      cy.getByDataCy('step-2')
        .find('span.w-8.h-8.flex')
        .should('have.class', 'bg-pastelBlue text-primary border-pastelBlue')
    })

    describe('WHEN the user click to go back', () => {
      beforeEach(() => {
        cy.getByDataCy('step-2-back').click()
      })

      it('SHOULD redirect to the Step 1 page', () => {
        cy.url().should('include', '')
        cy.getByDataCy('personal-info-title').should('exist')
      })
    })

    describe('WHEN the user fills the form', () => {
      beforeEach(() => {
        cy.getByDataCy('plan-advanced').click()
        cy.getByDataCy('recurrency-switch').click()
      })

      it('SHOULD have the ADVANCED plan selected', () => {
        cy.getByDataCy('plan-advanced').should(
          'have.class',
          'border-purpleBlue bg-alabaster',
        )
      })

      it('SHOULD have the yearly recurrency selected', () => {
        cy.getByDataCy('recurrency-yearly').should(
          'not.have.class',
          'text-coolGray',
        )
      })

      it('SHOULD redirect to the Step 3 page', () => {
				cy.getByDataCy('step-2-submit').click();
        cy.url().should('include', '/step-3')
        cy.getByDataCy('pick-addons-title').should('exist')
      })
    })

    // describe('WHEN the user NOT fill all the required fields', () => {
    // 	beforeEach(() => {
    // 		cy.getByDataCy('name').type('John Doe');
    // 		cy.getByDataCy('email').type('email@email.com');
    // 	})

    // 	it('SHOULD display an error message', () => {
    // 		cy.getByDataCy('step-1-submit').click();
    // 		cy.getByDataCy('phone-error').should('exist')
    // 	})
    // })
  })
})
