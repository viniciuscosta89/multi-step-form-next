context('Multi-step form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('GIVEN on Step 3 page', () => {
    beforeEach(() => {
      cy.fillStepOneFields()
      cy.fillStepTwoFields()
      
    })

    it('SHOULD display the Select you plan page', () => {
      cy.getByDataCy('pick-addons-title').should('exist')
      cy.getByDataCy('form').should('exist')
    })

    it('SHOULD display the sidebar with the current step highlighted', () => {
      cy.getByDataCy('step-3')
        .find('span.w-8.h-8.flex')
        .should('have.class', 'bg-pastelBlue text-primary border-pastelBlue')
    })

    describe('WHEN the user click to go back', () => {
      beforeEach(() => {
        cy.getByDataCy('step-3-back').click()
      })

      it('SHOULD redirect to the Step 2 page', () => {
        cy.url().should('include', '/step-2')
        cy.getByDataCy('select-plan-title').should('exist')
      })
    })

    describe('WHEN the user DOESN\'T select any addon and submit', () => {
      beforeEach(() => {
        cy.getByDataCy('step-3-submit').click();
      })

      it('SHOULD redirect to the Step 3 page', () => {				
        cy.url().should('include', '/step-4')
        cy.getByDataCy('finishing-up-title').should('exist')
      })
    })

    describe('WHEN the user selects TWO add-ons', () => {
      beforeEach(() => {
        cy.getByDataCy('addon-ONLINE_SERVICE').click();
	      cy.getByDataCy('addon-CUSTOMIZABLE_PROFILE').click();
      })

      it('SHOULD have TWO ADD-ONS selected', () => {
        cy.getByDataCy('addon-ONLINE_SERVICE').should('have.attr', 'data-state', 'checked');
        cy.getByDataCy('addon-CUSTOMIZABLE_PROFILE').should('have.attr', 'data-state', 'checked');
        cy.getByDataCy('addon-LARGER_STORAGE').should('have.attr', 'data-state', 'unchecked');
      })      

      it('SHOULD redirect to the Step 3 page when submit', () => {
				cy.getByDataCy('step-3-submit').click();
        cy.url().should('include', '/step-4')
        cy.getByDataCy('finishing-up-title').should('exist')
      })
    })
  })
})
