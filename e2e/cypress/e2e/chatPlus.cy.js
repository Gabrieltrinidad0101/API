const { url, userAdmin, password, phone } = require("./conf")

const login = () => {
  cy.visit(`${url}/login`)
  cy.viewport(1200, 800)
  cy.get("input[type='email']").type(userAdmin)
  cy.get("input[type='password']").type(password)
  cy.get("button").click()
  cy.contains("WELCOME").click()
}

describe('Auth', () => {
  it('Create Instance', () => {
    login();
    cy.contains("New Instance").click()
  })

  it('Scan QR', () => {
    login();
    cy.contains("Manager").click()
    cy.wait(70 * 1000)
    cy.contains("authenticated")
  })

  it('Send Message', () => {
    login();
    cy.contains("Manager").click()
    cy.get('input[name="to"]').type(phone)
    
    cy.wait(500)
    for (let i = 0; i < 101; i++) {
      cy.get('textarea[name="body"]').type(i.toString())
      cy.get("#buttonSendTestMessage").click()
      cy.wait(500)
      cy.contains("SUCCESS").click()
    }
  })



})