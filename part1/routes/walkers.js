const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/summary', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT u.username AS walker_username,
            COUNT(wrate.rating_id) AS total_ratings,
            ROUND(AVG(wrate.rating), 1) AS average_rating,
            (SELECT COUNT(*) FROM WalkApplication`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: 'Failed dogs'});
    }
});

module.exports = router;
