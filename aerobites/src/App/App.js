// import './App.css';
// import Airports from '../Airports/Airports';
// import { Link, Routes, Route } from 'react-router-dom';
// import FavoritedAirports from '../FavoritedAirports/FavoritedAirports';
// import AirportDetail from '../AirportDetails/AirportDetail';

// function App() {
//   return (
//     <div className="App">
//       <header>
//         <Link to='/'><p>AeroBites</p></Link>
//       </header>
//       {/* We can treat the header as a back to home button */}
//       <Routes>
//         <Route path='/' element={<Airports />}/>
//         <Route path='/favorites' element={<FavoritedAirports />}/>
//         <Route path='/:Airport' element={<AirportDetail />}/>
//       </Routes>
//     </div>
//   );
// }

// export default App;

//Argue home button versus link in header that acts as back to oback to home button



import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Airports from '../Airports/Airports';
import AirportDetails from '../AirportDetail/AirportDetail';
import FavoriteAirports from '../FavoriteAirports/FavoriteAirports';
import NotFound from '../NotFound/NotFound';

const airportSample = [
    {
        "name": "Hartsfield-Jackson Atlanta International Airport",
        "img_path": "https://image.pbs.org/video-assets/WGTV/fast-forward/99517/images/Mezzanine_039.jpg",
        "terminals": [
            {
                "Domestic Terminal": ["Atlanta Chophouse", "Auntie Anne's", "Burger King", "IHOP express", "Popeyes", "Starbucks", "TGI Fridays'", "We Juice It", "Z Market"]
            },
            {
                "Concourse A": ["Asian Chao", "Atlanta Bread & Bar", "Boar's Head Deli", "Caribou Coffee", "Chick-fil-A", "Dunkin Donuts", "McDonald's", "P.F. Chang's,", "Qdoba Mexican Grill", "Shake Shack"]
            },
            {
                "Concourse C": ["Auntie Anne's", "Carrabba's Italian Grill", "Chick-Fil-A", "Five Guys Burgers and Fries"]
            }
        ]
    },
    {
        "name": "Dallas–Fort Worth International Airport",
        "img_path": "https://c8.alamy.com/comp/2GEY9E5/dallas-tx-17-may-2021-view-of-the-control-tower-at-the-dallasfort-worth-international-airport-dfw-the-largest-hub-for-american-airlines-aa-2GEY9E5.jpg",
        "terminals": [
            {
                "Terminal A": ["Bleu Mediterranean Bar", "The Salt Lick Bar-B-Que", "Pappadeaux Seafood Kitchen", "California Pizza Kitchen", "Auntie Anne's Pretzels", "Dunkin' Donuts", "Einstein Bros. Bagels", "McDonald's", "Popeye's", "Qdoba", "Starbucks"]
            },
            {
                "Terminal B": ["Cousins BBQ", "Hickory by Kent Rathbun", "Baskin-Robbins", "Caribou Coffee", "Smashburger", "Subway", "Panda Express"]
            },
            {
                "Terminal C": ["Bleu Mediterranean Bar", "Shake Shack", "Pappadeaux Seafood Bar", "Pappadeaux Seafood Kitchen", "Maggiano's", "Boar's Head Deli", "Chick-fil-A", "Chili's", "Dickey's Barbecue Pit", "Dunkin' Donuts", "McDonald's", "Whisk & Bowl"]
            },
            {
                "Terminal D": ["Hickory", "Artisan Market", "Bar Louie", "Applebee's", "Buffalo Wild Wings", "McDonald's", "Starbucks", "Whataburger"]
            }
        ]
    }
  ]

  function App() {
    const [airports, setAirports] = useState(airportSample);



            // name is passed from AirportCard and AirportDetails when toggleFavorite is clicked
    const toggleFavorite = (name) => {
        const updatedAirports = airports.map(airport => {
            if (airport.name === name) {
                return { ...airport, isFavorite: !airport.isFavorite };
            }
            return airport;
        });
        setAirports(updatedAirports);   
    };



    // filter favorite airports so you just have an array of favorites
    const getFavoriteAirports = () => {
        return airports.filter(airport => airport.isFavorite);
    };

    return (
            <main className='App'>
                <header>
                <Link to='/'><p>AeroBites</p></Link>
                </header>
                <Link to="/favorites">Show Favorites</Link>
                <Routes>
                    <Route path="/" element={<Airports airports={airports} />} />
                    <Route path="/:airportName" element={<AirportDetails airports={airports} toggleFavorite={toggleFavorite} />} />
                    <Route path="/favorites" element={<FavoriteAirports airports={getFavoriteAirports()} toggleFavorite={toggleFavorite} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
    );
}

export default App;