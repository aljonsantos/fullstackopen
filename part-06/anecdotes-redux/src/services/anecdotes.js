import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const get = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const vote = async (id) => {
  const anecdote = await get(id)
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const res = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return res.data
}

export default {
  getAll,
  create,
  vote
}