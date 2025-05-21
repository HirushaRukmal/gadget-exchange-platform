const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String } // store image filename
});

module.exports = mongoose.model("Gadget", gadgetSchema);
