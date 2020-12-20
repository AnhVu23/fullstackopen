describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Anh Vu',
      username: 'anhvu',
      password: 'admin123',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    // ...
    cy.get('h2').should('contain', 'login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type('anhvu')
      cy.get('input[name="password"]').type('admin123')
      cy.contains('Login').click()

      cy.get('h2').should('contain', 'Blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('anhvu2')
      cy.get('input[name="password"]').type('admin123')
      cy.contains('Login').click()

      cy.get('.error-message-text').contains('invalid username or password')
      cy.get('.error-message-text').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
    })
  })

  describe.only('When logged in', function () {
    const newBlog = {
      title: 'Advanced React',
      author: 'Anh Vu',
      url: 'google.com',
    }
    beforeEach(function () {
      // log in user here
      cy.get('input[name="username"]').type('anhvu')
      cy.get('input[name="password"]').type('admin123')
      cy.contains('Login').click()
    })

    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('input[name="title"]').type(newBlog.title)
      cy.get('input[name="author"]').type(newBlog.author)
      cy.get('input[name="url"]').type('google.com')
      cy.get('button').contains('create').click()

      cy.get('.success-message-text').contains(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
    })

    it('User can like a blog', function () {
      cy.contains('new note').click()
      cy.get('input[name="title"]').type(newBlog.title)
      cy.get('input[name="author"]').type(newBlog.author)
      cy.get('input[name="url"]').type('google.com')
      cy.get('button').contains('create').click()

      cy.get('.success-message-text').contains(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      cy.contains(newBlog.title)
        .get('button')
        .contains('view')
        .click()
        .get('button')
        .contains('like')
        .click()
      cy.contains(newBlog.title).get('span').contains('likes 1')
    })

    it('User can delete a blog', function () {
      cy.contains('new note').click()
      cy.get('input[name="title"]').type(newBlog.title)
      cy.get('input[name="author"]').type(newBlog.author)
      cy.get('input[name="url"]').type('google.com')
      cy.get('button').contains('create').click()

      cy.get('.success-message-text').contains(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      cy.contains(newBlog.title)
        .get('button')
        .contains('view')
        .click()
        .get('button')
        .contains('remove')
        .click()
      cy.contains(newBlog.title).should('not.exist')
    })
  })

  describe.only('Blog sorting order', function () {
    const blog1 = {
      title: 'Advanced React',
      author: 'Anh Vu',
      url: 'google.com',
      likes: 1,
    }
    const blog2 = {
      title: 'Advanced Angular',
      author: 'Anh Vu',
      url: 'google.com',
      likes: 2,
    }
    const blog3 = {
      title: 'Advanced VueJS',
      author: 'Anh Vu',
      url: 'google.com',
      likes: 3,
    }
    const blogs = [blog3, blog2, blog1]
    beforeEach(function () {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/auth',
        body: {
          username: 'anhvu',
          password: 'admin123',
        },
      }).then((res) => {
        localStorage.setItem('blogapp_token', JSON.stringify(res.body.token))
        localStorage.setItem(
          'blogapp_user',
          JSON.stringify({
            username: res.body.username,
            name: res.body.name,
            id: res.body.id,
          })
        )

        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          body: blog3,
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem('blogapp_token')
            )}`,
          },
        })
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          body: blog2,
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem('blogapp_token')
            )}`,
          },
        })
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          body: blog1,
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem('blogapp_token')
            )}`,
          },
        })
        cy.visit('http://localhost:3000')
      })
    })
    it('Blog is in correct oder', function () {
      cy.get('.blog-title').then((titles) => {
        const isCorrectOrder = Array.from(titles).every((title, index) => {
            return (
              title.innerText === `${blogs[index].title} ${blogs[index].author}`
            )
        })
        expect(isCorrectOrder).to.eq(true)
      })
    })
  })
})
