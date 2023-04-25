const Header = ({ name }) => <h1>{name}</h1>


const Content = ({ parts }) => {
    
    return <>{parts.map(part => <Part key={part.id} part={part}/> )}</>  
}  

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return <b>Total of {total} exercises</b>;
}


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({course}) => {
  
  return(
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

export default Course;