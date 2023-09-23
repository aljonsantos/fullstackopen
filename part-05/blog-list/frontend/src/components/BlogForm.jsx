import { useState } from 'react'

const BlogForm = ({ handleAddBlog }) => {

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleAddBlog(formData)
    setFormData({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleFormChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm