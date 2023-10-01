import { configureStore } from '@reduxjs/toolkit'

import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdotesReducer,
    notification: notificationReducer
  }
})

export default store