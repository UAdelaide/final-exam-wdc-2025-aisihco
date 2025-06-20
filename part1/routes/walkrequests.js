const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/open', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT wreq.request_id, d.name AS dog_name, wreq.requested_time, wreq.duration_minutes, wreq.location,
            u.username AS owner_username
            FROM WalkRequests wreq
            JOIN Dogs d ON wreq.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wreq.status = 'open'`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: 'Failed'});
    }
});

module.exports = router;
