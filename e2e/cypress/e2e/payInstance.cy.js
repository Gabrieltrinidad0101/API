const login = require('./login')
describe("pay instance", () => {
    it("Create new Payment Instance", () => {
        login();
        cy.get("#payInstanceButton").click()
    })
})