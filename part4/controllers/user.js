const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')
const config = require('../utils/config')

router
  .route('/')
  .post(async (req, res, next) => {
    try {
      const body = req.body
      const saltRounds = config.SALT_ROUNDS
      const hashPassword = await bcrypt.hash(body.password, saltRounds)
      const user = new User({
        username: body.username,
        name: body.name,
        hashPassword,
      })
      const savedUser = await user.save()
      return res.status(201).json(savedUser)
    } catch (e) {
      next(e)
    }
  })
  .get(async (req, res, next) => {
    try {
      const users = await User.find({})
      return res.json(users)
    } catch (e) {
      next(e)
    }
  })

module.exports = router
