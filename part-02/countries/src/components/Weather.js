import { useState, useEffect } from "react";
import axios from 'axios';

const Weather = ({ city, lat, lng }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => setWeather(res.data))
  }, [lat, lng])

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>temp {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
      <p>wind {weather.wind?.speed} m/s</p>
    </div>
  )
}

export default Weather