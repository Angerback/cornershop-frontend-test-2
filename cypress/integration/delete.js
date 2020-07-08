describe('Delete Counter', () => {
  it('should delete counter', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/counter',
      response: { id: 'adsgc', title: 'Counter to delete', count: 0 },
      status: 200,
    })
    cy.visit('/main')

    cy.getTestElement('Toolbar_addCounterButton').click()

    cy.contains('Create counter').should('exist')
    cy.get('#counterNameInput').type('Counter to delete')
    cy.get('#saveNewCounterButton').click()
    cy.get('.ReactModal__Content').should('not.exist')

    cy.getTestElement('Counters__counter-element').last().contains('Counter to delete').should('exist')

    cy.getTestElement('Counters__counter-element').last().click()
    cy.getTestElement('Toolbar__delete-button').click()
    cy.contains('Delete the "Counter to delete" counter?').should('exist')
    cy.getTestElement('Alert__secondary-button').click()

    cy.getTestElement('Counters__counter-element').last().contains('Counter to delete').should('not.exist')
  })

  it('should fail to delete counter', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/counter',
      response: { id: 'adsgc', title: 'Counter to delete', count: 0 },
      status: 200,
    })
    cy.server()
    cy.route({
      method: 'DELETE',
      url: 'http://localhost:3001/api/v1/counter',
      response: {},
      status: 500,
    })

    cy.visit('/main')

    cy.getTestElement('Toolbar_addCounterButton').click()

    cy.contains('Create counter').should('exist')
    cy.get('#counterNameInput').type('Counter to delete')
    cy.get('#saveNewCounterButton').click()
    cy.get('.ReactModal__Content').should('not.exist')

    cy.getTestElement('Counters__counter-element').last().contains('Counter to delete').should('exist')

    cy.getTestElement('Counters__counter-element').last().click()
    cy.getTestElement('Toolbar__delete-button').click()
    cy.get('.alertModal').should('exist')

    cy.contains('Delete the "Counter to delete" counter?').should('exist')
    cy.getTestElement('Alert__secondary-button').click()

    cy.contains('Couldn\'t delete "Counter to delete"').should('exist')
    cy.getTestElement('Alert__primary-button').click()

    cy.contains('Couldn\'t delete "Counter to delete"').should('exist')
    cy.getTestElement('Alert__secondary-button').click()

    cy.get('.alertModal').should('not.exist')

    cy.getTestElement('Counters__counter-element').last().contains('Counter to delete').should('exist')
  })
})
