const Header = (props) => {
  return (
    <div>
      {props.course}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      Total number of excercises: {props.parts[0].exercises +props.parts[1].exercises+props.parts[2].exercises}
    </div>
  )
}

const Part = (props) => {
  return (
  <div> 
  {props.name}: {props.number}
  </div>
  )
}

const Content = (props) => {
  return (
    <div>
    <Part name={props.parts[0].name} number={props.parts[0].exercises}/> 
    <Part name={props.parts[1].name} number={props.parts[1].exercises}/>
    <Part name={props.parts[2].name} number={props.parts[2].exercises}/> 
    </div>
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
      },
  ]
}
  return (
    <div>
      <Header course={course.name} />
      <br/>
      <Content parts={course.parts} />
      <br/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
