import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';

export default function AirportDetails({ airports, toggleFavorite }) {
    // get airport name from the URL using useParams
    const { airportName } = useParams();
    const decodedName = decodeURIComponent(airportName);
    const airport = airports.find(a => a.name === decodedName);

    // airport is not found
    if (!airport) {
        return <div>Airport not found</div>;
    }

    return (
        <div className='airport-details'>
            <Link to="/favorites">Show Favorites</Link>
            <h2>{airport.name}</h2>
            {/* toggle favorite status */}
            <button onClick={() => toggleFavorite(airport.name)}>
                {airport.isFavorite ? 'Favorite ❤️' : 'Favorite 🤍'}
            </button>
            {/* display terminal and restaurants*/}
            {airport.terminals.map((terminal) => {
                // get the terminal name
                const terminalName = Object.keys(terminal)[0];
                return (
                    <div>
                        <h3>{terminalName}</h3>
                        <ul>
                            {/* map over the restaurants in each terminal */}
                            {terminal[terminalName].map((restaurant, index) => (
                                // need to create unique keys at some point
                                <li id={terminalName} key={terminalName}>{restaurant}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}


AirportDetails.propTypes = {
    airports: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            isFavorite: PropTypes.bool.isRequired,
            terminals: PropTypes.arrayOf(
                PropTypes.object
            ) 
        })
    ).isRequired,
    toggleFavorite: PropTypes.func.isRequired
};