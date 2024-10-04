const express = require('express');
const dotenv = require('dotenv');
const tradeRoutes = require('./routes/tradeRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/trades', tradeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
