// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // make sure file name matches (capital U)


// GET /api/users - Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    try {
        const newUser = await user.save(); // Save to DB
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
