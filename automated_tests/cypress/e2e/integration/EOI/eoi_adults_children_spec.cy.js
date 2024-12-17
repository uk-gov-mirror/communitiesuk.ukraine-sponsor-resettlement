const elements = require('../../page_elements/EOI/eoi_elements')
const texts = require('../../../fixtures/eoi_bodytext.json')

describe('[Frontend-UI]: EOI ADULTS AND CHILDREN', function () {
  context('Adults and Children', function () {
    beforeEach(function () {
      cy.visit('/expression-of-interest/steps/10')
    })
    it('has the expected page heading', function () {
      cy.get(elements.page_heading).contains(texts.how_many_people_heading).should('be.visible')
    })
    it('shows two validation errors when adults and children are empty', function () {
      cy.get(elements.continue_button).click()
      cy.get(elements.adults_error).should('exist')
      cy.get(elements.children_error).should('exist')
    })
    it('shows a validation error when children is empty]', function () {
      cy.get(elements.adults_textbox).type(4)
      cy.get(elements.continue_button).click()
      cy.get(elements.adults_error).should('not.exist')
      cy.get(elements.children_error).should('exist')
    })
    it('shows a validation error when adults is empty', function () {
      cy.get(elements.children_textbox).type(2)
      cy.get(elements.continue_button).click()
      cy.get(elements.adults_error).should('exist')
      cy.get(elements.children_error).should('not.exist')
    })
    it('shows a validation error when adults is invalid (over 9)', function () {
      cy.get(elements.adults_textbox).type(10)
      cy.get(elements.children_textbox).type(9)
      cy.get(elements.continue_button).click()
      cy.get(elements.adults_error).should('exist')
      cy.get(elements.children_error).should('not.exist')
    })
    it('shows a validation error when there are too many children with adults', function () {
      cy.get(elements.adults_textbox).type(9)
      cy.get(elements.children_textbox).type(10)
      cy.get(elements.continue_button).click()
      cy.get(elements.adults_error).should('not.exist')
      cy.get(elements.children_error).should('exist')
    })
    it('shows two validation errors when there are children without adults', function () {
      cy.get(elements.adults_textbox).type(0)
      cy.get(elements.children_textbox).type(2)
      cy.get(elements.continue_button).click()
      cy.get(elements.one_adult_living_w_children_error).should('exist')
      cy.get(elements.children_error).should('not.exist')
    })
    it('shows a validation error when there are too many adults and no children', function () {
      cy.get(elements.adults_textbox).type(100)
      cy.get(elements.children_textbox).type(0)
      cy.get(elements.continue_button).click()
      cy.get(elements.adults_error).should('exist')
      cy.get(elements.children_error).should('not.exist')
    })
    it('shows two validation errors when there are too many adults and children', function () {
      cy.get(elements.adults_textbox).type(1000)
      cy.get(elements.children_textbox).type(2000)
      cy.get(elements.continue_button).click()
      cy.get(elements.adults_error).should('exist')
      cy.get(elements.children_error).should('exist')
    })
    it('shows the next page when adults and children are valid', function () {
      cy.get(elements.adults_textbox).type(6)
      cy.get(elements.children_textbox).type(4)
      cy.get(elements.continue_button).click()
      cy.get(elements.children_error).should('not.exist')
      cy.get(elements.adults_error).should('not.exist')
      cy.get(elements.page_heading).contains(texts.who_offer_heading)
    })
  })
})