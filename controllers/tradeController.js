// tradeController.js
const { addTrade, getTradeHistory, getBalance, updateBalance, updatePosition, getPositions } = require('../models/tradeModel');
const getMockStockData = require('../mockData');

function tradingBot(req, res) {
    const stockData = getMockStockData();
    const trades = [];

    for (const stock in stockData) {
        const prices = stockData[stock];
        const latestPrice = prices[prices.length - 1];
        const previousPrice = prices[prices.length - 2];

        console.log(`Latest price for ${stock}: ${latestPrice}, Previous price: ${previousPrice}`);

        // Buy AAPL at price 148
        if (stock === 'AAPL' && latestPrice === 148) {
            const amountToBuy = 10;  // Buy 10 stocks of AAPL
            const totalCost = amountToBuy * latestPrice;

            if (getBalance() >= totalCost) {  // Ensure there is enough balance
                updateBalance(-totalCost);
                updatePosition('AAPL', amountToBuy, 'BUY');
                const trade = addTrade('BUY', 'AAPL', latestPrice, amountToBuy);
                trades.push(trade);
                console.log(`Bought ${amountToBuy} of AAPL at ${latestPrice}`);
            } else {
                console.log(`Insufficient balance to buy AAPL`);
            }
        }

        // Sell GOOGL at price 2850
        if (stock === 'GOOGL' && latestPrice === 2850) {
            const amountToSell = 3;  // Sell 3 stocks of GOOGL
            updateBalance(amountToSell * latestPrice);
            updatePosition('GOOGL', amountToSell, 'SELL');
            const trade = addTrade('SELL', 'GOOGL', latestPrice, amountToSell);
            trades.push(trade);
            console.log(`Sold ${amountToSell} of GOOGL at ${latestPrice}`);
        }
    }

    res.json({
        trades,
        balance: getBalance(),
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
