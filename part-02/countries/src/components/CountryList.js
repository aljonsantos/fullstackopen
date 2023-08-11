const CountryList = ({ countries, setMatchedCountries })=> {
  return (
    <div>
      {countries
        .map((name, i) => 
        <div key={i}>
          {name}
          <button onClick={() => setMatchedCountries([name])}>show</button>
        </div>
      )}
    </div>
  )
}

export default CountryList;