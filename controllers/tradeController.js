const { addTrade, getTradeHistory, getBalance, updateBalance, updatePosition, getPositions } = require('../models/tradeModel');
const getMockStockData = require('../mockData');
const calculateProfit = require('../utils/calculateProfit'); // Adjust the path as necessary

function tradingBot(req, res) {
    const stockData = getMockStockData();
    const trades = [];
    const initialBalance = getBalance(); // Store initial balance before any trades

    for (const stock in stockData) {
        const prices = stockData[stock];
        const latestPrice = prices[prices.length - 1];
        const previousPrice = prices[prices.length - 2];

        const priceChangePercentage = ((latestPrice - previousPrice) / previousPrice) * 100;

        if (stock === 'RAGO' && priceChangePercentage <= -2) {
            const amountToBuy = 10;  // Buy 10 stocks of AAPL
            const totalCost = amountToBuy * latestPrice;

            if (getBalance() >= totalCost) {  // Ensure there is enough balance
                updateBalance(-totalCost);
                updatePosition('RAGO', amountToBuy, 'BUY');
                const trade = addTrade('BUY', 'RAGO', latestPrice, amountToBuy);
                trades.push(trade);
                console.log(`Bought ${amountToBuy} of RAGO at ${latestPrice}`);
            } else {
                console.log(`Insufficient balance to buy AAPL`);
            }
        }

        // Sell GOOGL at price 2850
        if (stock === 'GLEN' && priceChangePercentage >= 3) {
            const amountToSell = 3;  // Sell 3 stocks of GOOGL
            updateBalance(amountToSell * latestPrice);
            updatePosition('GLEN', amountToSell, 'SELL');
            const trade = addTrade('SELL', 'GLEN', latestPrice, amountToSell);
            trades.push(trade);
            console.log(`Sold ${amountToSell} of GLEN at ${latestPrice}`);
        }
    }

    const finalBalance = getBalance(); // Get final balance after trades
    const profit = calculateProfit(trades); // Calculate profit based on trades

    res.json({
        trades,
        initialBalance:initialBalance,
        finalBalance: finalBalance,
        profit, // Include the profit in the response
        positions: getPositions(),
        tradeHistory: getTradeHistory().map(trade => [{
            action: trade.action,
            stock: trade.stock,
            price: trade.price,
            amount: trade.amount
        }])
    });
}

module.exports = { tradingBot };
