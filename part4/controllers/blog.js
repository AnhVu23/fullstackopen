const { BadRequest } = require('http-errors')
const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

/* GET users listing. */
router
  .route('/')
  .get(async (request, response, next) => {
    try {
      const blogs = await Blog.find({})
      return response.json(blogs)
    } catch (e) {
      next(e)
    }
  })
  .post(async (request, response, next) => {
    try {
      if (!request.body.url) {
        throw new BadRequest('Url is missing')
      }
      if (!request.body.title) {
        throw new BadRequest('Title is missing')
      }
      if (!request.body.likes) {
        request.body.likes = 0
      }
      const blog = new Blog(request.body)
      const result = await blog.save()
      return response.status(201).json(result)
    } catch (e) {
      next(e)
    }
  })

router
  .route('/:id')
  .delete(async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).send()
    } catch (e) {
      next(e)
    }
  })
  .put(async (request, response, next) => {
    try {
    } catch (e) {
      next(e)
    }
  })

module.exports = router
