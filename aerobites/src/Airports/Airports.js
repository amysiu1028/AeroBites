// import './Airports.css';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Airports() {
//     const [selectedOption, setSelectedOption] = useState('');
//     const airport = "Denver";
//     const airport2 = 'Seattle';
//     //hold our drop down menu mapping over sampleData
//     //displaying airport.name
//     const handleSelectChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     return (
//         <div>
//             <label htmlFor='AirportDropdown'>Select an Airport:</label>
//             <select id='AirportDropdown' value={ selectedOption } onChange={ handleSelectChange }>
//                 <option value=''>--------</option>
//                 <option value={ airport }>{ airport }</option>
//                 <option value={ airport2 }>{ airport2 }</option>
//             </select>
//             <Link to={`/${selectedOption}`}><button>here</button></Link>
//             <p>LOGO</p> 
//             {/* We can movLOGO depending on where we want to display */}
//             <Link to='/favorites' ><button>Favorites</button></Link>
//         </div>
//     )
// }

// Airports = Home page 
//Airport Card = favorited airports that will be on favorited airports component
// FavoritedAirports = a page that shows airport cards that are favorited
// Airport Details = single airport 



import React from 'react';
import { useNavigate } from 'react-router-dom';

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
                    <option value={airport.name}>{airport.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Airports;
