import React from 'react';
import { useNavigate } from 'react-router-dom';
import getAirports from '../ApiCalls/ApiCalls';


function Airports({ airports }) {
    

    // directs to page just like a link
    const navigate = useNavigate();

    const handleDropdownChange = (event) => {
        const selectedName = event.target.value;
        navigate(`/${encodeURIComponent(selectedName)}`);
    };

    return (
        <div className='airports-dropdown'>
            <select onChange={handleDropdownChange} defaultValue="">
                <option value="" disabled>Select an Airport</option>
                {airports.map((airport) => (
                    <option key={airport.name} value={airport.name}>{airport.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Airports;
