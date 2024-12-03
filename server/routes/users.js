const express = require ('express');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const { check, validationResult } = require('express-validator');
const authenticateToken = require('../authentication')
require('dotenv').config();

const router = express.Router();
router.use(cookieParser());

router.post('/register', [ //register user
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({min: 8}),
    check('username').not().isEmpty().trim().escape()
], async(req, res) => {
    //console.log(req.body);//para debugear
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {

        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        res.json(newUser.rows[0]);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});
 
router.post('/login', async(req, res) => {//user login
    const {email, password} = req.body;

    try {
        const userEmail = await pool.query('SELECT * FROM users WHERE EMAIL = $1', [email]); 
        if(userEmail.rows.length === 0) {
            return res.status(400).json({ error: 'Incorrect email or password' });
        }

        const passwordMatches = await bcrypt.compare(password, userEmail.rows[0].password);

        if(!passwordMatches) {
            return res.status(400).json({ error: 'Incorrect email or password' });
        }

        const payload = {userId: userEmail.rows[0].user_id };//acabo de cambiar esto dic 2 7:14 pm
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });



        res
        .cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60
        })
        .json({ userEmail, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const { userId } = req;
        console.log('User ID from token:', userId); // Debugging

        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/logout', authenticateToken, async(req, res) => {//user logout
    const {userId} = req;
    res
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'Logout successful' })
    
});
 
router.put('/update/:userId', authenticateToken, async(req, res) => {//update user information
    const { userId } = req;
    const { username, email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        if(user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        let updatedUser;
        if(username) {
            updatedUser = await pool.query(
                'UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *', [username, userId]
            );
        }

        if (email) {
            updatedUser = await pool.query(
                'UPDATE users SET email = $1 where user_id = $2 RETURNING *',
                [email, userId]
            );
        }

        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            updatedUser = await pool.query(
                'UPDATE users SET password = $1 WHERE user_id = $2 RETURNING *',
                [hashedPassword, userId]
            );
        }

        if(!username && !email && !password) {
            return res.status(400).send({ error: 'nothing to update' })
        }

        res.json({ message: 'User updated successfully', user: updatedUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: 'Server error' })

    }
});
 
router.delete('/delete/:userId', authenticateToken, async(req, res) => {//delete user account
    const { userId } = req.params;

    try {
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error:'User not found' });
        }

        await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: 'Server error' });       
    }
});

router.get('/users', async (req, res) =>{//get all users (for debugging only)
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;