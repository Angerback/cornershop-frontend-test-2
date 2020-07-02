describe('Welcome Page', () => {
  it('should visit welcome page when entering base url', () => {
    cy.visit('http://localhost:3000/')
    cy.url().should('eq', 'http://localhost:3000/welcome')
    cy.contains('Welcome to Counters').should('exist')
  })

  it('should visit welcome page when entering welcome url', () => {
    cy.visit('http://localhost:3000/welcome')
    cy.contains('Welcome to Counters').should('exist')
  })

  it('should redirect to main page on get started button click', () => {
    cy.visit('http://localhost:3000/welcome')
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:3000/main')
    cy.contains('Default counter').should('exist')
    cy.getTestElement('Toolbar_addCounterButton').should('exist')
  })
})
