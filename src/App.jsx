/** @format */
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      if (response?.data && Array.isArray(response.data)) {
        setCountries(response.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error.message);
      setError("Failed to load countries. Please try again later.");
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <div className="error-message">{error}</div>}

      {isLoading && <div className="loading">Loading countries...</div>}

      {!isLoading && !error && filteredCountries.length === 0 && (
        <div className="no-results">
          {search ? "No countries match your search" : "No countries available"}
        </div>
      )}

      {!isLoading && !error && filteredCountries.length > 0 && (
        <div className="country-grid">
          {filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="flag"
              />
              <p className="countryName">{country.name.common}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;