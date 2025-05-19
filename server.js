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

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
