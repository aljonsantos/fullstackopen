const jwt = require('jsonwebtoken')
const logger = require('./logger')

const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('bearer ')) {
    req.token = auth.replace('bearer ', '')
  }
  
  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return next()
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(decodedToken.id)
    req.user = user
  } catch(err) {
    next(err)
  }

  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(err)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}