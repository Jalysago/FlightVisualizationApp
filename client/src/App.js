import React, {useState} from 'react';
import FlightSearchForm from './components/FlightSearchForm';
import FlightCard from './components/FlightCard';

const App = () => {
  const [flights, setFlights] = useState([]);

  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-6">
        <h1 className="text-3x1 font-bold text-gray-800">Vuelo!</h1>
        <p>Your next adventure begins here!</p>
      </header>
      <FlightSearchForm onSearch={(fetchedFlights)=> setFlights(fetchedFlights)} />
      <div>{flights.map((flight, index) =>(
        <FlightCard key={index} flight={flight} />
      ))}</div>
    </div>
  );
}

export default App;