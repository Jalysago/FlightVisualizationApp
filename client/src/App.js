import React, {useState} from 'react';
import axios from 'axios';
import FlightSearchForm from './components/FlightSearchForm';
import FlightCard from './components/FlightCard';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSearch = async(searchParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:3001/flights-search", searchParams);
      setFlights(response.data);
    } catch(err) {
      console.error(err);
      setError("Failed to find flights. Try again later!");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen-green-200 p-6">
      <header className="text-center mb-6">
        <h1 className="text-3x1 font-bold text-gray-800">Vuelo!</h1>
        <p>Your next adventure begins here!</p>
      </header>
      <FlightSearchForm onSearch={handleSearch} />
    </div>
  );
}

export default App;