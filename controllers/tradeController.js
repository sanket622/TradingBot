import { addTrade, getTradeHistory, getBalance, updateBalance, updatePosition, getPositions } from '../models/tradeModel.js';
import getMockStockData from '../mockData.js';
import calculateProfit from '../utils/calculateProfit.js';

const tradingBot = (req, res) => {
    const stockData = getMockStockData();
    const trades = [];
    const initialBalance = getBalance();

    for (const stock in stockData) {
        const prices = stockData[stock];
        const latestPrice = prices[prices.length - 1];
        const previousPrice = prices[prices.length - 2];

        const priceChangePercentage = ((latestPrice - previousPrice) / previousPrice) * 100;

        if (stock === 'RAGO' && priceChangePercentage <= -2) {
            const amountToBuy = 10;
            const totalCost = amountToBuy * latestPrice;

            if (getBalance() >= totalCost) {
                updateBalance(-totalCost);
                updatePosition('RAGO', amountToBuy, 'BUY');
                const trade = addTrade('BUY', 'RAGO', latestPrice, amountToBuy);
                trades.push(trade);
                console.log(`Bought ${amountToBuy} of RAGO at ${latestPrice}`);
            } else {
                console.log(`Insufficient balance to buy RAGO`);
            }
        }

        if (stock === 'GLEN' && priceChangePercentage >= 3) {
            const amountToSell = 3;  
            updateBalance(amountToSell * latestPrice);
            updatePosition('GLEN', amountToSell, 'SELL');
            const trade = addTrade('SELL', 'GLEN', latestPrice, amountToSell);
            trades.push(trade);
            console.log(`Sold ${amountToSell} of GLEN at ${latestPrice}`);
        }
    }

    const finalBalance = getBalance();
    const profit = calculateProfit(trades);

    res.json({
        trades,
        initialBalance,
        finalBalance,
        profit,
        positions: getPositions(),
        tradeHistory: getTradeHistory().map(trade => ({
            action: trade.action,
            stock: trade.stock,
            price: trade.price,
            amount: trade.amount
        }))
    });
};

export { tradingBot };
