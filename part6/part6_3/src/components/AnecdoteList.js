import React from 'react'
import {connect} from 'react-redux'
import { vote } from '../reducers/anecdote'
import { displayNotification } from '../reducers/notification'
const AnecdoteList = ({ anecdotes, filter, voteAnecdote, displayNotification }) => {
  const vote = async (id) => {
    const foundAnec = anecdotes.find(anec => anec.id === id)
    const cloneAnec = {...foundAnec}
    cloneAnec.votes = cloneAnec.votes + 1
    voteAnecdote(id, cloneAnec)
    displayNotification(`you voted '${foundAnec ? foundAnec.content : ''}'`, 5)
  }

  return anecdotes.filter(item => item.content.toLowerCase().includes(filter.filter.toLowerCase()))
  .map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

const mapStateToProps = state => ({
  anecdotes: state.anecdote,
  filter: state.filter
})

const mapDispatchToProps = dispatch => ({
  voteAnecdote: (id, data) => dispatch(vote(id, data)),
  displayNotification: (message, timeout) => dispatch(displayNotification(message, timeout)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)