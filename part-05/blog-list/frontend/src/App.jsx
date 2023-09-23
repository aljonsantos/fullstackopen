import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginUser = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch(err) {
      showNotif(err.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(savedBlog))
      showNotif(`blog: ${savedBlog.title} by ${savedBlog.author} added`, 'info')
    } catch(err) {
      showNotif(err.response.data.error, 'error')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showNotif('blog deleted', 'info')
    } catch(err) {
      showNotif(err.response.data.error, 'error')
    }
  }

  const likeBlog = async (id) => {
    setBlogs(blogs.map(blog => {
      return blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
    }))
    await blogService.like(id)
  }

  const showNotif = (msg, type) => {
    setNotif({ msg, type })
    setTimeout(() => {
      setNotif(null)
    }, 3000)
  }

  if(!user) {
    return (
      <div>
      <h2>log in to application</h2>
      <Notification data={notif} />
      <LoginForm handleLoginUser={loginUser} />
    </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification data={notif}/>
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
      <Toggable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm handleAddBlog={addBlog} />
      </Toggable>
      <br />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleBlogLike={likeBlog} handleDeleteBlog={deleteBlog}/>
        )}
      </div>
    </div>
  )
}

export default App