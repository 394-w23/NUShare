describe("Leaving ride tests", () => {
  it("on click of leave button, user disappears from passenger ;list", () => {
    cy.visit("/");

    // Verifies user in passenger list
    cy.get("[data-cy=aLEXbeae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=mWWwXj6w8NTQe9gjXxMCkwRSrve5]")
      .should("exist");

    // Leaves passenger
    cy.get("[data-cy=aLEXbeae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=ride-leave]")
      .click();

    // List no longer contains passenger
    cy.get("[data-cy=aLEXbeae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=mWWwXj6w8NTQe9gjXxMCkwRSrve5]")
      .should("not.exist");
  });
});
