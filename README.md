# Trading Bot Backend

This backend application simulates a basic trading bot that executes trades based on predefined rules and conditions using mock stock data.

## Requirements

- Node.js
- Express.js
- dotenv for environment configuration

## API Endpoints

### GET `/api/trades/execute`

This endpoint triggers the trading bot to evaluate stock prices and execute buy/sell trades based on predefined conditions:

- **Buy**: When the stock price drops by 2%.
- **Sell**: When the stock price rises by 3%.

#### Response
```json
{
    "trades": [
        {
            "action": "BUY",
            "stock": "AAPL",
            "price": 148,
            "amount": 10
        },
        {
            "action": "SELL",
            "stock": "GOOGL",
            "price": 2850,
            "amount": 3
        }
    ],
    "balance": 9750,
    "positions": {
        "AAPL": 10
    },
    "tradeHistory": [
        [
            {
                "action": "BUY",
                "stock": "AAPL",
                "price": 148,
                "amount": 10
            }
        ]
    ]
}
