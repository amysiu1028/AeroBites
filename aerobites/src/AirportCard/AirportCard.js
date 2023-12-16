// import './AirportCard.css'

// export default function AirportCard() {
//     return (
//         <div>
//             <h1>Denver Airport</h1>
//             <p>Image of airport</p>
//             <button>Back</button>
//         </div>
//     )
// }


import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


                    //components passed from FavoriteAirports
function AirportCard({ airport, toggleFavorite }) {
    //  a card with airport details and favorite toggle button
    return (
        <div className='airport-card'>
            <button onClick={() => toggleFavorite(airport.name)}>
                {airport.isFavorite ? 'Unfavorite ❤️' : 'Favorite 🤍'}
            </button>
            <div>
                <Link to={`/${encodeURIComponent(airport.name)}`}>
                    <img src={airport.img_path} alt={airport.name} style={{ width: '100px', height: 'auto' }} />
                </Link>
                <h3>{airport.name}</h3>
            </div>
        </div>
    );
}

export default AirportCard;