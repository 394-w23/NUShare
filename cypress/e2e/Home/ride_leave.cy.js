describe("Leaving ride tests", () => {
  it("on click of leave button, user disappears from passenger list", () => {
    cy.visit("/");

    // Verifies user in passenger list
    cy.get("[data-cy=5ba1beae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=mWWwXj6w8NTQe9gjXxMCkwRSrve5]")
      .should("exist");

    // Leaves passenger
    cy.get("[data-cy=5ba1beae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=ride-leave]")
      .click();

    // List no longer contains passenger
    cy.get("[data-cy=5ba1beae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=mWWwXj6w8NTQe9gjXxMCkwRSrve5]")
      .should("not.exist");
  });

  it("on click of leave button, if user is only passenger, ride disappears", () => {
    cy.visit("/");

    // Verifies ride with only user exists
    cy.get("[data-cy=200ee784-2dbd-2610-ba58-4c46f5d09ea4]")
      .find("[data-cy=mWWwXj6w8NTQe9gjXxMCkwRSrve5]")
      .should("exist");

    // Leaves ride
    cy.get("[data-cy=200ee784-2dbd-2610-ba58-4c46f5d09ea4]")
      .find("[data-cy=ride-leave]")
      .click();

    // Ride no longer exists
    cy.get("[data-cy=200ee784-2dbd-2610-ba58-4c46f5d09ea4]").should(
      "not.exist"
    );
  });
});
