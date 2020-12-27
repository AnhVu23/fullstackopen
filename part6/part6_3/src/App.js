import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {vote, createAnecdote} from './reducers/anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { displayNotification, removeNotification } from './reducers/notification'

const App = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    dispatch(vote(id))
    const foundAnec = anecdotes.find(anec => anec.id === id)
    dispatch(displayNotification(`you voted '${foundAnec ? foundAnec.content : ''}'`))
    setTimeout(() => dispatch(removeNotification()), 2000)
  }

  const onFormSubmit = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} voteAnecdote={voteAnecdote}/>
      <AnecdoteForm onFormSubmit={onFormSubmit}/>
    </div>
  )
}

export default App