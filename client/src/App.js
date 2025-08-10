import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddProperty from './components/AddProperty/AddProperty';
import BuyTokens from './components/BuyTokens/BuyTokens';

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
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute type="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/addProperty"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route path="/buy/:id" element={<BuyTokens />} />
      </Routes>
    </Router>
  );
}

export default App;