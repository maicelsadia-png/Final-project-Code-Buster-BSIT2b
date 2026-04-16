require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
 
const app = express();
connectDB();
 
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
 
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});