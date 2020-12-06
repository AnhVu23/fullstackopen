const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

router.route('/').post(async (request, response, next) => {
  try {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    let passwordCorrect = false
    if (user !== null) {
        passwordCorrect = await new Promise((resolve, reject) => {
            return user.comparePassword(body.password, (err, isMatch) => {
                if (err) {
                    return reject(err)
                }
                return resolve(isMatch)
            })
        })
    }
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, config.jwtSecret)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (e) {
    next(e)
  }
})
module.exports = router
