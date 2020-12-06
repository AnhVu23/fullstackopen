const app = require('../app')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Anh Vu',
    url: 'https://google.com/first-blog',
    likes: 0,
  },
  {
    title: 'Blog 2',
    author: 'Anh Vu',
    url: 'https://google.com/second-blog',
    likes: 0,
  },
]

const initialUsers = [
  {
    username: 'anhvu234',
    name: 'Anh Vu',
    password: 'admin123',
  },
]
let token = ''
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const users = await Promise.all(initialUsers.map(async (user) => {
    const saltRounds = config.SALT_ROUNDS
    const cloneUser = {...user}
    cloneUser.hashPassword = await bcrypt.hash(cloneUser.password, saltRounds)
    delete cloneUser.password
    const newUser = new User(cloneUser)
    return newUser.save()
  }))
  await Promise.all(
    initialBlogs.map((blog) => {
      const newBlog = new Blog(blog)
      newBlog.user = users[0].id
      return newBlog.save()
    })
  )
  const loginRes = await api.post('/api/auth').send({
    username: 'anhvu234',
    password: 'admin123',
  })
  token = `bearer ${loginRes.body.token}`
})

describe('Get all blogs', () => {
  test('Blogs are returned as json and the result contain 2 blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('Test unique identifier', () => {
  test('Check if note id is a unique identifier', async () => {
    const response = await api.get('/api/blogs')
    const idArray = response.body.map((blog) => {
      expect(blog.id).toBeDefined()
      return blog.id
    })
    expect(_.uniq(idArray)).toHaveLength(initialBlogs.length)
  })
})

describe('Create new blog', () => {
  test('Return 401 when jwt token is incorrect', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'Blog 3',
        author: 'Anh Vu',
        url: 'https://google.com/third-blog',
        likes: 0,
      })
      .expect(401)
  })

  test('Check the length of list after creating new blog', async () => {
    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send({
        title: 'Blog 3',
        author: 'Anh Vu',
        url: 'https://google.com/third-blog',
        likes: 0,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(initialBlogs.length + 1)
  })

  test('Check the default value for likes, if not specified in the request', async () => {
    const response = await api
      .post('/api/blogs')
      .set('authorization', token)
      .send({
        title: 'Blog 3',
        author: 'Anh Vu',
        url: 'https://google.com/third-blog',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })

  test('Validation for missing url', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send({
        title: 'Blog 3',
        author: 'Anh Vu',
      })
      .expect(400)
  })

  test('Validation for missing title', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send({
        author: 'Anh Vu',
        url: 'https://google.com/third-blog',
      })
      .expect(400)
  })
})

describe('Delete a blog', () => {
  test('Delete a blog from incorrect id format', async () => {
    await api.delete('/api/blogs/3').set('Authorization', token).expect(400)
  })

  test('Delete a blog successfully', async () => {
    const response = await api.get('/api/blogs')
    const blogId = response.body[0].id
    await api.delete(`/api/blogs/${blogId}`).set('Authorization', token).expect(204)
    const currentRes = await api.get('/api/blogs')
    expect(currentRes.body).toHaveLength(1)
  })
})

describe('Edit a blog', () => {
  test('Edit a blog from incorrect id format', async () => {
    await api
      .put('/api/blogs/3')
      .set('Authorization', token)
      .send({
        likes: 10,
      })
      .expect(400)
  })

  test('Edit a blog successfully', async () => {
    const response = await api.get('/api/blogs')
    const blogId = response.body[0].id
    await api
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', token)
      .send({
        likes: 10,
      })
      .expect(204)
    const currentRes = await api.get(`/api/blogs/${blogId}`).set('Authorization', token)
    expect(currentRes.body.likes).toBe(10)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
