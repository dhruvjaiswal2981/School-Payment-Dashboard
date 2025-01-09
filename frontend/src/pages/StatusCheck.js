import React, { useState } from 'react';
import { checkTransactionStatus } from '../services/api';
import "../styles/StatusCheck.css"

const StatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const result = await checkTransactionStatus(customOrderId);
      setStatus(result);
    } catch (error) {
      setError("Failed to fetch transaction status. Please try again.");
      setStatus(null);
    }
  };

  return (
    <div className="status-check">
      <h2 className="status-check-header">Check Transaction Status</h2>
      <form onSubmit={handleSubmit} className="status-check-form">
        <input
          type="text"
          placeholder="Enter Custom Order ID"
          value={customOrderId}
          onChange={(e) => setCustomOrderId(e.target.value)}
          className="status-input"
        />
        <button type="submit" className="primary-button">Check Status</button>
      </form>

      {status && (
        <div className="status-result success">
          <p>Status: {status}</p>
        </div>
      )}

      {error && (
        <div className="status-result error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default StatusCheck;
