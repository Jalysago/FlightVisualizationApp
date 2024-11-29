import React from 'react';


const FlightCard = ({ flight }) => {
    const departureCity = flight.itineraries[1]?.segments[0]?.departure?.iataCode;
    const arrivalCity = flight.itineraries[1]?.segments[0]?.arrival?.iataCode;

    const returnDepartureCity = flight.itineraries[1]?.segments[0]?.departure?.iataCode;
    const returnArrivalCity = flight.itineraries[1]?.segments[0]?.arrival?.iataCode;

    const departureDate = new Date(flight.itineraries[1]?.segments[0]?.departure.at);
    const returnDate = new Date(flight.itineraries[0]?.segments[0]?.departure.at)

    const formattedDepartureTime = departureDate instanceof Date && !isNaN(departureDate) 
        ? departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        : 'N/A';
    const formattedReturnTime = returnDate instanceof Date && !isNaN(returnDate) 
    ? returnDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : 'N/A';

    const departureDuration = flight.itineraries[1]?.duration;
    const returnDuration = flight.itineraries[0]?.duration;

    return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">   
        <div className="flex flex-col w-3/4">
                <h3 className="text-lg font-bold">{flight.validatingAirlineCodes[0]}</h3>
                <p className="text-sm font-bold">
                    departing at {formattedDepartureTime}
                </p>
                <p className="text-sm text-gray-600">
                from {departureCity} to {arrivalCity} 
                </p>
                
        </div>
        <div className="flex flex-col items-end w-1/4">
            <p className="text-xl font-bold text-green-700"> ${flight.price.grandTotal}</p>
        </div>
    </div>
    );
};

export default FlightCard;