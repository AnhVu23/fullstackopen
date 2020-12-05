const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

/* GET users listing. */
router
  .route('/')
  .get(async (request, response) => {
    Blog.find({}).then((blogs) => {
      response.json(blogs)
    })
  })
  .post(async (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
      response.status(201).json(result)
    })
  })

module.exports = router
