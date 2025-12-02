const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

// Create the app instance
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/farms', require('./routes/farmRoutes'));
app.use('/api/cropCycle', require('./routes/cropCycleRoutes'));

// Test Route
app.get('/api/test', (req, res) => {
  console.log('✅ /test route was hit from mobile!');
  res.json({ status: 'ok', message: 'Connection successful!' });
});

// Error Handler (Always last)
app.use(errorHandler);

// Export the app
module.exports = app;