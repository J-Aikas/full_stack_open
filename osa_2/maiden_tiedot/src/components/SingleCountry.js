import Weather from './Weather'

const SingleCountry = ({ oneCountry }) => {
    const name = oneCountry.name.common
    const capital = oneCountry.capital
    const area = oneCountry.area
    const languages = Object.values(oneCountry.languages)
    const flag = Object.values(oneCountry.flags)[0]
  
    return (
      <div>
        <h2>
          {name}
        </h2>
        <div>Capital {capital}</div>
        <div>Area {area}</div>
        <h3>Languages: </h3>
        <ul>
          {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={flag} alt={`flag_of_${name}`} />
        <Weather oneCountry={oneCountry} />
      </div>
    )
  }

  export default SingleCountry