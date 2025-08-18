const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Auth routes
router.post('/register', userController.register);

// Login route with JWT token generation
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simulate user lookup - replace this with DB query
  const dummyUser = {
    id: '12345',
    name: 'Supriya',
    email: 'supriyanayek42@gmail.com',
    passwordHash: await bcrypt.hash('yourPassword', 10) // hash your dummy password once
  };

  if (email !== dummyUser.email) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, dummyUser.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign(
    { id: dummyUser.id, email: dummyUser.email, role: 'user' }, // add role if you want
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Example protected route (you can move to a separate file)
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'You accessed a protected route!',
    userId: req.user.id,
    userEmail: req.user.email,
  });
});
// CRUD routes for user
router.get('/getAllUsers', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
