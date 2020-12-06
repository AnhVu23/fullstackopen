const { Unauthorized } = require("http-errors")
const jwt = require('jsonwebtoken')
const config = require("./config")

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (
    error.name === 'ValidationError' ||
    error.name === 'BadRequestError'
  ) {
    return response.status(400).json({ error: error.message })
  }
  return response.status(500).json({ error: error.message })
}

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: 'unknown endpoint' })
}

const authorizationHandler = (request, response, next) => {
  const authorization = request.get('authorization')
  const bearer = authorization && authorization.toLowerCase().startsWith('bearer ') ? authorization.substring(7) : null
  if (!bearer) {
    return next(new Unauthorized('Authorization is needed'))
  }
  const decoded = jwt.verify(bearer, config.jwtSecret)
  if (!decoded.id) {
    return next(new Unauthorized('Authorization is needed'))
  }
  request.userId = decoded.id
  return next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  authorizationHandler,
}
