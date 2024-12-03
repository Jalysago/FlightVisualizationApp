import React, { useState } from 'react';
import FlightSearchForm from './FlightSearchForm';
import FlightCard from './FlightCard';

const HomePage = () => {
  const [flights, setFlights] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
          <header className="text-center mb-6">
            <p>Your next adventure starts here!</p>
          </header>
          <FlightSearchForm onSearch={(fetchedFlights)=> setFlights(fetchedFlights)} />
          <div>{flights.map((flight, index) =>(
            <FlightCard key={index} flight={flight} />
          ))}</div>
    </div>
  );
};

export default HomePage;
