import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProperty from '../components/AddProperty.js';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const isAdmin = user?.isAdmin === 1 || user?.isAdmin === true || user?.isAdmin === '1';

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {isAdmin ? (
        <>
          <AddProperty />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not authorized to view this section.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;