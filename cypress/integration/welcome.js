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

  it('should show no counters message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/counter',
      response: [],
      status: 200,
    })
    cy.visit('/welcome')
    cy.get('button').click()
    cy.url().should('include', '/main')
    cy.contains('Default counter').should('not.exist')
    cy.contains('No counters yet').should('exist')
    cy.contains('“When I started counting my blessings, my whole life turned around.” —Willie Nelson').should('exist')
  })

  it('should show error message when no connection available', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/counter',
      response: {},
      status: 500,
    })
    cy.visit('/welcome')
    cy.get('button').click()
    cy.url().should('include', '/main')
    cy.contains('Default counter').should('not.exist')
    cy.contains('Couldn\'t load the counters').should('exist')
    cy.contains('The Internet connection appears to be offline.').should('exist')

    cy.getTestElement('Counters__retry-button').click()

    cy.contains('After error counter').should('not.exist')
    cy.contains('Couldn\'t load the counters').should('exist')
    cy.contains('The Internet connection appears to be offline.').should('exist')

    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/counter',
      response: [{ id: 'adsfd', title: 'After error counter', count: 50 }],
      status: 200,
    })

    cy.getTestElement('Counters__retry-button').click()

    cy.contains('After error counter').should('exist')
    cy.contains('Couldn\'t load the counters').should('not.exist')
    cy.contains('The Internet connection appears to be offline.').should('not.exist')
  })
})
