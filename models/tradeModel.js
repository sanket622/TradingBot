// tradeModel.js
let tradeHistory = [];
let positions = {};
let balance = 10000;  // Starting balance for the bot

class Trade {
    constructor(action, stock, price, amount) {
        this.action = action;
        this.stock = stock;
        this.price = price;
        this.amount = amount;
        this.timestamp = new Date();
    }
}

function addTrade(action, stock, price, amount) {
    const trade = new Trade(action, stock, price, amount);
    tradeHistory.push(trade);
    return trade;
}

function getTradeHistory() {
    return tradeHistory;
}

function getBalance() {
    return balance;
}

function updateBalance(amount) {
    balance += amount;
}

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
                delete positions[stock];  // Remove stock if no shares are left
            }
        }
    }
}

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
