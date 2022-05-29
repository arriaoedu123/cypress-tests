/// <reference types="cypress" />

import { prepareLocalStorage } from "../support/utils";

context("Dev Finances", () => {
  beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/", {
      onBeforeLoad(win) {
        prepareLocalStorage(win);
      },
    });
  });

  //Cadastrar entradas
  it("Cadastrar entradas", () => {
    cy.addIncomes();
    cy.checkIncomes();
  });

  // Cadastrar saídas
  it("Cadastrar saídas", () => {
    cy.addExpenses();
    cy.checkExpenses();
  });

  // Remover entradas e saídas
  it("Remover entradas e saídas", () => {
    cy.removeIncomes();
    cy.removeExpenses();
  });

  it("Validar saldos com diversas transações", () => {
    cy.checkTotalIncomes();
  });
});
