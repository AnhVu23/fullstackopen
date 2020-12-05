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
    const sortedList = blogs.sort((curBlog, prevBlog) => prevBlog.likes - curBlog.likes)
    return sortedList[0]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {
            author: '',
            blogs: 0
        }
    }
    const countByAuthor = _.countBy(blogs, 'author')
    const authorList = Object.keys(countByAuthor).map(key => ({
        author: key,
        blogs: countByAuthor[key]
    })).sort((curAuthor, prevAuthor) => prevAuthor.blogs - curAuthor.blogs)
    return authorList[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}