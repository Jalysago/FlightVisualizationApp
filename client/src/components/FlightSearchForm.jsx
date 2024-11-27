import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const FlightSearchForm = ({onSearch}) => {
    const [origin, setDeparture] = useState('');
    const [destination, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(null);
    const [adults, setAdults] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError(null);

            const formattedDepartureDate = departureDate.toISOString().split('T')[0];
            const formattedReturnDate = returnDate.toISOString().split('T')[0];

            const response = await axios.get('http://localhost:3001/flights/search', {
                params: {
                    origin,
                    destination,
                    departureDate: formattedDepartureDate,
                    returnDate: formattedReturnDate,
                    adults,
                },
            });

            onSearch(response.data);
        } catch (err) {
            console.error('Error fetching flights: ', err);
            alert('An error occurred while searching for flights.')
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div>            
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
                            value={origin}
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
                            value={destination}
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
                            minDate={new Date()}
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
            <div className="mt-4">
                    <label
                        htmlFor="adults"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Number of Adults
                    </label>
                    <select
                        id="adults"
                        className="mt-1 block p-2 border border-gray rounded-md"
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                    >
                        {[...Array(10)].map((_, i) =>(
                            <option key={i + 1} value={i + 1}>
                                {i + 1} {i+1 ===1 ? "adult" : "adults"}
                            </option>
                        ))}
                    </select>
                </div>
            <div className="flex justify-center">
            <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-800 mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
            </form>  
            {isLoading && <p className="text-center mt-4">Finding flights...</p>}
            {error && <p className="text-center text-gray-700 mt-4">{error}</p>}
        </div>
    );
};

export default FlightSearchForm;