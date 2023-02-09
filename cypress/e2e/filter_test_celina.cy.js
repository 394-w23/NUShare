/* globals cy */
describe("Filter tests", () => {
    it("filters to midway rides", () => {
        cy.visit("/login");
        cy.get("[data-cy=sign-in]").click();
        cy.get("[data-cy=toMDW]").click();
        cy.get("[data-cy=filtered-rides]").then(rides => {
            for (let i = 0; i < rides.length; i++){
                let destination = rides[0].innerText.slice(13, 55)
                expect(destination.trim()).equal("Chicago Midway International Airport (MDW)")
            }
        });
        
    });
});