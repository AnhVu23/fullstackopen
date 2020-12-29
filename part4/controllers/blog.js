const { BadRequest, Forbidden, NotFound } = require('http-errors')
const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

/* GET users listing. */
router.route('/').get(async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    return response.json(blogs)
  } catch (e) {
    next(e)
  }
})
router
  .use(middleware.authorizationHandler)
  .route('/')
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
      const foundUser = await User.findById(request.userId)
      if (!foundUser) {
        throw new NotFound(`Can't find user with this id`)
      }
      blog.user = foundUser
      const result = await blog.save()
      foundUser.blogs = foundUser.blogs.concat([result])
      await foundUser.save()
      return response.status(201).json(result)
    } catch (e) {
      next(e)
    }
  })

router
  .use(middleware.authorizationHandler)
  .route('/:id')
  .get(async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).send()
      }
      return response.status(200).json(blog)
    } catch (e) {
      next(e)
    }
  })
  .put(async (request, response, next) => {
    try {
      await Blog.findByIdAndUpdate(request.params.id, request.body)
      return response.status(204).send()
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  .delete(async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id).populate('user')
      if (blog.user._id.toString() !== request.userId.toString()) {
        throw new Forbidden(`You can only delete your own blog`)
      }
      await Blog.deleteOne({ _id: request.params.id })
      return response.status(204).send()
    } catch (e) {
      next(e)
    }
  })

module.exports = router
