import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {vote, createAnecdote} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    dispatch(vote(id))
  }

  const onFormSubmit = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} voteAnecdote={voteAnecdote}/>
      <AnecdoteForm onFormSubmit={onFormSubmit}/>
    </div>
  )
}

export default App