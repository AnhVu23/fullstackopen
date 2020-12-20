const express = require('express');
const router = express.Router();
const userRouter = require('./user')
const blogRouter = require('./blog')
const authRouter = require('./auth')
const testRouter = require('./test')

/* GET home page. */
router.get('/', function(req, res) {
  return res.send('Hello world')
});

module.exports = {
  userRouter,
  blogRouter,
  main: router,
  authRouter,
  testRouter,
}
