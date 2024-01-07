import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import lottie from "lottie-web";
import { getTerminals, getBusinesses } from '../ApiCalls/ApiCalls';
import "./AirportDetail.css"

export default function AirportDetails({ airports, toggleFavorite }) {
    const preairportId = useParams().Id
    const airportId = parseInt(preairportId)
    const airport = airports.find(a => a.id === airportId);
    const [terminals, setTerminals ] = useState([]);
    const [businesses, setBusinesses] = useState([]);

    const container = useRef(null); 
    useEffect(() => {
        lottie.loadAnimation({
            animationData: require('../airplane.json'),
            autoplay: true,
            container: container.current,
            loop: true,
            renderer: 'svg'
        })
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const terminalsData = await getTerminals();
                const filteredTerminals = terminalsData.filter(terminal => terminal.airport_id === airportId);
                setTerminals(filteredTerminals);
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

    if (!airport) {
        return <div>Airport not found</div>;
    }
   
    return (
        <div className='airport-details'>
          <Link to="/favorites" className="show-favorites-link">Show Favorites</Link>
          <h2>{airport.name}</h2>
          <button className='favorite-button' onClick={() => toggleFavorite(airport.name)}>
            {airport.isFavorite ? 'Favorite ❤️' : 'Favorite 🤍'}
          </button>
          <div className='terminals-container'> 
          {terminals.map(terminal => {
            const terminalBusinesses = businesses.filter(business => business.terminal_id === terminal.id);
      
            return (
              <div key={terminal.id} className='terminal'>
                <h3>{terminal.terminalName}</h3>
                <div className='businesses-container'> 
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
            <div ref={container} id="animation-container">
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
    