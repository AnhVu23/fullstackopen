import React, { useState, useEffect } from "react"
import axios from "axios"
const CountryItem = ({ country }) => {
  const [showDetail, setShowDetail] = useState(false)
  return (
    <React.Fragment key={country.id}>
      <div>
        <span>{country.name}</span>
        <button onClick={() => setShowDetail((prevState) => !prevState)}>
          <span>show</span>
        </button>
      </div>
      {showDetail ? <div>
        <CountryDetailItem country={country} />
      </div> : null}
    </React.Fragment>
  )
}

const CountryDetailItem = ({ country }) => (
  <div key={country.id}>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map((lang) => (
        <li>{lang.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={"national flag"} width={200} height={200} />
  </div>
)
const CountryList = ({ countries, search }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length === 1) {
    return <CountryDetailItem country={filteredCountries[0]} />
  }
  return filteredCountries.map((country) => <CountryItem country={country} />)
}

const Search = ({ search, onSearchChange }) => (
  <div>
    find countries <input value={search} onChange={onSearchChange} />
  </div>
)
function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        console.log(res)
        setCountries(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
  return (
    <div className="App">
      <Search
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      />
      <CountryList countries={countries} search={search} />
    </div>
  )
}

export default App
