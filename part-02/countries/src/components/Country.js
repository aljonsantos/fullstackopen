import { useState, useEffect } from "react";
import axios from 'axios';

import Weather from './Weather';

const Country = ({ name }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(res => setCountry(res.data))
  }, [name])

  if (!country) {
    return null;
  }

  return (
    <div>
      <h2>{country.name?.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages: </h3>
      <ul>
        {Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt="country flag" />
      <Weather city={country.capital} lat={country.latlng[0]} lng={country.latlng[1]} />
    </div>
  )
}

export default Country;