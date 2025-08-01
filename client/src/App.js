import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute type="user">
              <Dashboard />
            </ProtectedRoute>
          } />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute type="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;