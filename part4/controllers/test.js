const express = require('express');
const router = express.Router();
const Blog = require('../models/blog')
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res) {
  return res.send('Hello world')
});

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  return res.status(204).end()
})

module.exports = {
    router
}
