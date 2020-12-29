import React, { useState } from 'react'
import {Button, TextField, Typography} from '@material-ui/core'
const initialBlogState = {
  title: '',
  author: '',
  url: '',
}
const BlogCreate = ({ onBlogCreate }) => {
  const [blogForm, setBlogForm] = useState({ ...initialBlogState })

  const onInputChange = (e) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value })
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    await onBlogCreate({ ...blogForm })
    setBlogForm(initialBlogState)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Typography variant='h2' component='h2'>create new</Typography>
      <div>
        <Typography variant='body1' component='span'>title</Typography>
        <TextField value={blogForm.title} name="title" onChange={onInputChange} />
      </div>
      <div>
      <Typography variant='body1' component='span'>author</Typography>
        <TextField value={blogForm.author} name="author" onChange={onInputChange} />
      </div>
      <div>
      <Typography variant='body1' component='span'>url</Typography>
        <TextField value={blogForm.url} name="url" onChange={onInputChange} />
      </div>
      <Button type="submit" color='primary'>create</Button>
    </form>
  )
}

export default BlogCreate
