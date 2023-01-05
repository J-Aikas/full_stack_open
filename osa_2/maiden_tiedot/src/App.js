import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import SingleCountry from './components/SingleCountry'

const Display = ({ filteredCountries, filterString, setFilterString }) => {
  const len = filteredCountries.length
  const oneCountry = filteredCountries[0]

  if (filterString === '') return
  else if (len > 10) return <div>Too many matches, specify another filter</div>
  else if (len <= 10 && len > 1) {
    return (
    <CountryList 
      filteredCountries={filteredCountries}
      setFilterString={setFilterString}
    />
  )} 
  else if (len === 1) return <SingleCountry oneCountry={oneCountry} />
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])
  
  useEffect(() => {
    const filtered = countries
      .filter(c => c.name.common.toLowerCase()
      .includes(filterString.toLowerCase()))
    setFilteredCountries(filtered)
  }, [filterString, countries])

  const handleChange = (e) => {
    setFilterString(e.target.value)
  }

  return (
    <div>
      Find countries
      <input onChange={handleChange} />
      <Display 
        filteredCountries={filteredCountries} 
        filterString={filterString}
        setFilterString={setFilterString}
      />
    </div>
  );
}

export default App;