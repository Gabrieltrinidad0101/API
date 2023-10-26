const conf = require('./conf');
const login = require('./login')

describe("pay instance", () => {
    it("Get Link of Paypal", () => {
        login();
        cy.get("#payInstanceLink")
            .invoke('attr', 'href')
            .then(href => {
                cy.task("save", href)
            })
    })

    it("Payment", () => {
        cy.task("load").then(link => {
            cy.visit(link)
            cy.get("#email").type(conf.userSandBox, { delay: 100 })
            cy.get("#btnNext").click()
            cy.wait(10000)
            cy.contains("$25.00")
        })
    })
})



describe("Use instanced paymented", () => {
    it("Send 101 messages", () => {
        login();
        cy.contains("Manager").click()
        cy.get('input[name="to"]').type(phone)
        cy.wait(500)
        for (let i = 0; i < 101; i++) {
            cy.get('textarea[name="body"]').type(i.toString())
            cy.get("#buttonSendTestMessage").clear().click()
            cy.wait(500)
            cy.contains("SUCCESS").click()
        }
    })
})