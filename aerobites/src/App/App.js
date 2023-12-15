import './App.css';
import Airports from '../Airports/Airports';
import { Link, Routes, Route } from 'react-router-dom';
import FavoritedAirports from '../FavoritedAirports/FavoritedAirports';
import AirportDetail from '../AirportDetails/AirportDetail';

function App() {
  return (
    <div className="App">
      <header>
        <Link to='/'><p>AeroBites</p></Link>
        </header>
      {/* We can treat the header as a back to home button */}
      <Routes>
        <Route path='/' element={<Airports />}/>
        <Route path='/favorites' element={<FavoritedAirports />}/>
        <Route path='/:Airport' element={<AirportDetail />}/>
      </Routes>
    </div>
  );
}

export default App;

//Argue home button versus link in header that acts as back to oback to home button