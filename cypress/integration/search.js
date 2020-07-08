describe('Search feature test', () => {
  it('should filter the counter list', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/counter',
      response: [{ id: 'adfdsafsgc', title: 'Counter number one', count: 0 },
        { id: 'adswrsfgsgc', title: 'Counter number two', count: 0 },
        { id: 'qwreqwe', title: 'A very strange counter name', count: 0 },
      ],
      status: 200,
    })
    cy.visit('/main')
    cy.contains('Counter number one').should('exist')
    cy.contains('Counter number two').should('exist')
    cy.contains('A very strange counter name').should('exist')
    cy.getTestElement('Search__input').focus().should('exist')

    cy.getTestElement('Search__input').type('Counter number')

    cy.contains('Counter number one').should('exist')
    cy.contains('Counter number two').should('exist')
    cy.contains('A very strange counter name').should('not.exist')

    cy.getTestElement('Search__input').clear()
    cy.getTestElement('Search__input').type('A very str')

    cy.contains('Counter number one').should('not.exist')
    cy.contains('Counter number two').should('not.exist')
    cy.contains('A very strange counter name').should('exist')
  })
})
