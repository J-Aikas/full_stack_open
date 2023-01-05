const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => <div>{part.name} {part.exercises}</div>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s += p.exercises, 0)
  return (
    <div><strong>Number of exercises {total}</strong></div>
  )
} 

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course