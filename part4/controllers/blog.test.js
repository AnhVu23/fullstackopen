const app = require('../app')
const supertest = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(
    initialBlogs.map((blog) => {
      const newBlog = new Blog(blog)
      return newBlog.save()
    })
  )
})

describe('Get all blogs', () => {
  test('Blogs are returned as json and the result contain 2 blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(2)
  })
})

describe('Test unique identifier', () => {
  test('Check if note id is a unique identifier', async () => {
    const response = await api.get('/api/blogs')
    const idArray = response.body.map((blog) => {
      expect(blog.id).toBeDefined()
      return blog.id
    })
    expect(_.uniq(idArray)).toHaveLength(2)
  })
})

describe('Create new blog', () => {
    test('Check the length of list after creating new blog', async () => {
      await api.post('/api/blogs')
      .send({
        title: 'Blog 3',
        author: 'Anh Vu',
        url: 'https://google.com/third-blog',
        likes: 0,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      const blogs = await api.get('/api/blogs')
      expect(blogs.body).toHaveLength(3)
    })

    test('Check the default value for likes, if not specified in the request', async () => {
        const response = await api.post('/api/blogs')
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
        await api.post('/api/blogs')
        .send({
          title: 'Blog 3',
          author: 'Anh Vu'
        })
        .expect(400)
      })

      test('Validation for missing title', async () => {
        await api.post('/api/blogs')
        .send({
          author: 'Anh Vu',
          url: 'https://google.com/third-blog',
        })
        .expect(400)
      })
  })

afterAll(() => {
  mongoose.connection.close()
})
