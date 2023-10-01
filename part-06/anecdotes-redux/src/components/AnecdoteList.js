import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.includes(filter))
  })
  
  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`you voted '${content}'`, 3))
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote)}
          />
        )
      }
    </div>
  )
}

export default AnecdoteList