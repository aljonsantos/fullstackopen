import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = (anecdote) => {
  if (!anecdote.content || anecdote.content.length < 5) {
    throw new Error('anecdote must be at least 5 characters long.')
  }
  return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const updateAnecdote = (anecdote) => {
  return axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
}