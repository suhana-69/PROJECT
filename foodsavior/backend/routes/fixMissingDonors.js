// backend/routes/fixMissingDonors.js
const express = require('express');
const FoodPost = require('../models/foodPost');
const User = require('../models/user');

const router = express.Router();

router.post('/fix-missing-donors', async (req, res) => {
  try {
    const donor = await User.findOne({ role: 'Donor' });
    if (!donor) return res.status(404).json({ message: 'No donor found to assign' });

    const result = await FoodPost.updateMany(
      { donor: { $exists: false } },
      { $set: { donor: donor._id } }
    );

    res.json({ message: 'Missing donors fixed', result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
