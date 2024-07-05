describe("Hero Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/hero/1011334");
  });

  it("should navigate to the hero page", () => {
    // ideally we would mock the response for the hero page to get consistent results
    // cy.intercept("GET", "http://gateway.marvel.com/*", {
    //   fixture: "hero.json",
    // });
    cy.get("[data-cy=hero-name]").should("have.text", "3-D Man");
    cy.get("[data-cy=hero-description]").should("have.text", "No description");
    cy.get("[data-cy=hero-thumbnail]").should("be.visible");
    cy.get("[data-cy=hero-comics]").should("have.length", 12);
    cy.get("[data-cy=hero-series]").should("have.length", 3);
    cy.get("[data-cy=hero-stories]").should("have.length", 20);
    cy.get("[data-cy=hero-events]").should("have.length", 1);
  });

  it("should navigate back when the user clicks on the back button", () => {
    cy.contains("Back").click();
    cy.url().should("include", "/heroes/1");
  });
});
