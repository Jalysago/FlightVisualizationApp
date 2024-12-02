const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const favoritesRoutes = require('./routes/favorites');
const flightsRoutes = require('./routes/flights');

require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/users', usersRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/flights', flightsRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

