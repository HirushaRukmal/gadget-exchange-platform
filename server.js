require('dotenv').config(); // Load .env variables at the very top

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI from environment variable
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const gadgetSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    description: String,
    image: String
});

const Gadget = mongoose.model("Gadget", gadgetSchema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/gadgets", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 16;
        const search = req.query.search || "";

        const query = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ]
        };

        const gadgets = await Gadget.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Gadget.countDocuments(query);

        res.json({
            gadgets,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Error fetching gadgets:", error);
        res.status(500).json({ message: "Server error" });
    }
});

const User = require('./models/User');

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Simulate login success
        res.json({ message: "Login successful!" });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({}, "username email"); // select only username and email
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.delete("/api/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.put("/api/users/:id", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updateData = { username, email };
        if (password) updateData.password = password;

        await User.findByIdAndUpdate(req.params.id, updateData);
        res.json({ message: "User updated" });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Prevent duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.error("Create error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
