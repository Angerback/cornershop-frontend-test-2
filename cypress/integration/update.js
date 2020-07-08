describe('Counters update', () => {
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

    Cypress._.times(5, () => {
      cy.getTestElement('Counters__counter-decrease')
        .last()
        .click()
    })
    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('0')
      .should('exist')
  })

  it('should fail to toggle counter', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/counter',
      response: [{ id: 'adsgc', title: 'Default counter', count: 1 }],
      status: 200,
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/inc',
      response: {},
      status: 500,
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/dec',
      response: {},
      status: 500,
    })
    cy.visit('/main')
    cy.contains('Default counter').should('exist')
    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('1')
      .should('exist')

    cy.getTestElement('Counters__counter-increase')
      .last()
      .click()

    cy.get('.alertModal').should('exist')
    cy.contains('Couldn\'t update "Default counter" to 2')

    cy.getTestElement('Alert__primary-button').click()

    cy.get('.alertModal').should('exist')
    cy.contains('Couldn\'t update "Default counter" to 2').should('exist')

    cy.getTestElement('Alert__secondary-button').click()

    cy.get('.alertModal').should('not.exist')
    cy.contains('Couldn\'t update "Default counter" to 2').should('not.exist')

    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('1')
      .should('exist')

    cy.getTestElement('Counters__counter-decrease')
      .last()
      .click()

    cy.get('.alertModal').should('exist')
    cy.contains('Couldn\'t update "Default counter" to 0')

    cy.getTestElement('Alert__primary-button').click()

    cy.get('.alertModal').should('exist')
    cy.contains('Couldn\'t update "Default counter" to 0').should('exist')

    cy.getTestElement('Alert__secondary-button').click()

    cy.get('.alertModal').should('not.exist')
    cy.contains('Couldn\'t update "Default counter" to 0').should('not.exist')

    cy.getTestElement('Counters__counter-value')
      .last()
      .contains('1')
      .should('exist')
  })
})
