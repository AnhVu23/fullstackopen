import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('Test render blog', () => {
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
  test('render blog in the init state', () => {
    const component = render(<Blog blog={blog} onDeleteClick={() => console.log('delete')} onLikeClick={() => console.log('like')}/>)
    const blogAuthor = component.container.querySelector('.blog-title')
    const blogContent = component.container.querySelector('.blog-content')
    expect(blogAuthor).toBeInTheDocument()
    expect(blogContent).not.toBeInTheDocument()
  })

  test('render blog when the show button is clicked', () => {
    const component = render(<Blog blog={blog} onDeleteClick={() => console.log('delete')} onLikeClick={() => console.log('like')}/>)
    fireEvent.click(component.getByText('view'))
    const blogAuthor = component.container.querySelector('.blog-title')
    const blogContent = component.container.querySelector('.blog-content')
    expect(blogAuthor).toBeInTheDocument()
    expect(blogContent).toBeInTheDocument()
  })

  test('render blog when the like button is clicked twice', () => {
    const onLikeMockHandler = jest.fn()
    const component = render(<Blog blog={blog} onDeleteClick={() => console.log('delete')} onLikeClick={onLikeMockHandler}/>)
    fireEvent.click(component.getByText('view'))
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(onLikeMockHandler.mock.calls).toHaveLength(2)
  })
})

