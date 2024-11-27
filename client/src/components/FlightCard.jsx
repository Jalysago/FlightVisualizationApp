import React from 'react';

const FlightCard = ({ flight }) => {
    return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold">{flight.airline}</h3>
        <p className="text-sm text-gray-600">
           from {flight.origin} to {flight.destination} 
        </p>
        <p className="text-sm">
            Departure: {new Date(flight.departure).toLocaleString()}
        </p>
        <p className="text-sm">Price: ${flight.price}</p>
    </div>
    );
};

export default FlightCard;