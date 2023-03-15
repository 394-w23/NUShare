describe("NUShare Tests", () => {
    it("on click of details button, ride details appear in a new page with chat and close button.", () => {
        // http://localhost:5173/ride/aLEXbeae-5b85-48c3-956b-6bd23eabcd33
        cy.visit("/");

        cy.get("[data-cy=aLEXbeae-5b85-48c3-956b-6bd23eabcd33]")
        .get("[data-cy=5ba1beae-5b85-48c3-956b-6bd23eabcd33]")
        .as('btn')
        .click({ multiple: true });

        cy.get("[data-cy=close-button]").should("contain", "Close");

        cy.get("[data-cy=chat-button]").should("contain", "Chat Board");

        cy.contains("Available Seats: 5");
        cy.contains("Date: 2023-06-30");
        cy.contains("Start Address: South Campus");
        cy.contains("End Address: Chicago O'Hare International Airport (ORD)");
      });
});
  