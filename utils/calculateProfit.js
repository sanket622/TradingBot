function calculateProfit(trades) {
    let profit = 0;
    let totalCost = 0;
    
    trades.forEach(trade => {
        if (trade.action === 'BUY') {
            totalCost += trade.price * trade.amount; // Track total cost of purchases
        } else if (trade.action === 'SELL') {
            profit += trade.price * trade.amount; // Track total revenue from sales
        }
    });

    return profit - totalCost; // Final profit = revenue - cost
}

module.exports = calculateProfit;
