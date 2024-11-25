import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <input 
          type="text"
          placeholder='Search for Countries'
          className='searchInput'
          onChange={(e) => console.log(e.target.value)}
          />
        <div className='grid'>
            <div className="countryCard">
              <img className='countryFlag' src="https://flagcdn.com/w320/ae.png" alt="" />
              <p className="countryName">United Arab Emirates</p>
            </div>
            <div className="countryCard">
              <img className='countryFlag' src="https://flagcdn.com/w320/ae.png" alt="" />
              <p className="countryName">United Arab Emirates</p>
            </div>
            <div className="countryCard">
              <img className='countryFlag' src="https://flagcdn.com/w320/ae.png" alt="" />
              <p className="countryName">United Arab Emirates</p>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
