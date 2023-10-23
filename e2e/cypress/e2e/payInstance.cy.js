const conf = require('./conf');
const login = require('./login')

describe("pay instance", () => {
    it("Get Link of Paypal", () => {
        login();
        cy.get("#payInstanceLink")
            .invoke('attr', 'href')
            .then(href => {
                cy.task("save",href)
            })
    })

    it("Payment", () => {
        cy.task("load").then(link=>{
            cy.visit(link)
            cy.get("#email").type(conf.userSandBox)
            cy.get("#btnNext").click()
            cy.get("#password").type(conf.userSandBox)
            cy.get("#btnLogin").click()
        })
    })
})
