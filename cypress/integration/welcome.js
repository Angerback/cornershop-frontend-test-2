describe('Welcome Page', () => {
  it('should visit welcome page when entering base url', () => {
    cy.visit('/')
    cy.url().should('include', '/welcome')
    cy.contains('Welcome to Counters').should('exist')
  })

  it('should visit welcome page when entering welcome url', () => {
    cy.visit('/welcome')
    cy.contains('Welcome to Counters').should('exist')
  })

  it('should redirect to main page on get started button click', () => {
    cy.visit('/welcome')
    cy.get('button').click()
    cy.url().should('include', '/main')
    cy.contains('Default counter').should('exist')
    cy.getTestElement('Toolbar_addCounterButton').should('exist')
  })
})
