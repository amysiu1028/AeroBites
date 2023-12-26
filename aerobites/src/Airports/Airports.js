import { useEffect, useRef } from 'react';
import './Airports.css';
import lottie from "lottie-web";
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
// import airplane from './airplane.json'

export default function Airports({ airports }) {
    // directs to page just like a link
    const navigate = useNavigate();
    const handleDropdownChange = (event) => {
        const selectedName = event.target.value;
        navigate(`/${encodeURIComponent(selectedName)}`);
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
            <Link to="/favorites" id='show-favorites'>
                <button style={{ width: '40%', height: '50px', borderRadius: '30px' }}>Show Favorites</button>
            </Link>
            <div className='airports-dropdown'>
                <select style={{ width: '15vw', height: '50px', borderRadius: '10px' }} className='airports-select' onChange={handleDropdownChange} defaultValue="">
                    <option value="" disabled>Select an Airport</option>
                    {airports.map((airport, index) => (
                        <option id={airport.name} key={index} value={airport.name}>{airport.name}</option>
                    ))}
                </select>
            </div>
            <div ref={container} id="animation-container">
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
  