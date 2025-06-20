const express = require('express');
const router = express.Router();
const db = require('../db');
const { render } = require('../app');

router.get('/dogs', async (req, res) => {
    const [rows] = await db.query('
        SELECT d.name AS dog_name, d.size, u.username AS owner_username FROM Dogs d JOIN Users u ON d.owner_id = u.user.id');
        res.json(rows);
})