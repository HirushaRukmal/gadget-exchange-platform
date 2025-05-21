require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const Gadget = require('./models/Gadget.js');
const router = express.Router();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const userRoutes = require("./routes/user");
const gadgetRoutes = require("./routes/gadgets");

app.use("/api/users", userRoutes);
app.use("/api/gadgets", gadgetRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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


app.get('/search', async (req, res) => {
  const { name, category, location } = req.query;

  // Build query object dynamically
  const query = {};
  if (name) query.name = { $regex: name, $options: 'i' };
  if (category) query.category = category;
  if (location) query.location = location;

  try {
    const results = await Gadget.find(query);
    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// listings with filters

app.get('/api/gadgets', async (req, res) => {
  const { brand, category, condition, location, minPrice, maxPrice } = req.query;

  const filter = {};
  if (brand) filter.brand = new RegExp(brand, 'i');
  if (category) filter.category = new RegExp(category, 'i');
  if (condition) filter.condition = condition;
  if (location) filter.location = new RegExp(location, 'i');
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    const gadgets = await Gadget.find(filter);
    res.json(gadgets);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Logout with sessions

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Logout failed.');
    }
    res.clearCookie('connect.sid');
    res.redirect('/logout'); // or your home page
  });
});

app.get('/api/gadgets', async (req, res) => {
  const { brand, category, condition, minPrice, maxPrice } = req.query;

  const filter = {};

  if (brand) filter.brand = new RegExp(brand, 'i');
  if (category) filter.category = new RegExp(category, 'i');
  if (condition) filter.condition = condition;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  try {
    const gadgets = await Gadget.find(filter);
    res.json(gadgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

