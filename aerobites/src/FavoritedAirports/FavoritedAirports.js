// // import './FavoritedAirports.css';
// import AirportCard from '../AirportCard/AirportCard';

// export default function FavoritedAirports() {
//     return (
//         <div>
//             <h1>Favorite Airport car</h1>
//             {/* Our airport card components will go here   */}
//             <AirportCard />
//         </div>
//     )
// }



import React from 'react';
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

export default FavoriteAirports;