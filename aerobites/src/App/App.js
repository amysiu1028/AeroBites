

import { useState, useEffect, } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Airports from '../Airports/Airports';
import AirportDetail from '../AirportDetails/AirportDetail';
import FavoritedAirports from '../FavoritedAirports/FavoritedAirports';
import NotFound from '../NotFound/NotFound';
import { getAirports, getTerminals, getBusinesses } from '../ApiCalls/ApiCalls'

export default function App() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("")


  useEffect(() => {
    getAirports()
      .then(data => {
        setAirports(data)
        // console.log(airports)
      })
      .catch(error => {
      setError(error.message);
      })
  },[])

  const toggleFavorite = (name) => {
      const updatedAirports = airports.map(airport => {
          if (airport.name === name) {
              return { ...airport, isFavorite: !airport.isFavorite };
          }
          return airport;
      });
      setAirports(updatedAirports);   
  };

  const getFavoriteAirports = () => {
      return airports.filter(airport => airport.isFavorite);
  };

  return (
    <main className='App'>
        <header className='app-header'>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>AeroBites</Link>
        </header>
        <Routes>
            <Route path="/" element={<Airports airports={airports} />} 
            />
            <Route path="/:Id" element={<AirportDetail airports={airports} toggleFavorite={toggleFavorite} />} />
            <Route path="/favorites" element={<FavoritedAirports getFavoriteAirports={getFavoriteAirports} toggleFavorite={toggleFavorite} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        {error && <h2 className='error-message'>Something happened with getting the airports.</h2> }
    </main>
  );
}

