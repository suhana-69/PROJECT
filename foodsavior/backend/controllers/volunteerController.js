const Volunteer = require('../models/volunteer');
const FoodPost = require('../models/foodPost');

// Create Volunteer
exports.createVolunteer = async (req, res) => {
  try {
    const { name, contact } = req.body;
    const volunteer = new Volunteer({ name, contact });
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Assign Volunteer to Food Post
exports.assignVolunteer = async (req, res) => {
  try {
    const { volunteerId, foodPostId } = req.body;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    const foodPost = await FoodPost.findById(foodPostId);
    if (!foodPost) return res.status(404).json({ message: 'Food post not found' });

    // Prevent duplicate assignment
    if (!volunteer.assignedPosts.includes(foodPostId)) {
      volunteer.assignedPosts.push(foodPostId);
    }

    volunteer.status = 'assigned';
    await volunteer.save();

    foodPost.assignedVolunteer = volunteerId;
    foodPost.status = 'assigned';
    await foodPost.save();

    res.json({ message: 'Volunteer assigned successfully', volunteer, foodPost });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Volunteer Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    res.json({ message: 'Status updated', volunteer });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Volunteers
exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate('assignedPosts');
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
