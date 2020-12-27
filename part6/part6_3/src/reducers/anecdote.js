import anecdoteService from '../services/anecdote'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const vote = (id) => ({
  type: 'VOTE',
  payload: {
    id,
  }
})

const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      payload: {
        newAnec
      }
    })
  }
}

const getAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'GET_ANECDOTES',
      payload: {
        data
      }
    })
  }
}

const initialState = anecdotesAtStart.map(asObject).sort((nextAnec, prevAnect) => prevAnect.votes - nextAnec.votes)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const foundAnecdoteIndex = state.findIndex(anecdote => anecdote.id === action.payload.id)
      const cloneAnec = {...state[foundAnecdoteIndex]}
      cloneAnec.votes = cloneAnec.votes + 1
      const cloneArray = [...state]
      cloneArray.splice(foundAnecdoteIndex, 1, cloneAnec)
      return cloneArray.sort((nextAnec, prevAnect) => prevAnect.votes - nextAnec.votes)
    case 'CREATE':
      return state.concat([action.payload.newAnec]).sort((nextAnec, prevAnect) => prevAnect.votes - nextAnec.votes)
    case 'GET_ANECDOTES':
      return action.payload.data
    default:
      return state
  }
}

export default reducer

export {
  vote,
  createAnecdote,
  getAnecdotes,
}