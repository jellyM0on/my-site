
//api tests

const apiUrl = Cypress.env('apiUrl');
const originUrl = Cypress.env('originUrl')

describe('API GET Verification', () => {
    it('should return the count value from the database', () => {
        cy.request({
            method: 'GET', 
            url: apiUrl,
            headers: {
                'Origin': originUrl
            }}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('count');
            expect(response.body.count).to.be.a('number'); 
        })
    })
});

describe('API POST Verification', () => {
    let initialCount; 
    let postCount; 
    it('should increment the count value in the database', () => {
        cy.request({
            method: 'GET', 
            url: apiUrl,
            headers: {
                'Origin': originUrl
            }}).then((response) => {
            initialCount = response.body.count; 
            cy.log(`Initial count: ${initialCount}`)
        })
        .then(() => {
            cy.request({
                method: 'POST', 
                url: apiUrl,
                headers: {
                    'Origin': originUrl
                }}). then((response) => {
                expect(response.status).to.eq(200); 
                expect(response.body).to.have.property('count');
                expect(response.body.count).to.be.a('number'); 
                postCount = response.body.count; 
            });
        })
        .then(() => {
            cy.request({
                method: 'GET', 
                url: apiUrl,
                headers: {
                    'Origin': originUrl
                }}).then((response) => {
                expect(response.body.count).to.eq(postCount); 
                expect(response.body.count).to.be.greaterThan(initialCount); 
            });
        });
    });
});

describe('API Header Origin Validation', () => {
    it('should respond with an error for invalid origins', () => {
        cy.request({
            method: 'GET', 
            url: apiUrl,
            headers: {
                'Origin': 'https://invalid-origin-url.com'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        })
    })
})

describe('API Request Validation', () => {
    const invalidMethods =  ['PUT', 'DELETE', 'PATCH'];

    invalidMethods.forEach(method => {
        it(`should return an error for ${method} method`, () => {
            cy.request({
                method: method,
                url: apiUrl,
                headers: {
                    'Origin': originUrl
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404 || 405); 
            })
        })
    })
})

//client tests

describe('Projects List Items Verification', () => {
    it('should have the same count of list items as projects in projects.json ', () => {
        cy.visit('/'); 
        const data = require('../../client/src/assets/projects.json');
        const expectedCount = data.projects.length; 
        cy.get('#project-container').children('li').should('have.length', expectedCount); 
    })
})