import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {vote, createAnecdote, getAnecdotes} from './reducers/anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { displayNotification, removeNotification } from './reducers/notification'
import { updateFilter } from './reducers/filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnecdotes())
  }, [])

  const voteAnecdote = (id) => {
    dispatch(vote(id))
    const foundAnec = anecdotes.find(anec => anec.id === id)
    dispatch(displayNotification(`you voted '${foundAnec ? foundAnec.content : ''}'`))
    setTimeout(() => dispatch(removeNotification()), 2000)
  }

  const onFormSubmit = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  const onFilterChange = (value) => {
    dispatch(updateFilter(value))
  }

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter filter={filter} onFilterChange={onFilterChange}/>
      <AnecdoteList anecdotes={anecdotes.filter(item => item.content.toLowerCase().includes(filter.filter.toLowerCase()))} voteAnecdote={voteAnecdote}/>
      <AnecdoteForm onFormSubmit={onFormSubmit}/>
    </div>
  )
}

export default App