const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/persons')
const morgan = require('morgan')

const apiRouter = express.Router()
apiRouter.use('/persons', usersRouter)

const personList = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

const app = express()

app.use(logger('dev'))
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


app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/info', (req, res) => {
  return res.send(`<p>Phonebook has info for ${personList.length} people</p>
    <p>${new Date()}</p>`)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
