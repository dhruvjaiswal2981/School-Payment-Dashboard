const {
    fetchAllTransactions,
    fetchTransactionsBySchool,
    fetchTransactionByCustomOrderId,
    updateTransactionStatus,
    addTransaction,
} = require('../models/transactionModel');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) =>
            fetchAllTransactions((err, rows) => (err ? reject(err) : resolve(rows)))
        );
        if (rows.length === 0) return res.status(404).json({ message: 'No transactions found' });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get transactions by school ID
exports.getTransactionsBySchool = async (req, res) => {
    const { school_id } = req.params;
    try {
        const rows = await new Promise((resolve, reject) =>
            fetchTransactionsBySchool(school_id, (err, rows) => (err ? reject(err) : resolve(rows)))
        );
        if (rows.length === 0)
            return res
                .status(404)
                .json({ message: `No transactions found for school with ID: ${school_id}` });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Check transaction status by custom order ID
exports.checkTransactionStatus = async (req, res) => {
    const { custom_order_id } = req.params;
    try {
        const row = await new Promise((resolve, reject) =>
            fetchTransactionByCustomOrderId(custom_order_id, (err, row) =>
                err ? reject(err) : resolve(row)
            )
        );
        if (!row)
            return res
                .status(404)
                .json({ message: `Transaction not found for custom_order_id: ${custom_order_id}` });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
    const { custom_order_id, status } = req.body;

    // Validate request body
    if (!custom_order_id || !status) {
        return res.status(400).json({ message: 'custom_order_id and status are required' });
    }

    try {
        // Run the update query and check if any rows were affected
        const result = await new Promise((resolve, reject) => {
            updateTransactionStatus(custom_order_id, status, (err, changes) => {
                if (err) reject(err);
                else resolve(changes);
            });
        });

        if (result === 0) {
            // No rows updated, custom_order_id not found
            return res.status(404).json({ message: 'No transaction found to update' });
        }

        res.json({ message: 'Transaction status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Add a new transaction
exports.addTransaction = async (req, res) => {
    const {
        collect_id,
        school_id,
        gateway,
        order_amount,
        transaction_amount,
        status,
        custom_order_id,
    } = req.body;

    if (
        !collect_id ||
        !school_id ||
        !gateway ||
        !order_amount ||
        !transaction_amount ||
        !status ||
        !custom_order_id
    )
        return res.status(400).json({ message: 'Missing required fields' });

    try {
        const transactionId = await new Promise((resolve, reject) =>
            addTransaction(
                { collect_id, school_id, gateway, order_amount, transaction_amount, status, custom_order_id },
                (err, id) => (err ? reject(err) : resolve(id))
            )
        );
        res.status(201).json({ message: 'Transaction added successfully', transactionId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
