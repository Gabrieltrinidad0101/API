const { url, userAdmin, password} = require("./conf")

const login = () => {
    cy.visit(`${url}/login`)
    cy.viewport(1200, 800)
    cy.get("input[type='email']").type(userAdmin)
    cy.get("input[type='password']").type(password)
    cy.get("button").click()
    cy.contains("WELCOME").click()
}

module.exports = login;