const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./models/db');

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

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

app.get('/api/dogs', async (req, res) => {
    try {
        // using part 1's api endpoint for dogs query
        // getting the dog's 
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

// Export the app instead of listening here
module.exports = app;
