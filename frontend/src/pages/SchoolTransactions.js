import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSchoolTransactions } from '../services/api';
import "../styles/SchoolTransactions.css"

const SchoolTransactions = () => {
  const { schoolId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchoolTransactions() {
      try {
        const data = await getSchoolTransactions(schoolId);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSchoolTransactions();
  }, [schoolId]);

  return (
    <div className="school-transactions">
      <h2 className="school-transactions-header">Transactions for School ID: {schoolId}</h2>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : transactions.length === 0 ? (
        <p className="no-transactions">No transactions available.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Collect ID</th>
              <th>Gateway</th>
              <th>Order Amount</th>
              <th>Transaction Amount</th>
              <th>Status</th>
              <th>Custom Order ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.collect_id}>
                <td>{transaction.collect_id}</td>
                <td>{transaction.gateway}</td>
                <td>{transaction.order_amount}</td>
                <td>{transaction.transaction_amount}</td>
                <td>{transaction.status}</td>
                <td>{transaction.custom_order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SchoolTransactions;
