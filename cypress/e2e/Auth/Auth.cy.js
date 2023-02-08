describe("Test Auth", () => {
    it("signs in", () => {
        cy.visit("/login");
        cy.get("[data-cy=sign-in]").click();
        // sign in should have disappeared
        //execute function signInCy() from firebase.js
        cy.signIn();
        cy.get ("[data-cy=sign-out]").should("contain", "Sign out");
        cy.get("[data-cy=sign-in]").should("not.exist");
    });
});