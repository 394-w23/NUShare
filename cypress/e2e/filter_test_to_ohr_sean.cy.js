/* globals cy */
describe("Filter tests", () => {
    it("Filters To ORD rides", () => {
        cy.visit("/login");
        cy.get("[data-cy=sign-in]").click();
        cy.get("[data-cy=toORD]").click();
        cy.get("[data-cy=filtered-rides]").then(rides => {
            for (let i = 0; i < rides.length; i++){
                let destination = rides[0].innerText.slice(13, 55)
                expect(destination.trim()).equal("Chicago O'Hare International Airport (ORD)")
            }
        });
        
    });
});