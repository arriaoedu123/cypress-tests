import { format } from "../support/utils";

Cypress.Commands.add("addIncomes", () => {
  cy.get("#transaction .button").click();
  cy.get("#description").type("Compra de café");
  cy.get("[name=amount]").type(10);
  cy.get("[type=date]").type("2020-08-01");
  cy.get("button").contains("Salvar").click();
});

Cypress.Commands.add("addExpenses", () => {
  cy.get("#transaction .button").click();
  cy.get("#description").type("Aluguel");
  cy.get("[name=amount]").type(-200);
  cy.get("[type=date]").type("2020-08-01");
  cy.get("button").contains("Salvar").click();
});

Cypress.Commands.add("checkIncomes", () => {
  cy.get("#data-table tbody tr .description").should(
    "contain",
    "Compra de café"
  );
  cy.get("#data-table tbody tr .income").should("contain", 10);
  cy.get("#data-table tbody tr .date").should("contain", "01/08/2020");
});

Cypress.Commands.add("checkExpenses", () => {
  cy.get("#data-table tbody tr .description").should("contain", "Aluguel");
  cy.get("#data-table tbody tr .expense").should("contain", 200);
  cy.get("#data-table tbody tr .date").should("contain", "01/08/2020");
});

Cypress.Commands.add("removeIncomes", () => {
  const entrada = "Mesada";

  cy.get("td.description")
    .contains(entrada)
    .parent()
    .find("img[onclick*=remove]")
    .click();
  cy.get("#data-table").should("not.contain", entrada);
});

Cypress.Commands.add("removeExpenses", () => {
  const saida = "Suco Kapo";

  cy.get("td.description")
    .contains(saida)
    .siblings()
    .children("img[onclick*=remove]")
    .click();
  cy.get("#data-table").should("not.contain", saida);
});

Cypress.Commands.add("checkRemoveIncomes", () => {
  cy.get("#data-table tbody tr .description").should(
    "not.contain",
    "Compra de café"
  );
  cy.get("#data-table tbody tr .income").should("not.contain", 10);
  cy.get("#data-table tbody tr .date").should("not.contain", "01/08/2020");
});

Cypress.Commands.add("checkRemoveExpenses", () => {
  cy.get("#data-table tbody tr .description").should("not.contain", "Aluguel");
  cy.get("#data-table tbody tr .expense").should("not.contain", 200);
  cy.get("#data-table tbody tr .date").should("not.contain", "01/08/2020");
});

Cypress.Commands.add("checkTotalIncomes", () => {
  let incomes = 0,
    expanses = 0;

  cy.get("#data-table tbody tr").each(($row, index, $list) => {
    cy.get($row)
      .find("td.income, td.expense")
      .invoke("text")
      .then((text) => {
        if (text.includes("-")) {
          expanses += format(text);
        } else {
          incomes += format(text);
        }

        cy.log("entradas", incomes);
        cy.log("saidas", expanses);
      });
  });

  cy.get("#totalDisplay")
    .invoke("text")
    .then((text) => {
      let formattedTotal = format(text),
        expectedTotal = incomes + expanses;

      expect(formattedTotal).to.equal(expectedTotal);
    });
});
