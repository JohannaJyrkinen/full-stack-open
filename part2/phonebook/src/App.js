import { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Numbers from './Components/Numbers'
import Filter from './Components/Filter'
import personService from './services/persons'
import Notification from './Components/Notification'
import Error from './Components/ErrorInfo'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=> {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('rendered', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber 
    }
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(existingPerson.id, personObject )
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person: returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Updated ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${newName}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
      }
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log(returnedPerson)
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
  }
  
  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id===id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
      .remove(id) 
      .then(() => {
        setPersons(persons.filter(person =>person.id !== id))
        console.log('removed id', id, 'name: ',personToDelete.name)
        setSuccessMessage(`Deleted ${personToDelete.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
    })
    } else {
      console.log('User canceled')
    }
    

}

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] =useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterchange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Error message={errorMessage}/>
      <Notification message={successMessage}/>
      <Filter filter={handleFilterchange} />
      <h2>Add a new number</h2>
      <PersonForm addPerson={addPerson} handleChange={handleChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Numbers key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)}/>)}
    </div>
  )
}

export default App
