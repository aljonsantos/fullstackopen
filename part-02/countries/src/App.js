import { useState, useEffect } from "react";
import axios from 'axios';

import CountryList from "./components/CountryList";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [matchedCountries, setMatchedCountries] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountries(res.data.map(data => data.name.common.toLowerCase()))
      })
  }, [])

  const handleChange = (e) => {
    const searchVal = e.target.value;
    setValue(searchVal);
    if (searchVal === '') {
      setMatchedCountries([]);
      return;
    }
    setMatchedCountries(countries.filter(c => c.includes(searchVal.toLowerCase())));
  }

  let content = null;
  if (matchedCountries.length === 1) {
    content = <Country name={matchedCountries[0]} />
  } else if (matchedCountries.length <= 10) {
    content = <CountryList countries={matchedCountries} setMatchedCountries={setMatchedCountries}/>
  } else if (matchedCountries.length > 10){
    content = 'Too many matches...'
  }


  return (
    <div>
      <div>
        find countries: <input type="text" value={value} onChange={handleChange}/>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default App;
