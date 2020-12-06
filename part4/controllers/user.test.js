const app = require('../app')
const supertest = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'anhvu',
    name: 'Anh Vu',
    password: 'admin123',
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  await Promise.all(
    initialUsers.map((user) => {
      const newUser = new User(user)
      return newUser.save()
    })
  )
})

describe('Create new user', () => {
  test('Check the length of list after creating new user', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'anhvu23',
        name: 'Anh Vu',
        password: 'admin123',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(initialUsers.length + 1)
  })

  test('Validate password field', async () => {
    const response = await api
      .post('/api/users')
      .send({
        username: 'anhvu234',
        name: 'Anh Vu'
      })
      .expect(400)
  })

  test('Validate username field', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Anh Vu',
        password: 'admin123',
      })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
