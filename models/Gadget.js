const mongoose = require('mongoose');

const GadgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: String,
  category: String,
  condition: {
    type: String,
    enum: ['New', 'Used'],
    default: 'Used'
  },
  price: {
    type: Number,
    required: true
  },
  location: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gadget', GadgetSchema);
