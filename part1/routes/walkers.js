const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/summary', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT u.username AS walker_username,
            COUNT(walk)`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: 'Failed dogs'});
    }
});

module.exports = router;
