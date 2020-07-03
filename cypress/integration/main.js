describe('Welcome Page Test', () => {
  it('should navigate to main', () => {
    cy.visit('http://localhost:3000/main')
    cy.contains('Default counter').should('exist')
    cy.getTestElement('Toolbar_addCounterButton').click()

    cy.contains('Create counter').should('exist')
    cy.get('#counterNameInput').type('New counter name')
    cy.get('#saveNewCounterButton').click()
    cy.get('.ReactModal__Content').should('not.exist')

    cy.getTestElement('Counters__counter-element').last().contains('New counter name').should('exist')
  })
})
