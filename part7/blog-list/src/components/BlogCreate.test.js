import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, act } from '@testing-library/react'
import BlogCreate from './BlogCreate'

describe('Test render create blog form', () => {
  const blog = {
    title: 'Blog 2',
    author: 'Anh Vu',
    url: 'https://google.com/second-blog',
    likes: 4,
    user: {
      blogs: [],
      username: 'anhvu234',
      name: 'Anh Vu',
      id: '5fcd1024eb47a8a527217880',
    },
    id: '5fcd1024eb47a8a527217882',
  }
  test('Form will update parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const component = render(<BlogCreate onBlogCreate={createBlog} />)
    const inputTitle = component.container.querySelector('input[name="title"]')
    const inputAuthor = component.container.querySelector(
      'input[name="author"]'
    )
    const inputUrl = component.container.querySelector('input[name="url"]')
    fireEvent.change(inputTitle, {
      target: {
        value: blog.title,
      },
    })
    fireEvent.change(inputAuthor, {
      target: {
        value: blog.author,
      },
    })
    fireEvent.change(inputUrl, {
      target: {
        value: blog.url,
      },
    })
    const form = component.container.querySelector('form')
    await act(async () => fireEvent.submit(form))

    expect(createBlog.mock.calls).toHaveLength(1)
    const mockData = createBlog.mock.calls[0][0]
    expect(mockData.title).toBe(blog.title)
    expect(mockData.author).toBe(blog.author)
    expect(mockData.url).toBe(blog.url)
  })
})
