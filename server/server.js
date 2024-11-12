const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

