import { useState } from 'react'
import axios from 'axios'

const Weather = ({ oneCountry }) => {
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const api_key = process.env.REACT_APP_API_KEY
  const capital = oneCountry.capital[0]
  const countryCode = oneCountry.cca2

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&units=metric&appid=${api_key}`)
    .then(res => {
      setTemp(res.data.main.temp)
      setWind(res.data.wind.speed)
      setImgUrl(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
    })
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>Temperature {temp} &deg;C</div>
      <img src={imgUrl} alt='weather_icon' />
      <div>Wind {wind} m/s</div>
    </div> 
  )
}

export default Weather