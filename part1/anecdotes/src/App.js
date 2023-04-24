
import './App.css';
import { useState } from 'react'

const Anecdote = ({text, anecdote, votes}) => {
  return (
    <div>
      <h1>{text}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const initialVotes = Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialVotes)
  const [best, setBest] = useState(0)

 

  const handleClick = () => {
    let randomNumber = Math.floor(Math.random() * 7);
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] +=1
    setVotes(copy)
    const max =Math.max(...copy)
    const index = copy.indexOf(max)
    setBest(index)
  }

  return (
    <div>
      <Anecdote text="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <button type="button" onClick={handleVote}>vote</button>
      <button type="button" onClick={handleClick}>next anecdote</button>
      <Anecdote text="Anecdote with most votes" anecdote={anecdotes[best]} votes={votes[best]}/>
    </div>
  )
}

export default App