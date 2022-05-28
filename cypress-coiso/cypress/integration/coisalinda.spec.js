describe("Dev Finance", () => {
  beforeEach(() => {
    cy.visit("https://dev-finance.netlify.app/");
  });

  it("Adicionar entrada", () => {
    cy.get("#transaction .button").as("adicionarBtn").click();
    cy.get("#description").as("transacaoNome").type("Teste");
    cy.get("#amount").as("transacaoValor").type(100);
    cy.get("#date").as("transacaoData").type("2020-01-01");
    cy.get("button").contains("Salvar").click();

    cy.get("#data-table tbody tr")
      .find("td.description")
      .should("contain", "Teste");
    cy.get("#data-table tbody tr").find("td.income").should("contain", 100);
    cy.get("#data-table tbody tr")
      .find("td.date")
      .should("contain", "01/01/2020");
  });

  it("Adicionar entrada com valor negativo", () => {
    cy.get("#transaction .button").as("adicionarBtn").click();
    cy.get("#description").as("transacaoNome").type("Teste");
    cy.get("#amount").as("transacaoValor").type(-100);
    cy.get("#date").as("transacaoData").type("2020-01-01");
    cy.get("button").contains("Salvar").click();

    cy.get("#data-table tbody tr")
      .find("td.description")
      .should("contain", "Teste");
    cy.get("#data-table tbody tr").find("td.expense").should("contain", 100);
    cy.get("#data-table tbody tr")
      .find("td.date")
      .should("contain", "01/01/2020");
  });
});
