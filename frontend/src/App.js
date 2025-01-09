import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import SchoolTransactions from './pages/SchoolTransactions';
import StatusCheck from './pages/StatusCheck';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard toggleDarkMode={toggleDarkMode} />} />
          <Route path="/school/:schoolId" element={<SchoolTransactions />} />
          <Route path="/status-check" element={<StatusCheck />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
