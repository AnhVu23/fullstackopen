import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getAllBlogs,
  updateBlog,
  deleteBlog,
  addComment,
} from '../reducers/blog'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const selectedBlog = useSelector((state) => {
    return state.blog.blogs.find((blog) => blog.id === id)
  })
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])
  const onLikeClick = async () => {
    try {
      const clone = { ...selectedBlog }
      clone.likes = clone.likes + 1
      clone._id = selectedBlog.id
      if (typeof clone.user !== 'string') {
        clone.user._id = clone.user.id
        delete clone.user.id
      }
      delete clone.id
      await dispatch(updateBlog(selectedBlog.id, clone))
      await dispatch(getAllBlogs())
    } catch (e) {}
  }

  const onDeleteClick = async (e) => {
    try {
      await dispatch(deleteBlog(selectedBlog.id))
    } catch (e) {}
  }

  if (!selectedBlog) return null
  return (
    <div>
      <h2>
        {selectedBlog.title} {selectedBlog.author}
      </h2>
      <a href={selectedBlog.url} target="_blank">
        {selectedBlog.url}
      </a>
      <div>
        <span>{selectedBlog.likes} likes</span>
        <button onClick={onLikeClick}>like</button>
      </div>
      <p>Added by {selectedBlog.user.name}</p>
      {user && user.id === selectedBlog.user.id ? (
        <button
          type="button"
          style={{ backgroundColor: 'lightblue' }}
          onClick={onDeleteClick}
        >
          remove
        </button>
      ) : null}
      <h2>comments</h2>
      <div>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={() => dispatch(addComment(selectedBlog.id, comment))}>
          add comment
        </button>
      </div>
      <ul>
        {selectedBlog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
