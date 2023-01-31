/* globals cy */
describe("NUShare Tests", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("opens with welcome message", () => {
    cy.visit("/");
    cy.get("[data-cy=login-title]").should("contain", "Welcome to NUShare");
  });
});
