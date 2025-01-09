const db = require('../database/db');

// Fetch all transactions
const fetchAllTransactions = (callback) => {
    db.all('SELECT * FROM transactions', [], (err, rows) => callback(err, rows));
};

// Fetch transactions by school ID
const fetchTransactionsBySchool = (school_id, callback) => {
    db.all(
        'SELECT * FROM transactions WHERE school_id = ?',
        [school_id],
        (err, rows) => callback(err, rows)
    );
};

// Fetch a transaction by custom_order_id
const fetchTransactionByCustomOrderId = (custom_order_id, callback) => {
    db.get(
        'SELECT * FROM transactions WHERE custom_order_id = ?',
        [custom_order_id],
        (err, row) => callback(err, row)
    );
};

// Update transaction status
const updateTransactionStatus = (custom_order_id, status, callback) => {
    db.run(
        'UPDATE transactions SET status = ? WHERE custom_order_id = ?',
        [status, custom_order_id],
        function (err) {
            if (err) {
                callback(err, null);
            } else {
                // Return the number of rows affected
                callback(null, this.changes);
            }
        }
    );
};


// Add a new transaction
const addTransaction = (transactionData, callback) => {
    const {
        collect_id,
        school_id,
        gateway,
        order_amount,
        transaction_amount,
        status,
        custom_order_id,
    } = transactionData;

    const query = `
        INSERT INTO transactions
        (collect_id, school_id, gateway, order_amount, transaction_amount, status, custom_order_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
        collect_id,
        school_id,
        gateway,
        order_amount,
        transaction_amount,
        status,
        custom_order_id,
    ];

    db.run(query, params, function (err) {
        if (err) callback(err);
        else callback(null, this.lastID); // Return the last inserted ID
    });
};

module.exports = {
    fetchAllTransactions,
    fetchTransactionsBySchool,
    fetchTransactionByCustomOrderId,
    updateTransactionStatus,
    addTransaction,
};
