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

  export default Course