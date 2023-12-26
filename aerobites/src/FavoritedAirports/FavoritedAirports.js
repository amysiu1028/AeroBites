
import React from 'react';
import PropTypes from 'prop-types';
import AirportCard from '../AirportCard/AirportCard';
import { Link } from 'react-router-dom';
                    //just the favorite airports
const FavoriteAirports = ({ getFavoriteAirports, toggleFavorite }) => {

    const favoriteAirports = getFavoriteAirports();

    return (
        <div className="favorites">
            <h2>Favorited Airports</h2>
            {favoriteAirports.length > 0 ? (
                favoriteAirports.map(airport => (
                    <AirportCard key={airport.name} airport={airport} toggleFavorite={toggleFavorite} />
                ))
            ) : (
                <p>No favorites yet</p>
            )}
        </div>
    );
};


FavoriteAirports.propTypes = {
    getFavoriteAirports: PropTypes.func.isRequired, 
    toggleFavorite: PropTypes.func.isRequired       
};


export default FavoriteAirports;