const express = require('express')
const { HttpError, BadRequest } = require('http-errors')
var router = express.Router()

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
/* GET users listing. */
router
  .route('/')
  .get(function (req, res, next) {
    return res.send(personList)
  })
  .post(function (req, res, next) {
    try {
      if (!req.body.name) {
        throw new BadRequest('Name is missing')
      }
      if (!req.body.number) {
        throw new BadRequest('Number is missing')
      }
      const foundExistPerson = personList.find(person => person.name === req.body.name)
      if (!foundExistPerson) {
        throw new BadRequest('Name must be unique')
      }
      const newPerson = { ...req.body }
      // Random an id with big enough range
      newPerson.id =
        Number(Math.random().toFixed(3)) * 1000 + personList.length + 1
      personList.push(newPerson)
      return res.header({ Location: `/api/persons/${newPerson.id}` }).send({
        Location: `/api/persons/${newPerson.id}`,
      })
    } catch (e) {
      return res.status(400).send(e)
    }
  })

router
  .route('/:id')
  .get(function (req, res, next) {
    const foundPerson = personList.find(
      (person) => person.id === parseInt(req.params.id, 10)
    )
    if (!foundPerson) {
      return res.status(404).send()
    }
    return res.send(foundPerson)
  })
  .delete(function (req, res, next) {
    const foundPersonIndex = personList.findIndex(
      (person) => person.id === parseInt(req.params.id, 10)
    )
    if (foundPersonIndex === -1) {
      return res.status(404).send()
    }
    personList.splice(foundPersonIndex, 1)
    return res.status(204).send()
  })

module.exports = router
