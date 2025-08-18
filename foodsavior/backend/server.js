const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const foodPostRoutes = require('./routes/foodPostRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: parse JSON
app.use(express.json());

// CORS Middleware: allow frontend origin with credentials if needed
app.use(cors({
  origin: 'http://localhost:5173', // update with your frontend URL
  credentials: true,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foodposts', foodPostRoutes);

// Root health check route
app.get('/', (req, res) => {
  res.send('FoodSavior API is running...');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Graceful shutdown handling
  const gracefulShutdown = () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);

})
.catch((err) => {
  console.error('DB connection error:', err);
  process.exit(1);
});
