import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good - bad ) / total
  const positive = good / total
  return (
    <div>
      <h2>give feedback</h2>
      <div className='button-groups'>
        <Button text='good' onClick={() => setGood(good + 1)}/>
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
        <Button text='bad' onClick={() => setBad(bad + 1)}/>
      </div>
      <h2>statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)