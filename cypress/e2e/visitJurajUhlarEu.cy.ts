describe("Visit some sites", () => {
  it("Visit Fingerprint Demo at jurajuhlar.eu", () => {
    cy.visit("https://jurajuhlar.eu");
    cy.get("h1").should("contain", "Fingerprint");
  });
});

export {};
