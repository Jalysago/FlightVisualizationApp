import React, {useState} from 'react';
import axios from 'axios';

const FlightSearchForm = ({onSearch}) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const flightData = {
            departure,
            arrival,
            departureDate
        };
        onSearch(flightData);
    };
    return(
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
            <div className="mb-4">
                <label
                    htmlFor="departure"
                    className="block text-sm font-medium text-gray-700"
                >
                    Departure
                </label>
                <input
                    type="text"
                    id="departure"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder="Enter departure city"
                    required          
                />    
            </div>
        </form>    
    );
};

export default FlightSearchForm;
