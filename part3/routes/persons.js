const express = require('express')
const { HttpError, BadRequest } = require('http-errors')
const router = express.Router()
const Person = require('../models/person')

/* GET users listing. */
router
  .route('/')
  .get(async function (req, res, next) {
    const allPersons = await Person.find({})
    return res.send(allPersons)
  })
  .post(async function (req, res, next) {
    try {
      if (!req.body.name) {
        throw new BadRequest('Name is missing')
      }
      if (!req.body.number) {
        throw new BadRequest('Number is missing')
      }
      // const foundExistPerson = personList.find(person => person.name === req.body.name)
      // if (!foundExistPerson) {
      //   throw new BadRequest('Name must be unique')
      // }
      const newPerson = new Person({
        name: req.body.name,
        number: req.body.number,
      })
      const createdPerson = await newPerson.save()
      return res.header({ Location: `/api/persons/${newPerson.id}` }).json(createdPerson)
    } catch (e) {
      return res.status(400).send(e)
    }
  })

router
  .route('/:id')
  .get(async function (req, res, next) {
    const foundPerson = await Person.findById(parseInt(req.params.id, 10))
    if (!foundPerson) {
      return res.status(404).send()
    }
    return res.send(foundPerson)
  })
  .delete(async function (req, res, next) {
    const foundPerson = await Person.findById(parseInt(req.params.id, 10))
    if (foundPersonIndex === -1) {
      return res.status(404).send()
    }
    personList.splice(foundPersonIndex, 1)
    return res.status(204).send()
  })

module.exports = router
