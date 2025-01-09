# School Payment Dashboard

A web-based application for managing transactions, built with **Node.js** and **React.js**. The backend handles transaction-related APIs, while the frontend provides an interactive UI for users.

---

## Table of Contents
- [Features](#features)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Usage](#usage)
- [Deployment](#Deployment)

---

## Features

- View all transactions.
- Fetch transactions by school ID.
- Add new transactions.
- Update transaction status.
- Check the status of specific transactions.
- Responsive UI with a dashboard and transaction management.

---

## File Structure

### Backend

    ```bash
    backend/
    ├── controllers/
    │   ├── transactionController.js     # API logic
    ├── models/
    │   ├── transactionModel.js          # Database queries
    ├── routes/
    │   ├── transactionRoutes.js         # Routes definitions
    ├── scripts/
    │   ├── importData.js                # Dummy data population script
    ├── database/
    │   ├── db.js                        # SQLite database connection
    ├── .env                             # Environment variables
    ├── server.js                        # Backend server entry point
    ├── package.json                     # Backend dependencies

### Frontend

    ```bash
    frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js             # Dashboard with all transactions
    │   │   ├── TransactionsList.js      # List of transactions with update functionality
    │   ├── pages/
    │   │   ├── Home.js                  # Home page
    │   │   ├── SchoolTransactions.js    # Page for school-specific transactions
    │   │   ├── StatusCheck.js           # Page for checking transaction status
    │   ├── App.js                       # Main application component
    │   ├── index.js                     # React entry point
    │   ├── services/
    │   │   ├── api.js                   # API service layer
    ├── styles/
    │   ├── Dashboard.css                # Styles for the dashboard
    │   ├── global.css                   # Global styles
    │   ├── Home.css                     # Styles for home page
    │   ├── StatusCheck.css              # Styles for status check page
    ├── package.json                     # Frontend dependencies


---

## Technologies Used

- **Backend**: Node.js, Express.js, SQLite
- **Frontend**: React.js
- **Styling**: CSS

---

## Setup Instructions

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dhruvjaiswal2981/School-Payment-Dashboard.git
   cd backend

2. Install Dependencies

    ```bash
    npm install

3. Environment Variables Create a .env file with the following content:

    ```makefile
    PORT=5000
    DATABASE_PATH=./transactions.db

4. Set Up the Database Populate the database with dummy data:

    ```bash
    node scripts/importData.js

5. Start the Backend Server

    ```bash
    npm start

The backend runs at http://localhost:5000.

### Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   
   cd frontend

2. Install Dependencies

    ```bash
    npm install

3. Start the Frontend

    ```bash
    npm start

The frontend runs at http://localhost:3000.

---

## API Endpoints

- Base URL
    http://localhost:5000/api/transactions

### Endpoints

1. Get All Transactions
    - Method: GET
    - URL: /
    - Response: List of all transactions.

2. Get Transactions by School
    - Method: GET
    - URL: /school/:schoolId
    - Response: Transactions for the specified school ID.

3. Check Transaction Status
    - Method: GET
    - URL: /status/:customOrderId
    - Response: Status of the transaction.

4. Add a New Transaction
    - Method: POST
    - URL: /add
    - Request Body:
        ```json
        {
            "collect_id": "C001",
            "school_id": "S001",
            "gateway": "PayPal",
            "order_amount": 100.50,
            "transaction_amount": 100.50,
            "status": "Completed",
            "custom_order_id": "ORD123456"
        }
    - Response: Success message with transaction ID.

5. Update Transaction Status
    - Method: PUT
    - URL: /update/:customOrderId
    - Request Body:
        ```json
        {
            "status": "Pending"
        }
    - Response: Success message after update.

---

## Frontend Components

1. Dashboard: Displays all transactions with update functionality.
2. TransactionsList: Renders a table of transactions with buttons for updates.
3. Home: Provides navigation and introductory UI.
4. SchoolTransactions: Fetches transactions for a specific school.
5. StatusCheck: Allows users to check the status of a specific transaction.

---

## Usage

1. Navigate to the home page (http://localhost:3000).
2. Use the Dashboard to view and update transactions.
3. Navigate to School Transactions to filter transactions by school.
4. Check transaction statuses via the StatusCheck page.

---

## Deployment

### Backend Deployment 

- Live Demo: The application is hosted on Render.
- Base URL: https://school-payment-dashboard.onrender.com/api/transactions
- Access it here: https://school-payment-dashboard.onrender.com/api/transactions

### Frontend Deployment 

- Live Demo: The application is hosted on Netlify.
- Access it here: https://school-payment-dashboard.netlify.app/

---