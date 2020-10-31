import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({
  course
}) => (
  <h1>{course}</h1>
)

const ContentCourse = ({
  part,
  exercises,
}) => (
  <p>
        {part} {exercises}
  </p>
)
const Content = ({
  content,
}) => {
  return content.map((item, i) => (
    <ContentCourse key={i}
    part={item.name}
    exercises={item.exercises}
    />
  ))
}

const Total = ({parts}) => {
  const total = parts.reduce((total, item) => {
    return total + item.exercises
  }, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    }, {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))