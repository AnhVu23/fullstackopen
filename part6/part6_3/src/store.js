import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdote'
import notificationReducer from './reducers/notification'
import filterReducer from './reducers/filter'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store