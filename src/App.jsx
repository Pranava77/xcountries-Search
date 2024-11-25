import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    fetchCountries();
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])


  const fetchCountries = async () => {
    try{
      const response = await fetch('https://restcountries.com/v3.1/all')
      const data = await response.json()
      setCountries(data)
      console.log(data, 'data');  
    } catch(error) {
      console.log(error, 'error')
    }
  };

  const filteredCountires = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(debouncedSearch.toLowerCase())
  })


  return (
    <>
      <div>

        <input 
          type="text"
          value={search}
          placeholder='Search for Countries'
          className='searchInput'
          onChange={(e) => setSearch(e.target.value)}
          />

        <div className='grid'>
          {filteredCountires.map((country) => (
            <div className="countryCard" key={country.cca3}>
              <img 
                className='countryFlag' 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
              />
              <p className="countryName">{country.name.common}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
