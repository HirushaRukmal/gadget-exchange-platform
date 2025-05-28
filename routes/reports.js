const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Gadget = require('../models/Gadget');

router.get('/', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const gadgetCount = await Gadget.countDocuments();

        res.json({ users: userCount, gadgets: gadgetCount });
    } catch (err) {
        console.error("Report error:", err);
        res.status(500).json({ error: "Failed to fetch report data" });
    }
});

module.exports = router;
