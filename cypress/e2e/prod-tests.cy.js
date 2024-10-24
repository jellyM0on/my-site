
describe('Visitor Counter Verification', () => {
    it('should display the visitor counter with a number or empty string', () => {

        cy.visit('/'); 
        cy.get('#counter').invoke('text').then((text) => {
            const isNumber = !isNaN(text) && text !== ''; 
            expect(isNumber || text === '').to.be.true; 
        })
    })
})