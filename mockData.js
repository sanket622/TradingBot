const fs = require('fs');
const path = require('path');

// Simulate stock price data from mock file
function getMockStockData() {
    const dataPath = path.join(__dirname, 'mockdata', 'stockData.json');
    const rawData = fs.readFileSync(dataPath);
    const stockData = JSON.parse(rawData);
    return stockData;
}

module.exports = getMockStockData;
