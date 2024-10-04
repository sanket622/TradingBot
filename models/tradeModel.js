let tradeHistory = [];
let positions = {};
let balance = 10000;

class Trade {
    constructor(action, stock, price, amount) {
        this.action = action;
        this.stock = stock;
        this.price = price;
        this.amount = amount;
        this.timestamp = new Date();
    }
}

const addTrade = (action, stock, price, amount) => {
    const trade = new Trade(action, stock, price, amount);
    tradeHistory.push(trade);
    return trade;
};

const getTradeHistory = () => tradeHistory;

const getBalance = () => balance;

const updateBalance = (amount) => {
    balance += amount;
};

const updatePosition = (stock, amount, action) => {
    if (action === 'BUY') {
        if (!positions[stock]) {
            positions[stock] = 0;
        }
        positions[stock] += amount;
    } else if (action === 'SELL') {
        if (positions[stock]) {
            positions[stock] -= amount;
            if (positions[stock] <= 0) {
                delete positions[stock];
            }
        }
    }
};

const getPositions = () => positions;

export {
    addTrade,
    getTradeHistory,
    getBalance,
    updateBalance,
    updatePosition,
    getPositions
};
