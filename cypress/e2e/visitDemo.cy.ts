describe("Visit some sties", () => {
  // beforeEach(() => {
  //   cy.visit("https://jurajuhlar.eu");
  // });

  it("Visit localhost:3000", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h1").should("contain", "Fingerprint");
  });

  // it("Visit Fingerprint Demo at jurajuhlar.eu", () => {
  //   cy.visit("https://jurajuhlar.eu");
  //   cy.get("h1").should("contain", "Fingerprint");
  // });

  // it("Visit Fingerprint Demo at jurajuhlar.eu", () => {
  //   cy.visit("https://fingerprint.com");
  // });
});

export {};
