describe('Display header on page load and drop down of airports', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:8080", {
      // Replace 3000 with a more specific api name later?
        statusCode: 200, 
        fixture: 'airportdata.json'
    })
    cy.visit("http://localhost:3000")
  })

  it('should display Aerobites', () => {
    cy.get('header').should('be.visible')
      .get('header').should('contain', 'AeroBites')
  })

  it('should display the "Show Favorites" button', () => {
    cy.get('#show-favorites button').should('be.visible');
  });

//testing dropdown 
it('should display a dropdown with airports', () => {
  cy.get('.airports-select').should('be.visible');
  cy.get('.airports-select').children('option').should('have.length', 7); // my mock data and the select airport dummy option
});


})



//Testing the terminals and business and favorite button

describe('Airport Details', () => {
  beforeEach(() => {
      // Intercept the initial airports API call
      cy.intercept('GET', 'http://localhost:8080', { 
        fixture: 'airportdata.json' }).as('getAirports');

      // Intercept calls for terminals and businesses
      cy.intercept('GET', 'http://localhost:8080/terminals', { 
        fixture: 'terminalsdata.json' }).as('getTerminals');
      cy.intercept('GET', 'http://localhost:8080/businesses', { 
        fixture: 'businessesdata.json' }).as('getBusinesses');

      // Visit the main page and wait for the airports to load
      cy.visit('http://localhost:3000');
      cy.wait('@getAirports');

      // Simulate selecting an airport
      cy.get('.airports-select').select('Hartsfield-Jackson Atlanta International Airport');
      
      // Wait for the API calls to complete
      cy.wait('@getTerminals');
      cy.wait('@getBusinesses');
  });

  it('should display a airport name and favorite button that can be toggled', () => {
      // Check if Favorites button and link exists
      cy.contains('h2', 'Show Favorites').should('exist');
      cy.contains('h2', 'Hartsfield-Jackson Atlanta International Airport').should('exist');
      cy.contains('button', 'Favorite 🤍').should('exist').click();
      cy.contains('button', 'Favorite ❤️').should('exist').click();
      cy.contains('button', 'Favorite 🤍').should('exist');
  })

  it('should fetch and display terminals and businesses for a selected airport', () => {

      // Check if terminals and businesses are rendered correctly
      cy.get('.terminals-container').should('exist');
      cy.get('.businesses-container').should('exist');

      // Check if specific terminals and businesses are rendered correctly
      cy.contains('h3', 'Domestic Terminal').should('exist');
      cy.contains('Atlanta Chophouse').should('exist');

      cy.contains('h3', 'Concourse A').should('exist');
      cy.contains('Auntie Anne\'s').should('exist');

      cy.contains('h3', 'Concourse B').should('exist');
      cy.contains('Burger King').should('exist');

      cy.contains('h3', 'Concourse C').should('exist');
      cy.contains('IHOP express').should('exist');

      cy.contains('h3', 'Concourse D').should('exist');
      cy.contains('Starbucks').should('exist');

      cy.contains('h3', 'Concourse E').should('exist');
      cy.contains('Atlanta Chophouse').should('exist');

      // Check for a terminal with no businesses listed
      cy.contains('h3', 'Concourse T').next().should('contain', 'No businesses listed for this terminal.');
      cy.contains('h3', 'Concourse F - international').next().should('contain', 'No businesses listed for this terminal.');

  });

  it('should navigate the the favorites page and display favorite card', () => {
      // Favorite and navigate to favorites
      
      cy.contains('.favorite-button', 'Favorite 🤍').should('exist').click();
      cy.contains('h2', 'Show Favorites').should('exist').click();
      // What favorites page contains
      cy.contains('h2', 'Favorited Airports')
      cy.get('.fav-airport-cont').children().should('have.length', 2);
      cy.get('.airport-card').first().should('contain', 'Hartsfield-Jackson Atlanta International Airport')
      cy.get('.airport-card').first().should('contain', 'Unfavorite ❤️')
      cy.get('.airport-card').last().should('contain', 'Dallas-Fort Worth International Airport')
      cy.get('.airport-card').last().should('contain', 'Unfavorite ❤️')

      //Should unfavorite and clear
      cy.contains('button', 'Unfavorite ❤️').click();
      cy.get('.fav-airport-cont').children().should('have.length', 1);
      cy.get('.airport-card').first().should('contain', 'Dallas-Fort Worth International Airport')
      cy.get('.airport-card').first().should('contain', 'Unfavorite ❤️')

  })
   
}); 