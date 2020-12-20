describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
        name: 'Anh Vu',
        username: 'anhvu',
        password: 'admin123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    // ...
    cy.get('h2').should('contain', 'login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
      cy.get('input[name="username"]').type('anhvu')
      cy.get('input[name="password"]').type('admin123')
      cy.contains('Login').click()

      cy.get('h2').should('contain', 'Blogs')
    })

    it('fails with wrong credentials', function() {
        cy.get('input[name="username"]').type('anhvu2')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Login').click()
  
        cy.get('.error-message-text').contains('invalid username or password')
        cy.get('.error-message-text').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})