const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "username email");
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Create new user
router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.error("Create error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update user
router.put("/:id", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updateData = { username, email };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10); // hash updated password
        }

        await User.findByIdAndUpdate(req.params.id, updateData);
        res.json({ message: "User updated" });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// // Login route
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     console.log("Login attempt:", email, password); // debug

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log("User not found");
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             console.log("Password mismatch");
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         res.json({ message: "Login successful!" });
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

module.exports = router;
