const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/open', async (req, res) => {
    const [rows] = await db.query('SELECT wreq.request_id, d.name AS dog_name, wreq.requested_time, wreq.duration_minutes, wreq.location, u.username AS owner_username FROM wa');
        res.json(rows);
});

module.exports = router;
