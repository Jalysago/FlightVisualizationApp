const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const favoritesRoutes = require('./routes/favorites');
const flightsRoutes = require('./routes/flights');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/users', usersRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/flights', flightsRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

