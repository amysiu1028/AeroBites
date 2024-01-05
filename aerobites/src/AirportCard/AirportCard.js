import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AirportCard.css';


                    //components passed from FavoriteAirports
function AirportCard({ airport, toggleFavorite }) {
    //  a card with airport details and favorite toggle button
    return (
        <div className='airport-card'>
            <button onClick={() => toggleFavorite(airport.name)}>
                {airport.isFavorite ? 'Unfavorite ❤️' : 'Favorite 🤍'}
            </button>
            <div>
                <Link to={`/${encodeURIComponent(airport.id)}`}>
                <h3>{airport.name}</h3>
                </Link>
            </div>
        </div>
    );
}


AirportCard.propTypes = {
    airport: PropTypes.shape({
        name: PropTypes.string.isRequired,
        img_path: PropTypes.string.isRequired,  
        isFavorite: PropTypes.bool.isRequired
      }).isRequired,
      toggleFavorite: PropTypes.func.isRequired
  };

export default AirportCard;