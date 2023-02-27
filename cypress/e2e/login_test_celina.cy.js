/* globals cy */
describe("Login tests", () => {
    it("welcome shows when signed in", () => {
        cy.visit("/login");
        cy.get("[data-cy=sign-in]").click();
        cy.get("[data-cy=welcome-user]").should("contain", "Welcome");
    });
});
  