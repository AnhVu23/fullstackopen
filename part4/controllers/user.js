const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
const config = require('../utils/config')
const { BadRequest } = require('http-errors')

router
  .route('/')
  .post(async (req, res, next) => {
    try {
      const body = req.body
      checkField(body, 'username')
      checkField(body, 'password')
      const saltRounds = config.SALT_ROUNDS
      const hashPassword = await bcrypt.hash(body.password, saltRounds)
      const user = new User({
        username: body.username,
        name: body.name,
        hashPassword,
      })
      const savedUser = await user.save()
      delete savedUser.hashPassword
      return res.status(201).json(savedUser)
    } catch (e) {
      next(e)
    }
  })
  .get(async (req, res, next) => {
    try {
      const users = await User.find({}).populate('blogs')
      return res.json(users.map(user => {
        delete user.hashPassword
        return user
      }))
    } catch (e) {
      next(e)
    }
  })

const checkField = (body, key) => {
  if (!body[key]) {
    throw new BadRequest(`${key} is required`)
  }
  if (body[key].length <= 3) {
    throw new BadRequest(`${key} must be at least 3 characters length`)
  }
}

module.exports = router
