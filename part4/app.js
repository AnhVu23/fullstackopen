require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const router = require('./controllers/index')
const middleware = require('./utils/middleware')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', router.main)
app.use('/api/blogs', router.blogRouter)
app.use('/api/users', router.userRouter)

// catch 404 and forward to error handler
app.use(middleware.unknownEndpoint)

// error handler
app.use(middleware.errorHandler)

module.exports = app
