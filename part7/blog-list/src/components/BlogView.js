import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Typography, Button, TextField, Container, Link} from '@material-ui/core'
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
    <Container>
      <Typography variant='h3' component='h3'>
        {selectedBlog.title} {selectedBlog.author}
      </Typography>
      <Link href={selectedBlog.url} target="_blank">
        {selectedBlog.url}
      </Link>
      <div>
        <Typography variant='body1' component='span'>{selectedBlog.likes} likes</Typography>
        <Button onClick={onLikeClick}>like</Button>
      </div>
      <Typography variant='body1' component='p'>Added by {selectedBlog.user.name}</Typography>
      {user && user.id === selectedBlog.user.id ? (
        <Button
          type="button"
          style={{ backgroundColor: 'lightblue' }}
          onClick={onDeleteClick}
        >
          remove
        </Button>
      ) : null}
      <Typography variant='h3' component='h3'>comments</Typography>
      <div>
        <TextField value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button onClick={() => dispatch(addComment(selectedBlog.id, comment))}>
          add comment
        </Button>
      </div>
      <ul>
        {selectedBlog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </Container>
  )
}

export default BlogView
