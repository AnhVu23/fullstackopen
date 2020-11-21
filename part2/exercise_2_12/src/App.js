import React, { useState, useEffect } from "react"
import axios from "axios"
const CountryItem = ({ country, getWeatherData }) => {
  const [showDetail, setShowDetail] = useState(false)
  return (
    <React.Fragment>
      <div>
        <span>{country.name}</span>
        <button onClick={() => setShowDetail((prevState) => !prevState)}>
          <span>show</span>
        </button>
      </div>
      {showDetail ? (
        <div>
          <CountryDetailItem
            country={country}
            getWeatherData={getWeatherData}
          />
        </div>
      ) : null}
    </React.Fragment>
  )
}

const CountryDetailItem = ({ country, getWeatherData }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    getWeatherData(country.capital)
      .then((res) => {
        setWeather(res)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={"national flag"} width={200} height={200} />
      {weather ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>
            <strong>temperature:</strong> {weather.temperature} Celsius
          </p>
          <img src={weather.weather_icons} alt="" />
          <p>
            <strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
          </p>
        </div>
      ) : null}
    </div>
  )
}
const CountryList = ({ countries, search, getWeatherData }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length === 1) {
    return (
      <CountryDetailItem
        country={filteredCountries[0]}
        getWeatherData={getWeatherData}
      />
    )
  }
  return filteredCountries.map((country) => (
    <CountryItem
      country={country}
      getWeatherData={getWeatherData}
      key={country.name}
    />
  ))
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
  const getWeatherData = async (cityName) => {
    try {
      const weatherData = await axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${cityName}`
      )
      return weatherData.data.current
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="App">
      <Search
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      />
      <CountryList
        countries={countries}
        search={search}
        getWeatherData={getWeatherData}
      />
    </div>
  )
}

export default App
