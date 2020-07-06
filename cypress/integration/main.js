describe('Welcome Page Test', () => {
  it('should create counter', () => {
    cy.visit('/main')
    cy.contains('Default counter').should('exist')
    cy.getTestElement('Toolbar_addCounterButton').click()

    cy.contains('Create counter').should('exist')
    cy.get('#counterNameInput').type('New counter name')
    cy.get('#saveNewCounterButton').click()
    cy.get('.ReactModal__Content').should('not.exist')

    cy.getTestElement('Counters__counter-element').last().contains('New counter name').should('exist')
  })

  it('should toggle counter', () => {
    cy.visit('/main')
    cy.contains('Default counter').should('exist')

    Cypress._.times(10, () => {
      cy.getTestElement('Counters__counter-increase')
        .last()
        .click()
    })
    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('10')
      .should('exist')

    Cypress._.times(5, () => {
      cy.getTestElement('Counters__counter-decrease')
        .last()
        .click()
    })
    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('5')
      .should('exist')
  })

  it('should delete counter', () => {
    cy.visit('/main')
    cy.contains('Default counter').should('exist')

    Cypress._.times(10, () => {
      cy.getTestElement('Counters__counter-increase')
        .last()
        .click()
    })
    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('10')
      .should('exist')

    Cypress._.times(5, () => {
      cy.getTestElement('Counters__counter-decrease')
        .last()
        .click()
    })
    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('5')
      .should('exist')
  })
})
