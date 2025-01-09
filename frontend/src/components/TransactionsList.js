import React, { useState } from 'react';
import "../styles/TransactionsList.css";

const TransactionsList = ({ transactions, onUpdateTransaction }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');

  const handleUpdateClick = (transaction) => {
    setSelectedTransaction(transaction);
    setUpdatedStatus(transaction.status); // Pre-fill the current status
  };

  const handleUpdateSubmit = () => {
    if (selectedTransaction && updatedStatus) {
      const confirmUpdate = window.confirm(
        `Are you sure you want to update the status to ${updatedStatus}?`
      );
      if (confirmUpdate) {
        onUpdateTransaction(selectedTransaction.custom_order_id, updatedStatus);
        setSelectedTransaction(null); // Close the update form
        setUpdatedStatus(''); // Reset the input field
      }
    }
  };
  

  const handleCancelUpdate = () => {
    setSelectedTransaction(null); // Close the update form
    setUpdatedStatus('');
  };

  return (
    <div className="transactions-list">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Collect ID</th>
            <th>School ID</th>
            <th>Gateway</th>
            <th>Order Amount</th>
            <th>Transaction Amount</th>
            <th>Status</th>
            <th>Custom Order ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.collect_id}>
              <td>{transaction.collect_id}</td>
              <td>{transaction.school_id}</td>
              <td>{transaction.gateway}</td>
              <td>{transaction.order_amount}</td>
              <td>{transaction.transaction_amount}</td>
              <td>{transaction.status}</td>
              <td>{transaction.custom_order_id}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => handleUpdateClick(transaction)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Form */}
      {selectedTransaction && (
        <div className="update-form">
          <h3>Update Transaction</h3>
          <p>
            <strong>Transaction ID:</strong> {selectedTransaction.custom_order_id}
          </p>
          <label>
            Status:
            <input
              type="text"
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            />
          </label>
          <div className="update-form-actions">
            <button className="submit-btn" onClick={handleUpdateSubmit}>
              Submit
            </button>
            <button className="cancel-btn" onClick={handleCancelUpdate}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
