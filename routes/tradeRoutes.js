import express from 'express';
import { tradingBot } from '../controllers/tradeController.js';

const router = express.Router();

router.get('/execute', tradingBot);

export default router;
