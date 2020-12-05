const app = require('../app')
const supertest = require('supertest')
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

afterAll(() => {
  mongoose.connection.close()
})
