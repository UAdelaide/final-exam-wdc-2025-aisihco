const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/open', async (req, res) => {
    const [rows] = await db.query('SELECT ');
        res.json(rows);
});

module.exports = router;
