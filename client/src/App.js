import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightSearchForm from './components/FlightSearchForm';
import FlightCard from './components/FlightCard';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => {
  const [flights, setFlights] = useState([]);

  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-6">
        <Router>
          <Routes>
            <Route path="/register" element={ <RegisterPage /> } />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/" element={ <HomePage /> } />
          </Routes>
        </Router>
        <h1 className="text-3x1 font-bold text-gray-800">Vuelo!</h1>
        <p>Your next adventure starts here!</p>
      </header>
      <FlightSearchForm onSearch={(fetchedFlights)=> setFlights(fetchedFlights)} />
      <div>{flights.map((flight, index) =>(
        <FlightCard key={index} flight={flight} />
      ))}</div>
    </div>
  );
}

export default App;