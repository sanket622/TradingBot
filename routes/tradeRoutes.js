const express = require('express');
const { tradingBot } = require('../controllers/tradeController');
const router = express.Router();

// Route for triggering trading bot
router.get('/execute', tradingBot);

module.exports = router;
