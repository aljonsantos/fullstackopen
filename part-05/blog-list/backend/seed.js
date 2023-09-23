const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('./utils/config')

const User = require('./models/user')
const Blog = require('./models/blog')

const users = [
  {
    username: 'root',
    name: 'Root',
    password: 'root',
    blogs: []
  },
  {
    username: 'user',
    name: 'User',
    password: 'user',
    blogs: []
  }
]

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const seed = async () => {
  await mongoose.connect(config.MONGODB_URI)
  console.log('connected to MongoDB')

  await clean()
  await populate()

  mongoose.connection.close()
}

seed()

const clean = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
}

const populate = async () => {

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    user.password = passwordHash
  }

  const savedUsers = await User.insertMany(users)
  const savedBlogs = await Blog.insertMany(blogs)
  
  for (const blog of savedBlogs) {
    const rand = Math.floor(Math.random() * savedUsers.length)
    const user = savedUsers[rand]
    blog.user = user._id
    user.blogs = user.blogs.concat(blog._id)
  }

  await Promise.all(savedUsers.map(user => user.save()))
  await Promise.all(savedBlogs.map(blog => blog.save()))
}



