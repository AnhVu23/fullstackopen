require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const router = require('./controllers/index')
const middleware = require('./utils/middleware')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())

app.use('/', router.main)
app.use('/api/blogs', router.blogRouter)
app.use('/api/users', router.userRouter)
app.use('/api/auth', router.authRouter)

// catch 404 and forward to error handler
app.use(middleware.unknownEndpoint)

// error handler
app.use(middleware.errorHandler)

module.exports = app
