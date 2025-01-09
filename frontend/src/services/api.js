import axios from 'axios';

const API_BASE_URL = 'https://school-payment-dashboard.onrender.com/api';

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions', error);
    return [];
  }
};

export const getSchoolTransactions = async (schoolId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/school/${schoolId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school transactions', error);
    return [];
  }
};

export const checkTransactionStatus = async (customOrderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/status/${customOrderId}`);
    return response.data.status;
  } catch (error) {
    console.error('Error checking transaction status', error);
    return 'Error';
  }
};

export const addTransaction = async (transactionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions/add`, transactionData);
      return response.data; // Response includes the success message and transactionId
    } catch (error) {
      console.error('Error adding transaction', error);
      return { error: 'Failed to add transaction' };
    }
};