

import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Airports from '../Airports/Airports';
import AirportDetail from '../AirportDetails/AirportDetail';
import FavoritedAirports from '../FavoritedAirports/FavoritedAirports';
import NotFound from '../NotFound/NotFound';
// import getAirports from '../ApiCalls/ApiCalls

export default function App() {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => {
        if(!response.ok) {
            // throw new Error (`${error}: Failed to fetch data`)
            console.log('error')
        }
        return response.json();
    })
      .then(data => {
        setAirports(data)
        console.log(airports)
      })
      .catch(error => {
      console.log(error);
      })
  },[])

  // name is passed from AirportCard and AirportDetails when toggleFavorite is clicked
  const toggleFavorite = (name) => {
      const updatedAirports = airports.map(airport => {
          if (airport.name === name) {
              return { ...airport, isFavorite: !airport.isFavorite };
          }
          return airport;
      });
      setAirports(updatedAirports);   
  };

  // filter favorite airports so you just have an array of favorites
  const getFavoriteAirports = () => {
      return airports.filter(airport => airport.isFavorite);
  };

  return (
    <main className='App'>
        <header>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>AeroBites</Link>
        </header>
        <Routes>
            <Route path="/" element={<Airports airports={airports} />} />
            <Route path="/:airportName" element={<AirportDetail airports={airports} toggleFavorite={toggleFavorite} />} />
            <Route path="/favorites" element={<FavoritedAirports getFavoriteAirports={getFavoriteAirports} toggleFavorite={toggleFavorite} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
  );
}

