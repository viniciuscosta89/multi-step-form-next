context('Multi-step form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('GIVEN on Home page', () => {
    it('SHOULD fill up and pass through every step until the Thank you page', () => {
      cy.fillStepOneFields()
      cy.fillStepTwoFields()
      cy.fillStepThreeFields()
      cy.fillStepFourFields()

      cy.getByDataCy('thank-you-title').should('exist')
    })
  })
})
