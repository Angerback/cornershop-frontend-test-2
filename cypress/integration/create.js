describe('Create Counter', () => {
  it('should create counter', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/counter',
      response: { id: 'adsgc', title: 'New counter name', count: 0 },
      status: 200,
    })
    cy.visit('/main')
    cy.contains('Default counter').should('exist')
    cy.getTestElement('Toolbar_addCounterButton').click()

    cy.contains('Create counter').should('exist')
    cy.get('#counterNameInput').type('New counter name')
    cy.get('#saveNewCounterButton').click()
    cy.get('.ReactModal__Content').should('not.exist')

    cy.getTestElement('Counters__counter-element').last().contains('New counter name').should('exist')
  })

  it('should fail to create counter', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/counter',
      response: { id: 'adsgc' },
      status: 500,
    })
    cy.visit('/main')
    cy.getTestElement('Toolbar_addCounterButton').click()

    cy.contains('Create counter').should('exist')
    cy.get('#counterNameInput').type('New counter name')
    cy.get('#saveNewCounterButton').click()
    cy.get('.alertModal').should('exist')
    cy.contains('Couldn\'t create counter')
    cy.getTestElement('Alert__primary-button').click()

    cy.getTestElement('Counters__counter-element').last().contains('New counter name').should('not.exist')
  })
})
