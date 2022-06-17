describe("Usabilidades da página inicial", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Verificar mensagem de usuário com letras maiúsculas", () => {
    cy.contains("a", "Register now").click();

    cy.get("input[formcontrolname=userName]").type("TESTE").blur();
    cy.contains("ap-vmessage", "Must be lower case").should("be.visible");
  });
});
