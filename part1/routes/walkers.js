const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/summary', async (req, res) => {
    try {
        // getting user's username, and counting the number of ratings they have
        // and rounding the average of their ratings to 1 decimal point
        // then selecting all requests that have the status completed
        const [rows] = await db.query(`
            SELECT u.username AS walker_username,
            COUNT(wrate.rating_id) AS total_ratings,
            ROUND(AVG(wrate.rating), 1) AS average_rating,
            (SELECT COUNT(*) FROM WalkApplications wapp JOIN WalkRequests wreq ON wapp.request_id = wreq.request_id
            WHERE wapp.walker_id = u.user_id AND wreq.status = 'completed')
            AS completed_walks
            FROM Users u
            LEFT JOIN WalkRatings wrate ON u.user_id = wrate.walker_id
            WHERE u.role = 'walker'
            GROUP BY u.username`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed dogs' });
    }
});

module.exports = router;
