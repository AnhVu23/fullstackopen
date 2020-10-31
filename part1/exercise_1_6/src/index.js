import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}

const Statistic = ({
  text,
  value,
}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({
  good,
  neutral,
  bad
}) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad ) / total
  const positive = total === 0 ? 0 : good / total * 100
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
    <h2>statistics</h2>
    <table>
      <tbody>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='all' value={total}/>
        <Statistic text='average' value={average}/>
        <Statistic text='positive' value={`${positive}%`}/>
      </tbody>
    </table>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <div className='button-groups'>
        <Button text='good' onClick={() => setGood(good + 1)}/>
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
        <Button text='bad' onClick={() => setBad(bad + 1)}/>
      </div>
      
      <Statistics good={good}
                  neutral={neutral}
                  bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)