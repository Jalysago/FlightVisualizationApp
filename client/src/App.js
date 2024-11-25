import './App.css';
import React from 'react';


function App() {
  return (
    <div className="App">
       <form id="flight-search-form">
        <input type="text" id="origin" placeholder="Enter Origin City" required />
        <input type="text" id="destination" placeholder="Enter Destination City" required />
        <input type="date" id="departureDate" required />
        <input type="date" id="backDate" required />
        <input type="number" id="adults" placeholder="Number of Adults" required />
        <button type="submit">Search Flights</button>
    </form>
    </div>
  );
}

export default App;
