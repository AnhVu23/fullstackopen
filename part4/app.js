require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./controllers/index')
const blogRouter = require('./controllers/blog')
const {errorHandler, unknownEndpoint} = require('./utils/middleware')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/blogs', blogRouter)

// catch 404 and forward to error handler
app.use(unknownEndpoint)

// error handler
app.use(errorHandler)

module.exports = app
