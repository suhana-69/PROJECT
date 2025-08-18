const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  assignedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodPost'
    }
  ],
  status: { 
    type: String, 
    enum: ['available', 'assigned', 'in-progress', 'completed'], 
    default: 'available' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
