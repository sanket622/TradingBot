// tradeModel.js

// Store trade history and the current position in memory
let tradeHistory = [];
let positions = {};
let balance = 10000; // Starting balance for the bot

// Model for storing a trade
class Trade {
    constructor(action, stock, price, amount) {
        this.action = action; // 'BUY' or 'SELL'
        this.stock = stock;   // Stock symbol, e.g., 'AAPL'
        this.price = price;   // Stock price at time of trade
        this.amount = amount; // Number of shares traded
        this.timestamp = new Date(); // Time when the trade was made
    }
}

// Function to add a new trade
function addTrade(action, stock, price, amount) {
    const trade = new Trade(action, stock, price, amount);
    tradeHistory.push(trade);
    return trade;
}

// Function to get all trade history
function getTradeHistory() {
    return tradeHistory;
}

// Function to get the current balance
function getBalance() {
    return balance;
}

// Function to update the balance (for buying/selling stocks)
function updateBalance(amount) {
    balance += amount;
}

// Function to manage positions (buying/selling stock)
function updatePosition(stock, amount, action) {
    if (action === 'BUY') {
        if (!positions[stock]) {
            positions[stock] = 0;
        }
        positions[stock] += amount;
    } else if (action === 'SELL') {
        if (positions[stock]) {
            positions[stock] -= amount;
            if (positions[stock] <= 0) {
                delete positions[stock]; // Remove stock if no shares are left
            }
        }
    }
}

// Function to get current positions
function getPositions() {
    return positions;
}

module.exports = {
    addTrade,
    getTradeHistory,
    getBalance,
    updateBalance,
    updatePosition,
    getPositions
};
