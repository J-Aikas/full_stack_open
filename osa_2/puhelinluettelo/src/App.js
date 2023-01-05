import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './modules/Notification'
import TextInput from './modules/TextInput'
import Persons from './modules/Persons'
import Form from './modules/Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(res => setPersons(res.data))
      .catch(err => {
        setSuccess(false)
        setMessage('Failed to load resource.')
        clearMessage()
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value)
  }

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (persons.find(p => p.name === newName)) {
      if(window.confirm(`${person.name} is already included in the phone book. Replace the number with a new one?`)) {
        const id = persons.find(p => p.name === newName).id
        personService.update(id, person)
          .then(res => {
            setPersons(persons.map(p => p.id !== id ? p : res.data))
            setSuccess(true)
            setMessage('Number updated succesfully!')
            clearMessage()
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            setSuccess(false)
            setMessage('An error occured! Failed to update number.')
            clearMessage()
          })
      }
      return
    }
    personService.create(person)
      .then(res => {
        setPersons(persons.concat(res.data))
        setSuccess(true)
        setMessage(`${person.name} added succesfully!`)
        clearMessage()
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        setSuccess(false)
        setMessage('An error occured! Failed to add person.')
        clearMessage()
      })
  }

  const handleDelete = (person) => {
    const name = person.name
    const id = person.id
    if(window.confirm(`Do you want to delete ${name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccess(true)
          setMessage(`${name} deleted succesfully!`)
          clearMessage()
        })
        .catch(err => {
          setSuccess(false)
          setMessage('An error occured! Failed to delete person.')
          clearMessage()
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} success={success} />

      <TextInput
        text='filter results: '
        value={newSearch}
        onChange={handleSearchChange}
      />

      <h2>Add new contact</h2>

      <Form 
        nameValue={newName}
        nameOnChange={handleNameChange} 
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
        onClick={handleSubmit} 
      />

      <h2>Numbers</h2>

      <Persons 
        persons={persons}
        newSearch={newSearch}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App