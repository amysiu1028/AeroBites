import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { getTerminals, getBusinesses } from '../ApiCalls/ApiCalls';

export default function AirportDetails({ airports, toggleFavorite }) {
    // get airport name from the URL using useParams
    const { airportIdString } = useParams()
    const preairportId = useParams().Id
    const airportId = parseInt(preairportId)
    console.log(airportId, 'airportId')
    // const decodedName = decodeURIComponent(airportId);
    const airport = airports.find(a => a.airport_id === airportIdString);
    const [terminals, setTerminals ] = useState([]);

    
    useEffect(() => {
        getTerminals()
        .then(data => {
            // console.log(data)
            setTerminals(data.filter(terminal => {
                // console.log(terminal, 'terminal')
                // console.log(terminal.airport_id)
               return  terminal.airport_id === airportId}
                ))
                getBusinesses()
                // console.log(terminals, 'outside useeffect')
                // console.log(airports)
            })
            .catch(error => {
                // console.log(error);
            })
        },[])
    
    // airport is not found
    if (!airport) {
        { console.log(terminals, 'terminals in return statement') }
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
        {terminals.map(terminal => {
            // get the terminal name
            return (
                <div>
                    <h3>{terminal.terminalName}</h3>
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
    