import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('')

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])


  const filteredCountries = countries.filter((country) => 
    country.name.common.toLowerCase().includes(debouncedSearch.toLowerCase()));


  return (
    <div className="container" data-testid="app-container">
      <input 
        type="text"
        value={search}
        placeholder='Search for Countries'
        className='searchInput'
        onChange={(e) => setSearch(e.target.value)}
        data-testid="search-input"
      />

      <div className='grid' data-testid="countries-grid">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.cca3} data-testid="country-container">
            <img 
              className='countryFlag' 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`}
              data-testid="country-flag"
            />
            <p className="countryName" data-testid="country-name">{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
