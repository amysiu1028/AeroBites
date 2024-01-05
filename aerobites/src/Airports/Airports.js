import { useEffect, useRef } from 'react';
import './Airports.css';
import lottie from "lottie-web";
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';

export default function Airports({ airports }) {
    // directs to page just like a link
    const navigate = useNavigate();
    const handleDropdownChange = (event) => {
        const selectedId = event.target.value;
        navigate(`/${(selectedId)}`);
    };
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

    return (
        <div className='airports-container'>
            <div className='controls-container'>
            <Link to="/favorites" id='show-favorites'>
                <button>Show Favorites</button>
            </Link>
            <div className='airports-dropdown'>
                <select className='airports-select' onChange={handleDropdownChange} defaultValue="">
                    <option value="" disabled>Select an Airport</option>
                    {airports.map((airport, index) => (
                        <option id={airport.id} key={index} value={airport.id}>{airport.name}</option>
                    ))}
                </select>
            </div>
            <div ref={container} id="animation-container"></div>
            </div>  
        </div>
    );
}


Airports.propTypes = {
    airports: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired
  }
  