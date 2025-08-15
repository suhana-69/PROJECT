const mongoose = require('mongoose');

const foodPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  quantity: String,
  location: String,
  status: { type: String, enum: ['Available', 'PickedUp'], default: 'Available' },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodPost', foodPostSchema);
