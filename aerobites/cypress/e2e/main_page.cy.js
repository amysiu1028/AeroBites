describe('Display headere on page load and drop down of airports', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000", {
      // Replace 3000 with a more specific api name later?
        statusCode: 200, 
        fixture: './airports.json'
    })
    cy.visit("http://localhost:3001")
  })

  it('should display Aerobites', () => {
    cy.get('header').should('be.visible')
      .get('header').should('contain', 'AeroBites')
  })

})