import './FavoritedAirports.css';
import React from 'react';
import PropTypes from 'prop-types';
import AirportCard from '../AirportCard/AirportCard';
import lottie from "lottie-web";
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
                    //just the favorite airports
const FavoriteAirports = ({ getFavoriteAirports, toggleFavorite }) => {


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

    const favoriteAirports = getFavoriteAirports();

    return (
        <div className="favorites">
            <h2>Favorited Airports</h2>
            <div className='favorites-container'>
            {favoriteAirports.length > 0 ? (
                favoriteAirports.map(airport => (
                    <AirportCard key={airport.name} airport={airport} toggleFavorite={toggleFavorite} />
                ))
            ) : (
                <p>No favorites yet</p>
            )}
        </div>
       <div ref={container} id="animation-container">
            </div>
        </div>
    );
};


FavoriteAirports.propTypes = {
    getFavoriteAirports: PropTypes.func.isRequired, 
    toggleFavorite: PropTypes.func.isRequired       
};


export default FavoriteAirports;