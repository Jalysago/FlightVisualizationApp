import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlightSearchForm = ({onSearch}) => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const flightData = {
            departure,
            arrival,
            departureDate,
            returnDate,
        };
        onSearch(flightData);
    };
    return(
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto"
        >
           <div className="flex flex-col md:flex-row gap-4"> 
                <div className="flex-1">
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
                <div className="flex-1">
                    <label 
                    htmlFor="arrival"
                    className="block text-sm font-medium text-gray-700"
                    >
                        Arrival
                    </label>
                    <input
                        type="text"
                        id="arrival"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={arrival}
                        onChange={(e) => setArrival(e.target.value)}
                        placeholder="Enter your destination city"
                        required
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">    
                <div className="flex-1">
                    <label
                        htmlFor="departureDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Departure Date
                    </label>
                    <DatePicker
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        startDate={departureDate}
                        endDate={returnDate}
                        selectsStart
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholderText="Select departure date"
                    />
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="returnDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Return date
                    </label>
                    <DatePicker
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        startDate={departureDate}
                        endDate={returnDate}
                        selectsEnd
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholderText="Select return date"
                        minDate={departureDate} // Ensure return date is after departure
                    />
                </div>
           </div>
           <div className="flex justify-center">
           <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-800 mt-4"
                    >
                        Search
            </button>
           </div>
        </form>  
    );
};

export default FlightSearchForm;