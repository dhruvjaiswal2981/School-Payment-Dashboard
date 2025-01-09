import React, { useEffect, useState } from 'react';
import TransactionsList from './TransactionsList';
import { getTransactions, addTransaction } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = ({ toggleDarkMode }) => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    collect_id: '',
    school_id: '',
    gateway: '',
    order_amount: '',
    transaction_amount: '',
    status: '',
    custom_order_id: ''
  });

  useEffect(() => {
    async function fetchTransactions() {
      const data = await getTransactions();
      setTransactions(data);
    }
    fetchTransactions();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await addTransaction(newTransaction);
    if (response.error) {
      console.error('Error adding transaction:', response.error);
    } else {
      setNewTransaction({
        collect_id: '',
        school_id: '',
        gateway: '',
        order_amount: '',
        transaction_amount: '',
        status: '',
        custom_order_id: ''
      });
      setShowForm(false);
      const data = await getTransactions();
      setTransactions(data);
    }
  };

  const handleUpdateTransaction = async (customOrderId, updatedStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          custom_order_id: customOrderId,
          status: updatedStatus
        })
      });

      const result = await response.json();
      if (result.success) {
        // Refresh transactions list after successful update
        const updatedTransactions = transactions.map((transaction) =>
          transaction.custom_order_id === customOrderId
            ? { ...transaction, status: updatedStatus }
            : transaction
        );
        setTransactions(updatedTransactions);
      } else {
        console.error('Update failed:', result.message);
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="toggle-dark-mode" onClick={toggleDarkMode}>Toggle Dark Mode</button>
        <button
          className="add-transaction-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>

      {showForm && (
        <form className="add-transaction-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="collect_id"
            value={newTransaction.collect_id}
            onChange={handleFormChange}
            placeholder="Collect ID"
            required
          />
          <input
            type="text"
            name="school_id"
            value={newTransaction.school_id}
            onChange={handleFormChange}
            placeholder="School ID"
            required
          />
          <input
            type="text"
            name="gateway"
            value={newTransaction.gateway}
            onChange={handleFormChange}
            placeholder="Gateway"
            required
          />
          <input
            type="number"
            name="order_amount"
            value={newTransaction.order_amount}
            onChange={handleFormChange}
            placeholder="Order Amount"
            required
          />
          <input
            type="number"
            name="transaction_amount"
            value={newTransaction.transaction_amount}
            onChange={handleFormChange}
            placeholder="Transaction Amount"
            required
          />
          <input
            type="text"
            name="status"
            value={newTransaction.status}
            onChange={handleFormChange}
            placeholder="Status"
            required
          />
          <input
            type="text"
            name="custom_order_id"
            value={newTransaction.custom_order_id}
            onChange={handleFormChange}
            placeholder="Custom Order ID"
            required
          />
          <button type="submit">Add Transaction</button>
        </form>
      )}

      <TransactionsList
        transactions={transactions}
        onUpdateTransaction={handleUpdateTransaction}
      />
    </div>
  );
};

export default Dashboard;
