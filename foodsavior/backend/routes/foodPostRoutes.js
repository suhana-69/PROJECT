const express = require('express');
const router = express.Router();
const foodPostController = require('../controllers/foodPostController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');

// Create food post → only logged-in Donors
router.post('/', verifyToken, verifyRole(['Donor']), foodPostController.createFoodPost);

// Get all food posts (Public)
router.get('/', foodPostController.getAllFoodPosts);

// Update food post (Only owner)
router.put('/:id', verifyToken, foodPostController.updateFoodPost);

// Delete food post (Only owner)
router.delete('/:id', verifyToken, foodPostController.deleteFoodPost);

module.exports = router;
