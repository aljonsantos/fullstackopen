import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  const container = render(<BlogForm handleAddBlog={addBlog} />).container
  const inputs = {
    title: container.querySelector('input[name="title"]'),
    author: container.querySelector('input[name="author"]'),
    url: container.querySelector('input[name="url"]')
  }
  const sendButton = screen.getByText('create')
  
  await user.type(inputs.title, 'test title...')
  await user.type(inputs.author, 'test author...')
  await user.type(inputs.url, 'test url...')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'test title...',
    author: 'test author...',
    url: 'test url...'
  })
})