import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { getTerminals, getBusinesses } from '../ApiCalls/ApiCalls';

export default function AirportDetails({ airports, toggleFavorite }) {
    // get airport name from the URL using useParams
    const preairportId = useParams().Id
    const airportId = parseInt(preairportId)
    // console.log(airportId, 'airportId')
    // const decodedName = decodeURIComponent(airportId);
    const airport = airports.find(a => a.id === airportId);
    const [terminals, setTerminals ] = useState([]);
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // First, fetch terminals data
                const terminalsData = await getTerminals();
                const filteredTerminals = terminalsData.filter(terminal => terminal.airport_id === airportId);
                setTerminals(filteredTerminals);
                // Check if there are terminals to fetch businesses for
                if (filteredTerminals.length > 0) {
                    const businessesData = await getBusinesses();
                    const filteredBusinesses = businessesData.filter(business =>
                        filteredTerminals.find(terminal => terminal.id === business.terminal_id)
                    );
                    setBusinesses(filteredBusinesses);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [airportId]);

    // airport is not found
    if (!airport) {
        return <div>Airport not found</div>;
    }
    // return (
        
    //     <div className='airport-details'>
    //         <Link to="/favorites">Show Favorites</Link>
    //         <h2>{airport.name}</h2>
    //         {/* toggle favorite status */}
    //         <button onClick={() => toggleFavorite(airport.name)}>
    //             {airport.isFavorite ? 'Favorite ❤️' : 'Favorite 🤍'}
    //         </button>
    //         {/* display terminal and restaurants*/}
    //     {terminals.map(terminal => {
    //         // get the terminal name
    //         return (
    //             <div>
    //                 <h3>{terminal.terminalName}</h3>
    //                 {businesses.map(business => {
    //                     if(business.terminal_id === terminal.id){
    //                         return (
    //                             <h4>{business.businessName}</h4>
    //                         )}
    //                 })}
    //             </div>
    //         );
    //     })}
    //     </div>
    // );
    return (
        <div className='airport-details'>
          <Link to="/favorites">Show Favorites</Link>
          <h2>{airport.name}</h2>
          <button onClick={() => toggleFavorite(airport.name)}>
            {airport.isFavorite ? 'Favorite ❤️' : 'Favorite 🤍'}
          </button>
      

          <div className='terminals-container'> {/* to wrap all of the terminals in a container */}
          {terminals.map(terminal => {
            // Filter businesses for the current terminal
            const terminalBusinesses = businesses.filter(business => business.terminal_id === terminal.id);
      
            return (
              <div key={terminal.id} className='terminal'>
                <h3>{terminal.terminalName}</h3>
                <div className='businesses-container'> {/* to wrap all of the businesses */}
                {terminalBusinesses.length > 0 ? (
                  <div className='businesses'>
                    {terminalBusinesses.map(business => (
                      <p key={business.id}>{business.businessName}</p>
                    ))}
                  </div>
                ) : (
                  <p>No businesses listed for this terminal.</p>
                )}
                </div>
              </div>
            );
          })}
            </div>
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
    