const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Gadget = require("../models/Gadget");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, category, price, description } = req.body;
        const image = req.file ? req.file.buffer.toString('base64') : null;

        const newGadget = new Gadget({
            title,
            category,
            price: parseFloat(price),
            description,
            image
        });

        await newGadget.save();
        res.status(201).json({ message: 'Gadget created successfully', gadget: newGadget });
    } catch (err) {
        console.error('Error adding gadget:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, category, price, description } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!title || !category || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newGadget = new Gadget({ title, category, price, description, image });
        await newGadget.save();
        res.status(201).json(newGadget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read All
router.get("/", async (req, res) => {
    try {
        const gadgets = await Gadget.find();
        res.json({ gadgets });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read One
router.get("/:id", async (req, res) => {
    try {
        const gadget = await Gadget.findById(req.params.id);
        if (!gadget) return res.status(404).json({ message: "Gadget not found" });
        res.json(gadget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { title, category, price, description } = req.body;
        const gadget = await Gadget.findById(req.params.id);

        if (!gadget) return res.status(404).json({ message: "Gadget not found" });

        // Delete old image if new one is uploaded
        if (req.file && gadget.image) {
            const oldImagePath = path.join(uploadDir, gadget.image);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        gadget.title = title || gadget.title;
        gadget.category = category || gadget.category;
        gadget.price = price || gadget.price;
        gadget.description = description || gadget.description;
        if (req.file) gadget.image = req.file.filename;

        const updatedGadget = await gadget.save();
        res.json(updatedGadget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const gadget = await Gadget.findByIdAndDelete(req.params.id);
        if (!gadget) return res.status(404).json({ message: "Gadget not found" });

        // Delete associated image
        if (gadget.image) {
            const imagePath = path.join(uploadDir, gadget.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        res.json({ message: "Gadget deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
