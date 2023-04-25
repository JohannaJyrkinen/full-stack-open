import { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Numbers from './Components/Numbers'
import Filter from './Components/Filter'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])

  useEffect(()=> {
    console.log('effect')
    axios 
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('erender', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber 
    }
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to your phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log(personObject)
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
      {filteredPersons.map(person => <Numbers key={person.id} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App
