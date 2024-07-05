describe("Index Page", () => {
  it("should navigate to the index page, see heroes cards and be redirected when clicked", () => {
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "/heroes/1");
    cy.get("[data-cy=heroes-card]").should("have.length", 20);
    cy.get("[data-cy=heroes-card]").first().click();
    cy.url().should("include", "/hero/");
  });
});
