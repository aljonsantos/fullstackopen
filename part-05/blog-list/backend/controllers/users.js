const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (!(username && password)) {
    return res.status(400).json({ error: 'username or password missing' })
  }
  
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    password: passwordHash
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch(err) {
    next(err)
  }
})

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

module.exports = usersRouter