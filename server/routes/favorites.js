const express = require('express');
const authenticateToken = require('../authentication');
const pool = require('../db');
const Amadeus = require('amadeus');
const router = express.Router();
require('dotenv').config();

const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
});

router.post('/add', authenticateToken, async (req, res) => {
  //save destination as favorite
  const { userId } = req;
  const { destination, startDate, endDate } = req.body;

  if (!destination || !startDate || !endDate) {
    return res
      .status(400)
      .json({ error: 'Destination, start date and end date are required' });
  }

  try {
    const newFav = await pool.query(
      'INSERT INTO favorites (user_id, destination, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, destination, startDate, endDate]
    );

    res.json({
      message: 'Destination saved as favorite',
      favorite: newFav.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  //get all logged in user's favorite destinations
  const { userId } = req;

  try {
    const getFavorites = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1',
      [userId]
    );

    if (getFavorites.rows.length === 0) {
      return res.status(404).json({ message: 'No favorites found' });
    }

    res.json(getFavorites.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:destinationId', authenticateToken, async (req, res) => {
  // remove a favorite destination
  const { userId } = req;
  const { destinationId } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM  favorites WHERE fav_id = $1  AND user_id = $2 RETURNING *',
      [destinationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Favorite destination not found' });
    }

    res.json({ message: 'Favorite destination deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
