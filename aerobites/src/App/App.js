import './App.css';
import Airports from '../Airports/Airports';

function App() {
  return (
    <div className="App">
      <header>AeroBites</header>
      {/* We can treat the header as a back to home button */}
      <Airports />
      
    </div>
  );
}

export default App;

//Argue home button versus link in header that acts as back to oback to home button