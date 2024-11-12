const express = require('express');
const pool = require('./db');
const cors = require('cors');
const Amadeus = require('amadeus');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const amadeus = new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET
});

app.get('/users', async (req, res) =>{
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

