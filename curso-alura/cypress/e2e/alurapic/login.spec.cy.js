describe("Login de usuários alura pic", () => {
  beforeEach(() => {
    cy.visit("https://alura-fotos.herokuapp.com/");

    cy.intercept("POST", "https://apialurapic.herokuapp.com/user/login", {
      statusCode: 400,
    }).as("stubPost");
  });

  it("fazer login de usuário valido", () => {
    cy.login(Cypress.env("userName"), Cypress.env("password"));
    cy.wait("@stubPost");
    cy.contains("a", "(Logout)").should("be.visible");
  });
  it("fazer login de usuário inválido", () => {
    cy.login("flavio", "1234");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });
});
