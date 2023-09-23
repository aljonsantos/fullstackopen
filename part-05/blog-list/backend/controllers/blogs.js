const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body
  if (!(title && url)) {
    return res.status(400).json({ error: 'title or url missing' })
  }
  const user = req.user

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(await savedBlog.populate('user'))
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {
  const user = req.user

  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    if (blog && user._id.toString() !== blog.user.toString()) {
      return res.status(403).json({ error: 'you are not authorized to delete this blog' })
    }

    await Blog.deleteOne({ _id: blog._id })
    user.blogs = user.blogs.filter(id => id.toString() !== blog._id.toString())
    await user.save()
    res.status(204).end()
  } catch(err) {
    next(err)
  }
  
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true,
      context: 'query'
    })

  res.json(updatedBlog)
})

module.exports = blogsRouter