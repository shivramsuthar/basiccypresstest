describe("login",()=>{
    it("login normal user ",()=>{
        cy.visit('/')
            .get('#root > div > div > div > div > div > form > div:nth-child(1) > input')
            .type(Cypress.env("userid"),{log:false})
            .should('have.value', Cypress.env("userid"),{log:false})

            .get('#root > div > div > div > div > div > form > div:nth-child(2) > input')
            .type(Cypress.env("pass"),{log:false})
            .should('have.value', Cypress.env("pass"),{log:false})
            .get('#root > div > div > div > div > div > form > div:nth-child(3) > button')
            .should('have.class', 'btn btn-success')
            .click()

            .wait(1000)

            .should(()=>{
                expect(localStorage.getItem('authenticatedUserId')).to.eq(Cypress.env("userid"),{log:false})
                expect(localStorage.getItem('authenticatedUserType')).to.eq('User')
            })

            cy.url()
                .should('include','/welcome')
            
            cy.visit('/welcome')
                .get('#root > div > div > div > div > nav > p')
                .should('contain',Cypress.env("userid"),{log:false})

                cy.get('#root > div > div > div > div > div')
                .children()
                .should('have.length',2)
                .eq(0).should('contain','Block A')
                .should('have.attr', 'style', 'background: green;')
                .parent()
                .children()
                .eq(1).should('contain','Block B')
                .should('have.attr', 'style', 'background: yellow;')

                .get('#root > div > div > div > div > nav > div > button')
                .should('have.class', 'btn btn-success')
                .click()

                cy.wait(2000)

                cy.url()
                    .should('include','/Logout')

                cy.visit('/Logout')
                    .get('#root > div > div > div > div > div > b > a')
                    .click()

                cy.wait(1000)

                cy.url()
                    .should('include','/login')
    })
})