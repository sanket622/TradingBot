# Trading Bot Backend

This backend application simulates a basic trading bot that executes trades based on predefined rules and conditions using mock stock data.

## Requirements

- Node.js
- Express.js
- dotenv for environment configuration

## Install the dependencies : npm install

## Run the Application : node index.js

## API Endpoints

### GET `http://localhost:5000/api/trades/execute`

This endpoint exceutes the trading bot to evaluate stock prices and execute buy/sell trades based on predefined conditions:

- **Buy**: When the stock price drops by 2%.
- **Sell**: When the stock price rises by 3%.

#### Response
```json
{
  "trades": [
    {
      "action": "BUY",
      "stock": "RAGO",
      "price": 148,
      "amount": 10,
      "timestamp": "2024-10-04T12:30:08.821Z"
    },
    {
      "action": "SELL",
      "stock": "GLEN",
      "price": 3000,
      "amount": 3,
      "timestamp": "2024-10-04T12:30:08.822Z"
    }
  ],
  "initialBalance": 10000,
  "finalBalance": 17520,
  "profit": 7520,
  "positions": {
    "RAGO": 10
  },
  "tradeHistory": [
    [
      {
        "action": "BUY",
        "stock": "RAGO",
        "price": 148,
        "amount": 10
      }
    ],
    [
      {
        "action": "SELL",
        "stock": "GLEN",
        "price": 3000,
        "amount": 3
      }
    ]
  ]
}