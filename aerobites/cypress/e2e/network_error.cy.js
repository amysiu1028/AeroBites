describe('Network Errors', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080', {
      statusCode: 500,  
    }).as('HomeErrorpage')
    cy.visit('http://localhost:3000/')
  })

  it('should show server is down if data', () => {
    cy.wait('@HomeErrorpage')
    cy.get('.error-message').contains('Something happened with getting the airports')
  })

  it('should test for 404 network error', () => {
    cy.intercept('GET', 'http://localhost:8080', {
      statusCode: 404,  
    }).as('NotFoundPage')
    cy.visit('http://localhost:3000/1/*')
    cy.wait('@NotFoundPage')
    cy.get('.not-found').contains('404 Page Not Found')
    cy.get('.not-found').contains('The page you are looking for does not exist.')
  })
})