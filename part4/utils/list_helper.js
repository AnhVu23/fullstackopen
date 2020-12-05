const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const sortedList = blogs.sort(
    (curBlog, prevBlog) => prevBlog.likes - curBlog.likes
  )
  return sortedList[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      blogs: 0,
    }
  }
  const countByAuthor = _.countBy(blogs, 'author')
  const authorList = Object.keys(countByAuthor)
    .map((key) => ({
      author: key,
      blogs: countByAuthor[key],
    }))
    .sort((curAuthor, prevAuthor) => prevAuthor.blogs - curAuthor.blogs)
  return authorList[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      likes: 0,
    }
  }
  const countByAuthor = blogs.reduce((res, blog) => {
    res[blog.author] = Object.prototype.hasOwnProperty.call(res, blog.author)
      ? res[blog.author] + blog.likes
      : blog.likes
    return res
  }, {})
  const authorList = Object.keys(countByAuthor)
    .map((key) => ({
      author: key,
      likes: countByAuthor[key],
    }))
    .sort((curAuthor, prevAuthor) => prevAuthor.likes - curAuthor.likes)
  return authorList[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
