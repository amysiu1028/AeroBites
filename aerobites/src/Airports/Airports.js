import React from 'react';
import './Airports.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Airports({ airports }) {
    // directs to page just like a link
    const navigate = useNavigate();
    const handleDropdownChange = (event) => {
        const selectedName = event.target.value;
        navigate(`/${encodeURIComponent(selectedName)}`);
    };

    return (
        <div className='airports-container'>
            <Link to="/favorites">Show Favorites</Link>
            <div className='airports-dropdown'>
                <select className='airports-select' onChange={handleDropdownChange} defaultValue="">
                    <option value="" disabled>Select an Airport</option>
                    {airports.map((airport, index) => (
                        <option id={airport.name} key={index} value={airport.name}>{airport.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

