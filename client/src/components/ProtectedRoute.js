import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, type }) => {
  const userData = localStorage.getItem(type);
  if (!userData) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;