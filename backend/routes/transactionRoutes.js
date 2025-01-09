const express = require('express');
const {
    getAllTransactions,
    getTransactionsBySchool,
    checkTransactionStatus,
    updateTransactionStatus,
    addTransaction,
} = require('../controllers/transactionController');

const router = express.Router();

// API routes
router.get('/transactions', getAllTransactions);
router.get('/transactions/school/:school_id', getTransactionsBySchool);
router.get('/transactions/status/:custom_order_id', checkTransactionStatus);
router.post('/transactions/update', updateTransactionStatus);
router.post('/transactions/add', addTransaction);

module.exports = router;
