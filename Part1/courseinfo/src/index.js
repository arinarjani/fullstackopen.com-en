import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({content}) => {
  return (
    <div>
      <Part part={content[0].name} exercise={content[0].exercises} />
      <Part part={content[1].name} exercise={content[1].exercises} />
      <Part part={content[2].name} exercise={content[2].exercises} />
    </div>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Total = ({total}) => {
  let sum = 0;
  for (let i = 0; i < total.length; i++) {
    sum += total[i].exercises;
  }

  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
