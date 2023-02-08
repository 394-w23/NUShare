/* globals cy */
describe("Login tests", () => {
    it("signs in", () => {
      cy.visit("/login");
      //click the signin button
      cy.get("[data-cy=sign-in]").click();
      // sign in should have disappeared
      cy.get ("[data-cy=sign-out]").should("contain", "Sign out");
      cy.get("[data-cy=sign-in]").should("not.exist");
      
  });
  it("signs out", () => {
    cy.visit("/login");
    //click the signout button
    cy.get("[data-cy=sign-out]").click();
    // sign in should appear
    cy.get("[data-cy=sign-in]").should("contain", "SIGN IN");
    cy.get("[data-cy=sign-out").should("not.exist");
});

//EX-WORKING CODE
// it("signs out", () => {
//     cy.visit("/");
//     // sign in should appear
//     cy.get("[data-cy=sign-in]").should("contain", "SIGN IN");
//     cy.get("[data-cy=sign-out").should("not.exist");
// });
  });
  