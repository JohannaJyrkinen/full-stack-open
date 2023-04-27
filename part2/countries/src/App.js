import countryService from './Countries'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] =useState([])
  const [filter, setFilter] =useState('')
  const [selected, setSelected] = useState(null)
  const [showCountry, setShowCountry] = useState(false);

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries =>{
        setCountries(initialCountries)
        console.log(initialCountries)
      })
  }, [])

  const handleFilterchange = (event) => {
    setFilter(event.target.value)
    setShowCountry(false)
  }

  const filteredCountries = countries.filter((country) => 
  country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
  
  const handleClick = (country) => {
    setSelected(country);
    setShowCountry(true);
    console.log(country)
  }

  return (
    <div className="App">
      <Filter filter={handleFilterchange}/>
      {filteredCountries.length >10 && <p>Too many matches, specify another filter</p>}
      {filteredCountries.length >1 && filteredCountries.length <= 10 && (
      filteredCountries.map((country, index) => (
        <p key={index}>{country.name.common} <button onClick={() => handleClick(country)}>show</button></p>
      ))
      )}
      {filteredCountries.length === 1 && (
        filteredCountries.map((country, index) => (
          <Country key={index} country={country}/>
        ))
      )}
      {showCountry && <Country country={selected}/>}
    </div>
  );
}

export default App;
