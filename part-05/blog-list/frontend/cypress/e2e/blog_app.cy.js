describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login',function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/users', {
        username: 'user',
        name: 'User',
        password: 'user'
      })
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user')
      cy.get('#password').type('user')
      cy.get('#login-btn').click()

      cy.contains('User is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.get('.notif.error')
        .should('contain', 'invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/users', {
        username: 'user',
        name: 'User',
        password: 'user'
      })
      cy.login({ username: 'user', password: 'user' })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'https://example.com'
      })

      cy.contains('a blog created by cypress - cypress')
    })

    it('Blogs are ordered by likes', function() {
      cy.createBlog({
        title: 'a blog with most likes',
        author: 'cypress',
        url: 'https://example.com',
        likes: 10
      })
      cy.createBlog({
        title: 'a blog with second most likes',
        author: 'cypress',
        url: 'https://example.com',
        likes: 5
      })
      cy.createBlog({
        title: 'a blog with the least likes',
        author: 'cypress',
        url: 'https://example.com',
      })

      cy.get('.blog').eq(0).contains('a blog with most likes - cypress')
      cy.get('.blog').eq(1).contains('a blog with second most likes - cypress')
      cy.get('.blog').eq(2).contains('a blog with the least likes - cypress')
    })

    describe('Blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'cypress',
          url: 'https://example.com'
        })
      })
  
      it('it can be liked', function() {
        cy.contains('a blog created by cypress - cypress').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('like').click()
        cy.get('@theBlog').contains('likes 1')
      })

      it('it can be deleted by the user who created it', function() {
        cy.contains('a blog created by cypress - cypress').parent().as('theBlog')
        cy.get('@theBlog').contains('delete').click()
        cy.get('.notif.info').should('contain', 'blog deleted')
        cy.contains('a blog created by cypress - cypress').should('not.exist')
      })

      it('delete button is only shown to the user who created it', function() {
        cy.contains('logout').click()

        cy.request('POST', 'http://localhost:3001/api/users', {
          username: 'user2',
          name: 'User2',
          password: 'user2'
        })
        cy.login({ username: 'user2', password: 'user2' })

        cy.contains('a blog created by cypress - cypress').parent().as('theBlog')
        cy.get('@theBlog').contains('delete').should('not.exist')
      })
    })
  })
})