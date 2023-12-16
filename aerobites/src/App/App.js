import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Airports from '../Airports/Airports';
import AirportDetail from '../AirportDetails/AirportDetail';
import FavoritedAirports from '../FavoritedAirports/FavoritedAirports';
import NotFound from '../NotFound/NotFound';

  function App() {
    const [airports, setAirports] = useState([]);

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
                <Link to='/'><p>AeroBites</p></Link>
                </header>
                <Link to="/favorites">Show Favorites</Link>
                <Routes>
                    <Route path="/" element={<Airports airports={airports} />} />
                    <Route path="/:airportName" element={<AirportDetail airports={airports} toggleFavorite={toggleFavorite} />} />
                    <Route path="/favorites" element={<FavoritedAirports airports={getFavoriteAirports()} toggleFavorite={toggleFavorite} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
    );
}

export default App;