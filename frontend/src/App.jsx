import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './components/dashboard/Dashboard.jsx';
import AdminDashboard from './components/admin/AdminDashboard';
import ClientLeadsManagement from './components/admin/ClientLeadsManagement';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token || userRole !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            {/* Nested Dashboard Routes */}
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clients" element={<ClientLeadsManagement />} />
            <Route path="assets" element={<div>Asset Management</div>} />
            <Route path="tokens" element={<div>Token Management</div>} />
            <Route path="kyc" element={<div>KYC Management</div>} />
            <Route path="compliance" element={<div>Compliance Center</div>} />
            <Route path="security" element={<div>Security Center</div>} />
            <Route path="reports" element={<div>Regulatory Reports</div>} />
            <Route path="transactions" element={<div>Transaction Monitor</div>} />
            <Route path="wallets" element={<div>Wallet Management</div>} />
            <Route path="revenue" element={<div>Revenue Management</div>} />
            <Route path="investments" element={<div>Investment Management</div>} />
            <Route path="did" element={<div>DID Management</div>} />
          </Route>
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;