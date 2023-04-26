import { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Numbers from './Components/Numbers'
import Filter from './Components/Filter'
import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])

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
    })
    } else {
      console.log('Nothing happened')
    }
    

}

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] =useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterchange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={handleFilterchange} />
      <h2>Add a new number</h2>
      <PersonForm addPerson={addPerson} handleChange={handleChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Numbers key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)}/>)}
    </div>
  )
}

export default App
