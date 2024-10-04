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

        // Buy if price drops by 2%
        if (previousPrice > latestPrice && previousPrice - latestPrice >= (previousPrice * 0.02)) {
            const amountToBuy = Math.floor(getBalance() / latestPrice);
            if (amountToBuy > 0) {
                updateBalance(-amountToBuy * latestPrice);
                updatePosition(stock, amountToBuy, 'BUY');
                const trade = addTrade('BUY', stock, latestPrice, amountToBuy);
                trades.push(trade);
            }
        }

        // Sell if price rises by 3%
        if (previousPrice < latestPrice && latestPrice - previousPrice >= (previousPrice * 0.03) && getPositions()[stock]) {
            const amountToSell = getPositions()[stock];
            updateBalance(amountToSell * latestPrice);
            updatePosition(stock, amountToSell, 'SELL');
            const trade = addTrade('SELL', stock, latestPrice, amountToSell);
            trades.push(trade);
        }
    }

    res.json({
        trades,
        balance: getBalance(),
        positions: getPositions(),
        tradeHistory: getTradeHistory()
    });
}

module.exports = { tradingBot };
