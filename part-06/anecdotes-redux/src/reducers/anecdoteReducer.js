import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    replaceAnecdote(state, action) {
      const anecdote = action.payload
      const id = anecdote.id
      return state.map(a => a.id === id ? anecdote : a)
    },
  }
})

export const {
  setAnecdotes,
  appendAnecdote,
  replaceAnecdote
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdotesService.vote(id)
    dispatch(replaceAnecdote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer