import './Airports.css';
import { useEffect } from 'react';

export default function Airports() {
    //hold our drop down menu mapping over sampleData
    //displaying airport.name
    return (
        <div>
            <h1>all airports in dropdown</h1>
            <p>LOGO</p> 
            {/* We can movLOGO depending on where we want to display */}
            <button>Favorites</button>
        </div>
    )
}

// Airports = Home page 
//Airport Card = favorited airports that will be on favorited airports component
// FavoritedAirports = a page that shows airport cards that are favorited
// Airport Details = single airport 