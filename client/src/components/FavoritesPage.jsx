import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightCard from './FlightCard';


const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    const fetchFavorites = async () => {
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get('http://localhost:3001/favorites',{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                withCredentials:true
            });
            console.log("Lets see que pedo",response.data)
            setFavorites(response.data);
        } catch (err) {
            console.error('Error fetching favorites', err);
            setError('An error occurred while fetching favorites');
        }
    };
    
    const deleteFavorite = async (destinationId) => {
        try {
            await axios.delete(`http://localhost:3001/favorites/${destinationId}`);
            fetchFavorites();
        } catch (err) {
            console.error('Error deleting favorite', err);
            setError('Could not delete favorite');
        }
    };    

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (error) { return <p className="text-center text-red-500">{error}</p>; }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
            {favorites.length > 0 ? (
                favorites.map((fav) => (
                    <div key={fav.favorite_id}>
                        <FlightCard
                            flight={fav.flight_data}
                            fetchFavorites={fetchFavorites}
                        />
                        <button
                            onClick={() => deleteFavorite(fav.favorite_id)}
                            className="text-red-500 underline mt-2"
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))
            ) : (
                <p>No favorites saved yet!</p>
            )}
        </div>
    );
};

export default FavoritesPage;