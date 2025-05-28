const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now },
});

const OwnerMessage = mongoose.model("OwnerMessage", messageSchema);

// POST /api/owner-message
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newMessage = new OwnerMessage({ name, email, message });
        await newMessage.save();

        res.status(200).json({ message: "Message saved successfully!" });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Failed to save message." });
    }
});

module.exports = router;
