const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("Starting server...");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from the "public" folder
app.use(express.static("public"));

// Test root route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); // Optional: send main HTML file explicitly
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

console.log("Connecting to MongoDB...");
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("MongoDB connected successfully");

        // Routes
        const userRoutes = require("./routes/users");
        app.use("/api/users", userRoutes);

        app.get("/api/gadgets", async (req, res) => {
            const gadgets = await Gadget.find();
            res.json(gadgets);
        });

        // Start server only after DB connection
        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
