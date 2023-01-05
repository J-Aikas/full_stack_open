import Person from "./Person"

const Persons = ({ persons, newSearch, handleDelete }) => {
    return (
      <div>
        {persons
          .filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
          .map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />)}
      </div>
    )
  }

  export default Persons