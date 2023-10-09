const {phone, send101Messages } = require("./conf")
const login = require('./login.js')

describe('Instance', () => {
  it('Create Instance', () => {
    login();
    cy.contains("New Instance").click()
    cy.contains("New Instance").click()
  })

  it('Scan QR', () => {
    login()
    cy.contains("Manager").click()
    cy.wait(70 * 1000)
    cy.contains("authenticated")
  })


  it("Change Name to Instance", () => {
    login();
    cy.contains("Manager").click()
    cy.get("#instanceName").clear().type("Instance1").type('{enter}')
  })
})


describe("send message",()=>{
  it('Send Message', () => {
    if (!send101Messages) return;
    login();
    cy.contains("Manager").click()
    cy.get('input[name="to"]').type(phone)

    cy.wait(500)
    for (let i = 0; i < 101; i++) {
      cy.get('textarea[name="body"]').type(i.toString())
      cy.get("#buttonSendTestMessage").clear().click()
      cy.wait(500)
      if (i == 99) cy.contains("SUCCESS").click()
      if (i == 100) cy.contains("YOU EXCEEDED THE LIMIT OF MESSAGES").click()
    }
  })
})

