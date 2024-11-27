const Amadeus = require('amadeus');
const express = require('express');
require('dotenv').config();

const router = express.Router();
const amadeus = new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET
});

router.get('flights/search', async(req, res) => {//search for flights
    const {origin, destination, departureDate, returnDate, adults} = req.query;

    if(!origin || !destination || !departureDate || !returnDate || !adults) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try{
        const originResponse = await amadeus.referenceData.locations.get({
            keyword: origin,
            subType: 'CITY,AIRPORT'
        });

        const destinationResponse = await amadeus.referenceData.locations.get({
            keyword: destination,
            subType: 'CITY,AIRPORT'
        });

        const originCode = originResponse.data[0]?.iataCode;
        const destinationCode = destinationResponse.data[0]?.iataCode;

        if(!originCode || !destinationCode) {
            return res.status(404).json({ error: 'Origin or Destination airports not found'})
        }

        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode:originCode,
            destinationLocationCode: destinationCode,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: parseInt(adults,10)
        });
        res.json(response.data);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching flights' });
    }
});

module.exports = router;