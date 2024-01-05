import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AirportCard.css';

export default  function AirportCard({ airport, toggleFavorite }) {
    //  a card with airport details and favorite toggle button
    return (
        <div className='airport-card'>
            <button onClick={() => toggleFavorite(airport.name)}>
                {airport.isFavorite ? 'Unfavorite ❤️' : 'Favorite 🤍'}
            </button>
            <div>
                <Link to={`/${encodeURIComponent(airport.id)}`}>
                <h3 className='favoritedairport-link'>{airport.name}</h3>
                </Link>
            </div>
        </div>
    );
}


AirportCard.propTypes = {
    airport: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        isFavorite: PropTypes.bool.isRequired
      }).isRequired,
      toggleFavorite: PropTypes.func.isRequired
  };

