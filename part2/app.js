const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const db = require('../db');


router.get('/', async (req, res) => {
    try {
        // getting the dog's name, size, and the user's username as owner username
        // from the Dogs and Users table
        const [rows] = await db.query(`
            SELECT d.name AS dog_name, d.size, u.username
            AS owner_username
            FROM Dogs d
            JOIN Users u
            ON d.owner_id = u.user_id`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed dogs' });
    }
});

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
