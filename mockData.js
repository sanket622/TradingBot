// mockData.js
const stockData = {
    "AAPL": [150, 152, 148], // Ensure the latest price is 148
    "GOOGL": [2800, 2790, 2785, 2820, 2850],
    "AMZN": [3400, 3420, 3440, 3460, 3480]
};

function getMockStockData() {
    return stockData;
}

module.exports = getMockStockData;
