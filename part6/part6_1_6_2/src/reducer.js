import type from './actionType'
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case type.GOOD:
      return {...state, good: state.good + 1}
    case type.OK:
      return {...state, ok: state.ok + 1}
    case type.BAD:
      return {...state, bad: state.bad + 1}
    case type.ZERO:
      return initialState
    default:
      return state
  }

}

export default counterReducer
