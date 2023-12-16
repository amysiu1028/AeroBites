// import './AirportDetail.css';
// import { useParams } from 'react-router-dom';

// export default function AirportDetail() {
//     const airport = useParams().Airport;

//     return (
//         <div>
//             <h1>{ airport }</h1>
//         </div>
//     )
// }




import React from 'react';
import { useParams, Link } from 'react-router-dom';

function AirportDetails({ airports, toggleFavorite }) {
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
            
            <h2>{airport.name}</h2>
            {/* toggle favorite status */}
            <button onClick={() => toggleFavorite(airport.name)}>
                {airport.isFavorite ? 'Unfavorite ❤️' : 'Favorite 🤍'}
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
                            {terminal[terminalName].map((restaurant) => (
                                <li>{restaurant}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default AirportDetails;
