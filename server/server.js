const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({origin:["http://localhost:3000",""],"credentials":true})); // Allows your Next.js frontend to talk to this server
app.use(express.json());

// Routes
// app.use('/api/orders', orderRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});