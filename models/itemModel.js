const mongoose = require('mongoose');

const gadgetSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    description: String,
    imageUrl: String
});

module.exports = mongoose.model('Gadget', gadgetSchema);
