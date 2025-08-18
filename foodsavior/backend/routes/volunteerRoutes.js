const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');

// Create Volunteer → Only admin or NGO
router.post('/create', verifyToken, verifyRole(['admin', 'ngo']), volunteerController.createVolunteer);

// Assign Volunteer to FoodPost → Only admin
router.put('/assign', verifyToken, verifyRole(['admin']), volunteerController.assignVolunteer);

// Update Volunteer Status → Only volunteer
router.put('/status/:id', verifyToken, verifyRole(['volunteer']), volunteerController.updateStatus);

// Get All Volunteers → (Optional: anyone or restrict to admin)
router.get('/', verifyToken, volunteerController.getAllVolunteers);

module.exports = router;
