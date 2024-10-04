import express from 'express';
import dotenv from 'dotenv';
import tradeRoutes from './routes/tradeRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/trades', tradeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
