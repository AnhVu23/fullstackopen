import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

import type from './actionType'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: type.GOOD
    })
  }

  const neutral = () => {
    store.dispatch({
      type: type.OK
    })
  }
  const bad = () => {
    store.dispatch({
      type: type.BAD
    })
  }

  const reset = () => {
    store.dispatch({
      type: type.ZERO
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
