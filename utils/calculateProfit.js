const calculateProfit = (trades) => {
    let profit = 0;
    let totalCost = 0;

    trades.forEach(({ action, price, amount }) => {
        if (action === 'BUY') {
            totalCost += price * amount;
        } else if (action === 'SELL') {
            profit += price * amount;
        }
    });

    return profit - totalCost;
};

export default calculateProfit;
