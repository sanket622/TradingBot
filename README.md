# Trading Bot Backend

This backend application simulates a basic trading bot that executes trades based on predefined rules and conditions using mock stock data.

## Requirements

- Node.js
- Express.js
- dotenv for environment configuration

## Install the dependencies : npm install

## Set up a .env file for environment variables (optional for specifying the PORT).

## Project Structure

- controllers/tradeController.js: Contains the main logic for the trading bot.
- models/tradeModel.js: Manages the trades, positions, and balance data.
- utils/calculateProfit.js: Contains the logic to calculate profit based on executed trades.
- mockData.js: Provides mock stock price data for simulation.

## Run the Application : node index.js

## API Endpoints

### GET `http://localhost:5000/api/trades/execute`

This endpoint exceutes the trading bot to evaluate stock prices and execute buy/sell trades based on predefined conditions:

- **Buy**: When the stock price drops by 2%.
- **Sell**: When the stock price rises by 3%.

### Working Logic

- Stock Data: The bot uses mock stock data from mockData.js. It evaluates the price changes for each stock.
- Buy Logic: If the price of a stock (e.g., RAGO) drops by 2% or more compared to the previous price, the bot checks if   there's enough balance to buy 10 units and proceeds with the purchase.
- Sell Logic: If the price of a stock (e.g., GLEN) rises by 3% or more, the bot sells 3 units of the stock.
- Balance Management: The bot tracks the user's balance and adjusts it accordingly after each trade.
- Profit Calculation: The profit is calculated by subtracting the total cost of purchases from the proceeds of sales.
- Positions: The bot updates the user's stock positions after each buy/sell operation.

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