import { useState, useEffect } from 'react';

const Anecdote = ({ text, votes, upvote }) => {
  return (
    <div>
      <p>{text}</p>
      <p>votes | {votes}</p>
      {upvote && <button onClick={upvote}>vote</button>}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const [max, setMax] = useState(null);

  useEffect(() => {
    setMax(votes.reduce((max, vote, i) => {
      return vote > votes[max] ? i : max
    }, 0));
  }, [votes])
  
  const upvote = () => {
    setVotes(votes.map((vote, index) => index === selected ? vote + 1 : vote));
  }

  const randomInd = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} upvote={upvote}/><br/>
      <button onClick={() => setSelected(randomInd)}>next anecdote</button>
      {votes[max] > 0 && 
        <div>
          <h2>Anecdotes with most votes</h2>
          <Anecdote text={anecdotes[max]} votes={votes[max]}/>
        </div>
      }
    </div>
  );
}

export default App;