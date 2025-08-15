const FoodPost = require('../models/foodPost');

// ✅ Create a new food post (Donor only)
exports.createFoodPost = async (req, res) => {
  try {
    const { title, description, quantity, location } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: Donor info missing' });
    }

    const post = new FoodPost({
      title,
      description,
      quantity,
      location,
      donor: req.user.id // Always from token
    });

    await post.save();
    res.status(201).json({ message: 'Food post created', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Get all food posts (Public)
exports.getAllFoodPosts = async (req, res) => {
  try {
    const posts = await FoodPost.find().populate('donor', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Update a food post (Only owner can update)
exports.updateFoodPost = async (req, res) => {
  try {
    const post = await FoodPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own posts' });
    }

    Object.assign(post, req.body);
    await post.save();

    res.json({ message: 'Food post updated', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Delete a food post (Only owner can delete)
exports.deleteFoodPost = async (req, res) => {
  try {
    const post = await FoodPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    await post.deleteOne();
    res.json({ message: 'Food post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
