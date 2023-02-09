describe("Joining ride tests", () => {
  it("on click of join button, user appears within passenger list", () => {
    cy.visit("/");
    cy.get("[data-cy=aLEXbeae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=mWWwXj6w8NTQe9gjXxMCkwRSrve5]")
      .should("not.exist");

    cy.get("[data-cy=aLEXbeae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=ride-join]")
      .click();

    cy.get("[data-cy=aLEXbeae-5b85-48c3-956b-6bd23eabcd33]")
      .find("[data-cy=mWWwXj6w8NTQe9gjXxMCkwRSrve5]")
      .should("exist");
  });
});
