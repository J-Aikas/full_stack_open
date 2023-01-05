const CountryList = ({ filteredCountries, setFilterString }) => {
    const handleClick = (e) => {
      const id = e.target.parentNode.getAttribute('id')
      setFilterString(id)
    }
  
    return (
      <div>
        {filteredCountries.map(country => 
          <div key={country.name.common} id={country.name.common}>
            {country.name.common}
            <button onClick={handleClick}>show</button>
          </div>)}
      </div>
    )
  }

  export default CountryList