describe('Display header on page load and drop down of airports', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:8080", {
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

it('should display a dropdown with airports', () => {
  cy.get('.airports-select').should('be.visible');
  cy.get('.airports-select').children('option').should('have.length', 3); // my mock data and the select airport dummy option
});
})

describe('Airport Details', () => {
  beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080', { 
        statusCode: 200, 
        fixture: 'airportdata.json' 
      }).as('getAirports');

      cy.intercept('GET', 'http://localhost:8080/terminals', { 
        statusCode: 200, 
        fixture: 'terminalsdata.json' 
      }).as('getTerminals');
      cy.intercept('GET', 'http://localhost:8080/businesses', { 
        statusCode: 200, 
        fixture: 'businessesdata.json' 
      }).as('getBusinesses');

      cy.visit('http://localhost:3000');
      cy.wait('@getAirports');

      cy.get('.airports-select').select('Hartsfield-Jackson Atlanta International Airport');
      
      cy.wait('@getTerminals');
      cy.wait('@getBusinesses');
  });

  it('should display a airport name and favorite button that can be toggled', () => {
      cy.get('.show-favorites-link').contains('Show Favorites').should('exist');
      cy.contains('h2', 'Hartsfield-Jackson Atlanta International Airport').should('exist');
      cy.contains('button', 'Favorite 🤍').should('exist').click();
      cy.contains('button', 'Favorite ❤️').should('exist').click();
      cy.contains('button', 'Favorite 🤍').should('exist');
  })

  it('should fetch and display terminals and businesses for a selected airport', () => {
      cy.get('.terminals-container').should('exist');
      cy.get('.businesses-container').should('exist');

      cy.contains('h3', 'Domestic Terminal').should('exist');
      cy.contains('Atlanta Chophouse').should('exist');
      cy.contains('Auntie Anne\'s').should('exist');
      cy.contains('Burger King').should('exist');
      cy.contains('Ecco').should('exist');
    
      cy.contains('h3', 'Concourse A').should('exist');
      cy.contains('Asian Chao').should('exist');
      cy.contains('Atlanta Bread & Bar').should('exist');

      cy.contains('h3', 'Concourse B').should('exist');
      cy.contains('Asian Chao').should('exist');

      cy.contains('h3', 'Concourse C').should('exist');
      cy.contains('Atlanta Bread Company').should('exist');

      cy.contains('h3', 'Concourse D').should('exist');
      cy.contains('4040 Club').should('exist');

      cy.contains('h3', 'Concourse E').should('exist');
      cy.contains('Arby\'s').should('exist');

      // Check for a terminal with no businesses listed
      cy.contains('h3', 'Concourse T').next().should('contain', 'No businesses listed for this terminal.');

      cy.contains('h3', 'Concourse F - international').next().should('contain', 'No businesses listed for this terminal.');

  });

  it('should add another favorited airport, and navigate to the favorites page and display another favorited airport card', () => {
      cy.contains('.favorite-button', 'Favorite 🤍').should('exist').click();
      
      cy.get('.show-favorites-link').contains('Show Favorites').should('exist').click();
      cy.contains('h2', 'Favorited Airports')
      cy.get('.favorites-container').children().should('have.length', 2);
      cy.get('.airport-card').first().should('contain', 'Hartsfield-Jackson Atlanta International Airport')
      cy.get('.airport-card').first().should('contain', 'Unfavorite ❤️')
      cy.get('.airport-card').last().should('contain', 'Dallas-Fort Worth International Airport')
      cy.get('.airport-card').last().should('contain', 'Unfavorite ❤️')

      cy.contains('button', 'Unfavorite ❤️').click();
      cy.get('.favorites-container').children().should('have.length', 1);
      cy.get('.airport-card').first().should('contain', 'Dallas-Fort Worth International Airport')
      cy.get('.airport-card').first().should('contain', 'Unfavorite ❤️')
  })
   
  it('should be able to click onto the favorited airport card on favorites page, and navigate to that airport details page', () => {
    cy.get('.show-favorites-link').contains('Show Favorites').should('exist').click();
    cy.get('.favoritedairport-link').contains('Dallas-Fort Worth International Airport').should('exist').click();
    cy.get('.show-favorites-link').contains('Show Favorites').should('exist');
    cy.get('h2').contains('Dallas-Fort Worth International Airport')
    cy.get('.favorite-button').contains('Favorite ❤️').should('exist')
    cy.get('.terminal').should('have.length','8')
  })
}); 

  