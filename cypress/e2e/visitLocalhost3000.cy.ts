describe("Visit some sites", () => {
  it("Visit localhost:3000", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h1").should("contain", "Fingerprint");
  });
});

export {};
