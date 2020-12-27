import React from 'react'
import {connect} from 'react-redux'
import { createAnecdote } from '../reducers/anecdote'
const AnecdoteForm = ({ createAnecdote }) => {

  const onFormSubmit = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    createAnecdote(content)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  createAnecdote: (content) => dispatch(createAnecdote(content))
})

export default connect(null, mapDispatchToProps)(AnecdoteForm)