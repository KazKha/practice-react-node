// Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Perform logout logic, e.g., clearing session data
    // After successful logout, call `logout()`
    logout();
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Dashboard;