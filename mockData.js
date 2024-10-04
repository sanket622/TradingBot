// mockData.js
const stockData = {
    "RAGO": [150, 152, 148], // Ensure the latest price is 148
    "GLEN": [2800, 2790, 2785, 2820, 2850],
    "ANAK": [3400, 3420, 3440, 3460, 3480]
};

function getMockStockData() {
    return stockData;
}

module.exports = getMockStockData;
