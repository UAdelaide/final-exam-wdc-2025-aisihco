const express = require('express');
const router = express.Router();
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

module.exports = router;
