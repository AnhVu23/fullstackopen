const express = require('express')
const { BadRequest } = require('http-errors')
const router = express.Router()
const Person = require('../models/person')

/* GET users listing. */
router
  .route('/')
  .get(async function (req, res, next) {
    try {
      const allPersons = await Person.find({})
      return res.send(allPersons)
    } catch (e) {
      next(e)
    }
  })
  .post(async function (req, res, next) {
    try {
      if (!req.body.name) {
        throw new BadRequest('Name is missing')
      }
      if (!req.body.number) {
        throw new BadRequest('Number is missing')
      }
      const newPerson = new Person({
        name: req.body.name,
        number: req.body.number,
      })
      const createdPerson = await newPerson.save()
      return res
        .header({ Location: `/api/persons/${newPerson.id}` })
        .json(createdPerson)
    } catch (e) {
      console.log(e.message)
      next(e)
    }
  })

router
  .route('/:id')
  .get(async function (req, res, next) {
    try {
      const foundPerson = await Person.findById(req.params.id)
      if (!foundPerson) {
        return res.status(404).send()
      }
      return res.send(foundPerson)
    } catch (e) {
      next(e)
    }
  })
  .put(async function (req, res, next) {
    try {
      await Person.findByIdAndUpdate(req.params.id, req.body)
      return res.status(204).send()
    } catch(e) {
      next(e)
    }
  })
  .delete(async function (req, res, next) {
    try {
      await Person.findByIdAndRemove(req.params.id)
      return res.status(204).send()
    } catch (e) {
      console.log(e)
      next(e)
    }
  })

module.exports = router
