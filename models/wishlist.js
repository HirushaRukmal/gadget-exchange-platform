const mongoose = require('mongoose');
const WishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  gadget: { type: mongoose.Schema.Types.ObjectId, ref: 'Gadget' }
});
module.exports = mongoose.model('Wishlist', WishlistSchema);
