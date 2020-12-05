require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const usersRouter = require('./routes/persons')
const morgan = require('morgan')

const apiRouter = express.Router()
apiRouter.use('/persons', usersRouter)

const app = express()

app.use(logger('dev'))
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

morgan.token('body', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
 })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

const errorHandler = (error, request, response) => {
  console.log('error', error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError' || error.name === 'BadRequestError') {
    return response.status(400).send({error: error.message})
  }
  return response.status(500).send({error: error.message})
}

app.use(errorHandler)

module.exports = app
