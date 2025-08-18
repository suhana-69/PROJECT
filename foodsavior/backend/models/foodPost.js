const mongoose = require('mongoose');

const foodPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  quantity: String,
  location: String,

  // Status flow: Available → Assigned → PickedUp → Delivered
  status: {
    type: String,
    enum: ['Available', 'Assigned', 'PickedUp', 'Delivered'],
    default: 'Available',
  },

  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  // ✅ New fields for volunteer assignment & compliance
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
  },

  hygieneConfirmed: {
    type: Boolean,
    default: false, // Donor confirms food is hygienic
  },

  verifiedByVolunteer: {
    type: Boolean,
    default: false, // Volunteer verifies hygiene at pickup
  },

  imageUrl: {
    type: String, // S3 URL or local path if storing locally
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('FoodPost', foodPostSchema);
