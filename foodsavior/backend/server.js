const express = require('express');
const fixDonorsRoute = require('./routes/fixMissingDonors');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const foodPostRoutes = require('./routes/foodPostRoutes');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // allow React frontend
  credentials: true
}));

app.use(express.json());
app.use('/api/utils', fixDonorsRoute);

app.use('/api/users', userRoutes);
app.use('/api/foodposts', foodPostRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
