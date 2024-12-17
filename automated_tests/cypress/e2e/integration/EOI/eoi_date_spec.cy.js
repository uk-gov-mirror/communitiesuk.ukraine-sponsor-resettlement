const elements = require('../../page_elements/EOI/eoi_elements')
const errors = require('../../../fixtures/eoi_bodytext_errors.json')

describe('[Frontend-UI]: EOI DATE', function () {
  context('Specific Date Validations', function () {
    beforeEach(function() {
      cy.visit('/expression-of-interest/steps/9')
    })
    it("has the expected page heading", function () {
      cy.get(elements.start_hosting_heading).contains('How soon can you start hosting someone?').should('be.visible')
    })
    it("date error validations [all fields blank]", function () {
      cy.get(elements.continue_button).click()
      cy.get(elements.sdate_radiobtn_error_label).contains(errors.radiobtn_error_msg).should('be.visible')
      cy.get(elements.specific_date_radiobtn_error).click()
      cy.get(elements.continue_button).click()
      cy.get(elements.sdate_error_label).contains('Enter a valid start date').should('be.visible') 
    })
    it("date error validations [one field filled 'dd/mm/yyyy']", function () {
      element.date_v1()
    })
    it("date error validations [two fields filled 'dd/mm/yyyy']", function () {
      element.date_v2()
    })
    it("date error validations [invalid date, '31-02-2023']", function () {
      element.date_v3()
    })
    it("date error validations [invalid date, 'yesterday']", function () {
      element.date_v4()
    })
    it("date error validations [invalid day, '35']", function () {
      element.date_v5()
    })
    it("date error validations [invalid month, '18']", function () {
      element.date_v6()
    })
    it("date error validations [invalid month, '500']", function () {
      element.date_v7()
    })
    it("date error validations [all fields invalid, '32-13--2023']", function () {
      element.date_ai()
    })
    it("date error validations [all fields valid, 'todays date']", function () {
      element.date_av()
    })
    it("date error validations [all fields valid, 'future date']", function () {
      element.date_fu()
    })
  })
})