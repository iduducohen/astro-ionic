describe('astro', () => {
  it('opens the personal chart', () => {
    cy.visit('/me');
    cy.get('ion-title').should('exist');
  });
});
