import React, { useState } from 'react'
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
      <h2>create new</h2>
      <div>
        <span>title</span>
        <input value={blogForm.title} name="title" onChange={onInputChange} />
      </div>
      <div>
        <span>author</span>
        <input value={blogForm.author} name="author" onChange={onInputChange} />
      </div>
      <div>
        <span>url</span>
        <input value={blogForm.url} name="url" onChange={onInputChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogCreate
