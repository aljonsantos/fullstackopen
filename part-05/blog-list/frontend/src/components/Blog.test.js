import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
      name: 'Test User'
    }
  }
  const likeBlog = jest.fn()

  beforeEach(() => {
    render(<Blog blog={blog} handleBlogLike={likeBlog} />)
  })

  test('renderes title and author by default', () => {
    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
  })

  test('renderes url and likes after clicking the view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByText(blog.url)).toBeDefined()
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeDefined()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    expect(likeBlog.mock.calls).toHaveLength(1)
    await user.click(likeButton)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
