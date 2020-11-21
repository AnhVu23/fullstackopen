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
    <ContentCourse key={item.id}
    part={item.name}
    exercises={item.exercises}
    />
  ))
}

const Total = ({parts}) => {
  const total = parts.reduce((total, item) => {
    return total + item.exercises
  }, 0)
  return <strong>total of {total} exercises</strong>
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
