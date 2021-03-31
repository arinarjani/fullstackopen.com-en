import React from 'react';

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
const Total = ({ course }) => {
    const /** number */ sum = course.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
    }, 0)

    return(
        <p><b>Number of exercises {sum}</b></p>
    ) 
}

const Part = ({name, exercises}) => {
    return (
        <p>
        {name} {exercises}
        </p>    
    )
}

const Course = ({courses}) => {
    return (
        <>
        {courses.map(course => 
            <>
                <Header name={course.name} />
                <Content course={course} />
                <Total course={course} />
            </>
        )}
        </>
    )
}

const Content = ({ course }) => {
    return (
        <>
        {course.parts.map(partInfo => 
            <Part key={partInfo.id} name={partInfo.name} exercises={partInfo.exercises} />  
        )}
        </>
    )
}

export default Course