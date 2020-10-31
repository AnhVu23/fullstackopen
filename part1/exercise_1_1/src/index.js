import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({
  course
}) => (
  <h1>{course}</h1>
)

const ContentCourse = ({
  part,
  exercise,
}) => (
  <p>
        {part} {exercise}
  </p>
)
const Content = ({
  content,
}) => {
  return content.map((item, i) => (
    <ContentCourse key={i}
    part={item.part}
    exercise={item.exercise}
    />
  ))
}

const Total = ({total}) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const content = [{
    part: part1,
    exercise: exercises1,
  }, {
    part: part2,
    exercise: exercises2,
  }, {
    part: part3,
    exercise: exercises3,
  }]
  return (
    <div>
      <Header course={course}/>
      <Content content={content}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))