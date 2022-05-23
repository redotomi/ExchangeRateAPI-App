/// <reference types="cypress" />

const URL = 'http://127.0.0.1:5500/src/index.html';
const CANTIDAD_MONEDAS = 161;

context('Exchange table with API', () => {

  before(() => {
    cy.visit(URL);
  });

  describe('Comprobación de la existencia de todos los componentes', () => {
    it('Se asegura de que haya un título', () => {
      cy.get('header').find('h1').should('be.visible');

    });

    it('Se asegura de que estén los botones y la fecha', () => {
      cy.get('.options').find('.select-currency').should('be.visible');
      cy.get('.options').find('#update-currency').should('be.visible');

      cy.get('.options').find('#date').should('be.visible');
    });

    it('Se asegura de que esten todas las monedas de cambio', () => {
      cy.get('#table').find('.currency').should('have.length', CANTIDAD_MONEDAS);
    });

  })

  describe('Interacción con la tabla', () => {
    it('Elige una nueva moneda y se asegura que la cantidad de monedas sea la misma', () => {
      cy.get('#select-currency').select('USD');
      cy.get('.options').find('#update-currency').click();
      cy.get('#table').find('.currency').should('have.length', CANTIDAD_MONEDAS);
    });

    it('Repite la acción anterior con otra moneda', () => {
      cy.get('#select-currency').select('BOB');
      cy.get('.options').find('#update-currency').click();
      cy.get('#table').find('.currency').should('have.length', CANTIDAD_MONEDAS);
    });
  });

});

