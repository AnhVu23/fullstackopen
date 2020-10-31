import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(dot => 0))

  const onNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const onVoteClick = () => {
    const cloneVotes = [...votes]
    cloneVotes[selected] = cloneVotes[selected] + 1
    setVotes(cloneVotes)
  }
  const highestVotes = Math.max(...votes)
  const highestVotePosition = votes.indexOf(highestVotes)
  return (
    <div className='container'>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div className='button-groups'>
        <Button text='vote'
              onClick={onVoteClick}
        />
        <Button text='next anecdote'
              onClick={onNextClick}
        />
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[highestVotePosition]}</p>
      <p>has {highestVotes} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)